import { useEffect, useState } from 'react'
import Shimmer from './shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/constants';


const RestaurantMenu = () => {

  const [resInfo,setResInfo] =useState(null);
  // const params = useParams();
  const {resId} = useParams();

  useEffect(()=>{
        fetchMenu();
    },[]);

const fetchMenu = async () => {
    const data = await fetch(MENU_API+resId);

    const json = await data.json();
    // console.log(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards[0]?.card?.info?.name);
    setResInfo(json.data);
};

if(resInfo === null) return <Shimmer/>; 

// console.log(resInfo.cards[4].groupCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards)

const{name, cuisines,costForTwoMessage} = resInfo.cards[2].card.card.info;

const {itemCards} = resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  return  (
    <div className='menu'>
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
      <ul>
        {itemCards.map((item)=>(
          
          <li key={item.card.info.id}>
          {item.card.info.name} - {"Rs. "}{item.card.info.price/100}
          </li>

          ))}  
      </ul>
    </div>
  )
}

export default RestaurantMenu;
