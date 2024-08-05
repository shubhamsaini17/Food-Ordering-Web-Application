import { useContext, useState} from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
// Header component
const Header = () => {

  const[btnNameReact,setBtnNameReact] = useState("Login")
  const onlineStatus = useOnlineStatus();
    // useEffect use cases
  /* * if no dependency array => useEffect is called on every component render of the component
     * if the dependency array is empty => useEffect is called only on the initial render(just once) of the component
     * if the dependency array contains a dependency => useEffect is called everytime the value of the depencecy changes
     * Dependency: A depency can be a state variable (or) a function

  useEffect(() => {
    console.log(`useEffect Called`);
  });    */
    
    const {loggedInUser} = useContext(UserContext);

    // subscribing to the store using a selector (react hook)
    const cartItems = useSelector((store) => store.cart.items);
    // console.log(cartItems);

    return (
      <div className="flex justify-between bg-blue-100">
        <div className="logo-container">
        <Link to="/"> 
           <img
            className="ml-20 w-64 h-36 object-cover" 
            src={LOGO_URL}
          />
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex mr-10">
          <li className="px-4"><Link to="/">Online Status: {onlineStatus? "✅" : "🔴"}</Link></li>
          <li className="px-4"> <Link to="/">Home</Link> </li>
          <li className="px-4"> <Link to="/about">About Us</Link>  </li>
          <li className="px-4"> <Link to="/contact">Contact Us</Link> </li>
          <li className="px-4"> <Link to="/grocery">Grocery</Link> </li>
          <li className="px-4 font-bold">  <Link to="/cart">Cart - ({cartItems.length} Items)</Link>  </li>

          <button className="login font-bold" onClick={()=>{
              btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
            }}>{btnNameReact}</button>

            <li className="px-4 font-bold">{loggedInUser}</li>

          </ul>
        </div>
      </div>
    );
  };

export default Header;