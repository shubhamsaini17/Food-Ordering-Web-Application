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
      <div className="res-card" style={{ backgroundColor: "#f0f0f0", color: "black" }}>
        <img className="res-logo" src={CDN_URL+cloudinaryImageId}/>
        {/* <img className="res-logo" src={CDN_URL+props.resData.info.cloudinaryImageId}/> */}
        {/* <h3>{resData.info.name}</h3>    as i destrutured resData.info so we only need to write name, avgRating*/}  
        <h3 className="link-line">{name}</h3>
        <h4 className="link-line">{cuisines.join(", ")}</h4>
        <h4 className="link-line">{avgRating} Stars</h4>
        <h4 className="link-line">{costForTwo}</h4>
        <h4 className="link-line">{resData?.info?.sla?.deliveryTime} Min</h4>
      </div>
    );
  };
  
export default RestaurantCard;