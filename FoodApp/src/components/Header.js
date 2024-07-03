import { useState} from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
// Header component
const Header = () => {

  const[btnNameReact,setBtnNameReact] = useState("Login")
    
    // useEffect use cases
  /* * if no dependency array => useEffect is called on every component render of the component
     * if the dependency array is empty => useEffect is called only on the initial render(just once) of the component
     * if the dependency array contains a dependency => useEffect is called everytime the value of the depencecy changes
     * Dependency: A depency can be a state variable (or) a function

  useEffect(() => {
    console.log(`useEffect Called`);
  });    */
    
    return (
      <div className="header">
        <div className="logo-container">
          <img
            className="logo"
            src={LOGO_URL}
          />
        </div>
        <div className="nav-items">
          <ul >
           <Link className="li" to="/">Home</Link>
           <Link className="li" to="/about">About Us</Link>
           <Link className="li" to="/contact">Contact Us</Link>
           <Link className="li" to="/">Cart</Link>
          <button className="login" onClick={()=>{
              btnNameReact === "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
            }}>{btnNameReact}</button>
          </ul>
        </div>
      </div>
    );
  };

export default Header;