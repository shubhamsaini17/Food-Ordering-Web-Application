import { useState, useEffect, useContext } from "react";
import RestaurantCard, {withVegetarianLabel} from "./RestaurantCard";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filtereListOfRestaurants, setFiltereListOfRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  const RestaurantCardVegetarian = withVegetarianLabel(RestaurantCard);

  // const arr = useState(resList);
  // const [listOfRestaurants,setListOfRestaurants] = arr;
  // const listOfRestaurants =arr[0];
  // const setListOfRestaurants = arr[1];

  // Whenever state variables update, react trigger a reconciliation cycle(re-render the component);
  // console.log("body rendered", listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    const data = await fetch('https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', {
      headers: {
      'x-cors-api-key': 'temp_aac18872dd52d5be00dfb3e3cf60fddd'
      }
    });
    // const data = await fetch(
    //   "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    // https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
    const json = await data.json();
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[7].info.veg);
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[0].info.cuisines );
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // when website is loading show simmer UI , fake cards, gray cards like struture
  // conditional rendering

  // if(listOfRestaurants.length === 0){
  //   return <Shimmer/>
  // }
  
  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return <h1>Looks like you're offline!! Please check your internet connection</h1>;


  const {loggedInUser, setUserName} = useContext(UserContext);

  // conditional rendering -- teronary operator
  return listOfRestaurants.length === 0 ? (
    <Shimmer/>
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4 ml-24">
          <input
            type="text"
            placeholder="Search Restaurants"
            className="border border-solid"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="px-3 py-1 bg-green-200 m-2 rounded-lg"
            onClick={() => {
              // Filter the restraunt cards and update the UI
              //searchText
              // console.log(searchText); 

              const filteredRestaurants = listOfRestaurants.filter((res) => {
                return res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFiltereListOfRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      {/* <div className="search m-4 p-4 flex items-center">
       <label> userName : - </label>
       <input className="border border-black p-2" 
       value={loggedInUser}
       onChange={(e)=>{
        setUserName(e.target.value)
       }}/>

       user context
      </div> */}
      </div>
      <div>
      <h1 className="ml-40 text-2xl border-solid font-extrabold my-4">Top restaurant chains in Chandigarh</h1>
      </div>
      <div className="flex flex-wrap justify-evenly mx-20 px-16">
        {/* <RestaurantCard name ="70 Mile Stone" time = "48 Minutes" star = '3.8' cusions ='Briyani, North Indian'/>
          <RestaurantCard name ="KFC" star = '3.2' time = "18 Minutes" cusions ='Burger, Pizza'/> */}

        {/* 
              to remove this repetation we use map method
  
                <RestaurantCard resData = {resList[1]} />
                <RestaurantCard resData = {resList[2]} />
                <RestaurantCard resData = {resList[3]} />
                <RestaurantCard resData = {resList[4]} />
                <RestaurantCard resData = {resList[5]} />
                <RestaurantCard resData = {resList[6]} />
                <RestaurantCard resData = {resList[7]} />
                <RestaurantCard resData = {resList[8]} />
                
               */}

        {
          filtereListOfRestaurants.length >= 1
          ? filtereListOfRestaurants.map((restaurant) => (
            <Link className="li" key={restaurant.info.id} to={"restaurants/"+ restaurant.info.id}>
            <RestaurantCard resData={restaurant} /> 
            </Link>
            ))
          : listOfRestaurants.map((restaurant) => (
              <Link className="li" key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}>
              
              {
                /* IF restaurant is VEGETARIAN add VEG label on it */
              restaurant.info.veg? <RestaurantCardVegetarian resData={restaurant}/> :  <RestaurantCard resData={restaurant} /> 
              }
              </Link>
            ))
        }

        {/* when ever use map try to give a uniques key/ id to each element */}
      </div>
    </div>
  );
};

export default Body;