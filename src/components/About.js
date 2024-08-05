import React from 'react'
import UserClass from './UserClass';
import UserContext from '../utils/UserContext';

const About = () =>{
  return (
    <div>
      <h1>ABOUT</h1>
      <div>
        LoggedIn User: 
        {/* way to use context in class based componet  */}
        <UserContext.Consumer>
          {({loggedInUser}) => <h1 className='text-xl font-bold'>{loggedInUser}</h1>}
        </UserContext.Consumer>
      </div>
      <h1>This is a about page</h1>
      <UserClass name={"shubham"} Location={"Default Location"} Contact={"Default Contact"}/>
    </div>
  )
}

export default About;