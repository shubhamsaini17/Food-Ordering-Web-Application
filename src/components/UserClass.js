import React, { Component } from 'react'

class userClass extends React.Component {
    constructor (props) {
        super(props)
    }
  render() {
      const {name,Location,Contact} = this.props;
    return (
      <div>
        <h3>Name: {name}</h3>
        <h3>Location: {Location}</h3>
        <h3>Contact: {Contact}</h3>
      </div>
    )
  }
}

export default userClass; 