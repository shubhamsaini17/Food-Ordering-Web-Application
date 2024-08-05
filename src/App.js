import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { lazy, Suspense, useEffect, useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import AppStore from "./utils/Redux/AppStore";
import Cart from "./components/Cart";



// chunking 
// code splitting
// dynamic bundling
// lazy loading
// on demand loading
// dynamic import

const Grocery = lazy(() => import("./components/Grocery")); 
const About = lazy(() => import("./components/About")); 



// app component

const AppLayout = () => {

  const [userName,setUserName] = useState();
  
  // authentication
  useEffect(()=>{
    // Make an API call and send username and password
     const data = {
      name: "Default User"
     }
     setUserName(data.name);
  },[]);

  return (

    // wrapping hole app with redux store  using provider [appStore is our redux store name that we created] and pass created store as propes in provider
    <Provider store={AppStore}>

    <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
    <div className="app">
    <UserContext.Provider value={{loggedInUser: userName}}>
      <Header />
      </UserContext.Provider>
      {/*  if */}
      <Outlet />
        {/* we created childrens of / or AppLayout route and these children get into place of <Outlet /> component below header. 
        and if the url is /about then the about children of parent / or AppLayout route  get replaced by <Outlet/> component
        
        if path = "/"
         <Outlet />  replace with => <Body/> and header remain above it.

         if path = "/about"
         <Outlet /> replace with => <About/>

         if path = "/contact"
         <Outlet /> replace with => <Contact/>
        */}
    </div>
    </UserContext.Provider>

    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element:( 
        <Suspense fallback={<h1>Loading About Page Please wait</h1>}>
        <About/>
        </Suspense>
      )
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/grocery",
        element:( 
        <Suspense fallback={<h1>Loading.......</h1>}>
        <Grocery/>
        </Suspense>
      )
      },
      // these children will be push in place of <Outlet/> componet according to path.
      {
        path: "/restaurants/:resId",
        // path: "/restaurants/:DynamicPart"
        // dynamic means here restaurent id get change according to restaurent ID dyamically
        element: <RestaurantMenu/>
      },
      {
        path: "/cart",
        element: <Cart/>
      }
    ],
    errorElement: <Error/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
//this react provider will actually provide this routing configuration to our app.
// so we will provide our router configuration to root.render
