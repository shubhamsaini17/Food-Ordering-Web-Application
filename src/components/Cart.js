import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart} from "../utils/Redux/CartSlice";


const Cart = () => {

    const cartItems = useSelector((store)=>store.cart.items);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return <div className="text-center m-4 p-4">
    <h1 className="font-bold text-2xl">CART ITEMS</h1>
    <div className="w-6/12 m-auto flex justify-start flex-col">
        <button className="p-1 my-6 w-2/12 bg-black text-white rounded-lg" onClick={handleClearCart}>Clear Cart</button>
        {cartItems.length ===0 && <h1>Cart is Empty, Please Add some Items</h1>}
        <ItemList items={cartItems}/>
    </div>
    </div>
}

export default Cart;