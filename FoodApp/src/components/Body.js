import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
Shimmer;

const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filtereListOfRestaurants, setFiltereListOfRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  // const arr = useState(resList);
  // const [listOfRestaurants,setListOfRestaurants] = arr;
  // const listOfRestaurants =arr[0];
  // const setListOfRestaurants = arr[1];

  // Whenever state variables update, react trigger a reconciliation cycle(re-render the component);
  console.log("body rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[0].info.cuisines );
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // when website is loading show simmer UI , fake cards, gray cards like struture
  // conditional rendering

  /* if(listOfRestaurants.length === 0){
    return <Shimmer/>
  }
  
  */

  // conditional rendering -- teronary operator
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search Restaurants"
            className="search-box"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // Filter the restraunt cards and update the UI
              //searchText
              console.log(searchText);

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

        <button
          className="filter-btn"
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
      <div className="res-container">
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
            <Link className="li" key={restaurant.info.id} to={"restaurants/"+ restaurant.info.id}><RestaurantCard resData={restaurant} /> </Link>
            ))
          : listOfRestaurants.map((restaurant) => (
              <Link className="li" key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}><RestaurantCard resData={restaurant} /> </Link>
            ))
        }

        {/* when ever use map try to give a uniques key/ id to each element */}
      </div>
    </div>
  );
};

export default Body;