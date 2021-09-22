import React, { Component } from 'react'
import './App.css';
function CityInput(props){
  return (
    <div className="input">
      <label htmlFor="city">Enter a City: {props.code}</label>
      <input id="city" className="input" name="city" onChange={props.changeCity}/>
    </div>
  )
}
function City(props){
  return (
    <div className="item">
      City: {props.code}
    </div>
  )
}
export default class App extends Component {
  state= {
    city: "",
    zipCodes: []
  }
  updateCity = async (e) => {
    await this.setState({ city: e.target.value });
    await this.updateZipCodes();
  }
  updateZipCodes = async () => {
    console.clear(); //clears screen to remove unwanted 404 errors when typing
    await fetch(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
      .then(async res => await res.json())
      .then(async data => await this.setState({ zipCodes: data }))
      .catch(error => {
        console.log("Not a city..")
      })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CityInput changeCity={this.updateCity}/>
        <div className="results">
          <ul id="list">
          
          {
            this.state.zipCodes.length > 0 ?
                this.state.zipCodes.map(item => <li key={item}><City code={item}/></li>)
                :
                <li id="none">No Results</li>
          }
          </ul>
        </div>
      </div>
    )
  }
}
