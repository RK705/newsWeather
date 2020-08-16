import React, {Component }from 'react';
import Navbar from './components/navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import Search from './components/Search.js';
import Result from './components/result.js';
import Temp from './components/Temp.js';
import './App.css';

class App extends Component {
  constructor(props){
     super(props);
     this.state={
      articles:[],
      s:'',
      s2:'',
      lat:0,
      lon:0,
      temp:'',
      desc:''
     }
     
  }
    
temerature=()=>{
   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=daa49f36215f29a0a88845d5ad307991`)
      .then((res) => res.json())
      .then((res)=>{
        this.setState({
          desc:res.weather[0].description,
          temp:res.main.temp

        })
      })
      .catch((err)=>console.log(err))

 }

search = (e) => {
  console.log(this.state.s2);
    if (e.key === "Enter") {
      fetch(`https://gnews.io/api/v2?q=${this.state.s}&lang=${this.state.s2}&token=63be4d70d9de414b602114f1fe143ac4`)
      .then((res) => res.json())
      .then((res)=>{
        console.log(res)
        this.setState({
          articles:res.articles
        });
      })
      .catch((err)=>console.log(err))
    }
  }
 
handleInput = (e) => {
    let s = e.target.value;
    this.setState(prevState => {
      return { ...prevState, s: s }
    });
  }
 
handleInput2 = (e) => {
    let s = e.target.value;
      let s2 = s.slice(0,2);
    this.setState(prevState => {
      return { ...prevState, s2: s2 }
    });
  }

getgeo =() =>{
  //console.log("aas",navigator.geolocation)
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
       //console.log("latt",lat)
       
       //console.log("asd",a)
       this.setState({
        ...this.state,lat:lat,
        lon:lon
       })
       
     })
   }
}
async componentDidMount(){

   this.getgeo();
 
  await this.temerature();

}
 



  render() {
    //this.getgeo();
    //this.temerature();    
  
  return (

    <div  className="app">
       <Navbar/>
       <div className="search">
       <Search handleInput={this.handleInput} search={this.search} handleInput2={this.handleInput2} search2={this.search2}/>
       <Temp temp={this.state.temp} desc={this.state.desc}/>
       </div>
       <div className="main">
       {
        this.state.articles.map((item) => {
          return (
                 <Result key={item.id} item={item}/>
                 )
           })
      }
      </div>
    </div>
  );
}
}

export default App;
