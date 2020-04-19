import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from'./app_component/weather.component';
import Form from'./app_component/form.component';

const API_key="45b6805fb3b828d085ed5b0edd5b9f6d";

class App extends React.Component {
  constructor() {
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.weathericon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain:"wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  calCelsius(temp) {
    let cell=Math.floor(temp-273.15);
    return cell;
  }
  get_Weathericon (icons,rangeid){
    switch(true){
      case rangeid >= 200 && rangeid <= 232:
        this.setState({icon:this.weathericon.Thunderstorm});
        break;
      case rangeid >= 300 && rangeid <= 321:
        this.setState({icon:this.weathericon.Drizzle});
        break;
      case rangeid >= 500 && rangeid <= 531:
        this.setState({icon:this.weathericon.Rain});
        break;
      case rangeid >= 600 && rangeid <= 622:
        this.setState({icon:this.weathericon.Snow});
        break;
      case rangeid >= 701 && rangeid <= 781:
        this.setState({icon:this.weathericon.Atmosphere});
        break;
      case rangeid === 800:
        this.setState({icon:this.weathericon.Clear});
        break;
      case rangeid >= 801 && rangeid <= 804:
        this.setState({icon:this.weathericon.Clouds});
        break;
      default:
        this.setState({icon:this.weathericon.Clouds});
    }
  }
  getWeather = async(event) => {
    event.preventDefault();
    const country= event.target.elements.country.value;
    const city= event.target.elements.city.value;
    const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    const response= await api_call.json();
    console.log(response);
    if(response.cod!=="404") {
      this.setState({
        city: response.name,
        country: response.sys.country,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });
      this.get_Weathericon(this.weathericon, response.weather[0].id);
    } else{
      this.setState({error:true});
      console.log(this.state.error);
    }
  };
  render() {
    return(
      <div className="App">
        <Form 
          loadweather={this.getWeather} 
          error={this.state.error}
        />
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp_celsius={this.state.celsius} 
          temp_min={this.state.temp_min} 
          temp_max={this.state.temp_max} 
          description={this.state.description}
          weathericon={this.state.icon}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
