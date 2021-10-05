/* eslint-disable react-hooks/exhaustive-deps */
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
function City(props) {
  return (
    <div className="item">
      <p> {props.data}</p>
    </div>
  )
}


export default class App extends Component {
  state= {
    city: "",
    zipCodes: [],
    data: []
  }
  updateCity = async (e) => {
    await this.setState({ city: e.target.value });
    await this.updateZipCodes();
  }
  updateZipCodes = async () => {
    // console.clear(); //clears screen to remove unwanted 404 errors when typing
    await fetch(`http://ctp-zip-api.herokuapp.com/city/${this.state.city.toUpperCase()}`)
      .then(async res => await res.json())
      .then(async data => await this.setState({ zipCodes: data }))
      .catch(async() => {
        await this.setState({ zipCodes: [] })
      })
  }
  // getZipData = async (zip) => {
  //   await fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
  //     .then(async res => await res.json())
  //     .then(async data => await this.setState({ data: data}))
  //     .catch(async() => {
  //       await this.setState({ data: [] })
  //     })
  // }
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
                this.state.zipCodes.map(item =>  <li key={item}><City data={item}/></li>)
                :
                <li id="none">No Results</li>
          }
          </ul>
        </div>
      </div>
    )
  }
}
