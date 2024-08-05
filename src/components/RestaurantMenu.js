import Shimmer from './shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestrauntCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {
  
  const {resId} = useParams(); // url ma se id le ka ava ga restaurant ke
  const resInfo = useRestaurantMenu(resId);  // restaurant data coming form custom hook

  const [showIndex, setShowIndex] = useState(null);


  // now below restraunt data fetch work is now done by custom hook useRestaurantMenu

// const fetchMenu = async () => {
//     const data = await fetch(MENU_API+resId);

//     const json = await data.json();
//     // console.log(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards[0]?.card?.info?.name);
//     setResInfo(json.data);
// };

if(resInfo === null) return <Shimmer/>; 

// console.log(resInfo.cards[4].groupCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards)

const{name, cuisines,costForTwoMessage} = resInfo.cards[2].card.card.info;

const {itemCards} = resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

const categories = resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c => c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")


  return  (
    <div className='text-center'>
      <h1 className='font-bold my-6 text-2xl'>{name}</h1>
      <p className='font-bold text-lg'>{cuisines.join(", ")} - {costForTwoMessage}</p>
      {/* Categories Accordions */}
      {categories.map((category,index)=> 
      //controlled component parent is controlling it (restaurantMenu is controlling the restaurantCatogary)
      <RestrauntCategory 
      key={category?.card?.card.title}
      data={category?.card?.card} 
      showItems={index == showIndex ? true : false}
      setShowIndex = {()=> setShowIndex(index)}
      />)}
    </div>

    )
}

export default RestaurantMenu;
