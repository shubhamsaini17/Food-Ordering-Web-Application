import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";

// app component

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
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
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      // these children will be push in place of <Outlet/> componet according to path.
      {
        path: "/restaurants/:resId",
        // path: "/restaurants/:DynamicPart"
        // dynamic means here restaurent id get change according to restaurent ID dyamically
        element: <RestaurantMenu/>
      }
    ],
    errorElement: <Error/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
