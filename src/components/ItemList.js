// it is made for restaurent Catogeory items for Accordian Body

import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/Redux/CartSlice";

const ItemList = ({items}) => {

    const dispatch = useDispatch();

    const HandleAddItem = (item) => {
        dispatch(addItem(item));
    }

    return <div>
     <div>
        {items.map((item)=>(
            <div
            key={item.card.info.id}
            className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
            >
            <div className="w-9/12">
            <div className="py-2">
                    <span className="font-medium">{item.card.info.name}</span>
                    <span className="font-normal"> - ₹{item.card.info.price ? item.card.info.price/100 : item.card.info.defaultPrice/100}</span>
                </div>
                <p className="text-xs">{item.card.info.description}</p>
            </div>

            <div className="w-3/12 p-4 flex flex-col-reverse">
            <div className="absolute">
            <button className="m-auto ml-5 px-6 mt-8 rounded-lg bg-white shadow-lg text-green-500 font-bold" onClick={()=>HandleAddItem(item)}>Add</button>
            {/* HandleAddItem - FUNC is used to bispatch action using use dispatch hook to call reducer func and add the item in the cart array as item in the store */}
            </div>
            <img src={CDN_URL+item.card.info.imageId} className="w-full rounded-md" />
            </div>
            </div>
        ))}
     </div>
    </div>
}

export default ItemList;