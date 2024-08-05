import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    // const RestaurantCard = ({name,time,star,cusions}) => {      // {name,time,star,cusions} destruturing.
    // const {name,time,star,cusions} = props;
    const { resData } = props;   // we can also pass a full object or array of object as props and can destruture object values
    const {
      cloudinaryImageId,
      name,
      avgRating,
      costForTwo,
      cuisines
    } = resData?.info;

    return (
      <div className="res-card m-4 p-4 w-[200px] rounded-lg bg-gray-200 hover:bg-gray-400">
        <img className="rounded-lg" src={CDN_URL+cloudinaryImageId}/>
        {/* <img className="res-logo" src={CDN_URL+props.resData.info.cloudinaryImageId}/> */}
        {/* <h3>{resData.info.name}</h3>    as i destrutured resData.info so we only need to write name, avgRating*/}  
        <h3 className="font-bold py-2">{name}</h3>
        <h4 className="text-sm">-{cuisines.join(", ")}</h4>
        <h4 className="text-sm">-⭐ {avgRating}</h4>
        <h4 className="text-sm">-{costForTwo}</h4>
        <h4 className="text-sm">-{resData?.info?.sla?.deliveryTime} Min</h4>
      </div>
    );
  };


  // Higher Order Component 
  // input - RestaurantCard => RestaurantCardVeg (vegetarian restaurant)

  export const withVegetarianLabel = (RestaurantCard) => {
    return (props) =>{
      return (
        <div>
           <label className="absolute bg-gray-800 text-white rounded-lg m-4 ml-8 p-1">Veg Avail</label>
           <RestaurantCard {...props}/>
        </div>
      )
    }
  }
  
export default RestaurantCard;