import React, {Component }from 'react';
import Navbar from './components/navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import Loader from 'react-loader-spinner';
import Search from './components/Search.js';
import ShowData from './components/ShowData.js';
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
      temp:0,
      desc:'',
      loading:false
     }
     
  }
    
temperature=()=>{
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
    if (e.key === "Enter") {
      this.setState({
        ...this.state,
        loading:true
      })
      fetch(`https://gnews.io/api/v2?q=${this.state.s}&lang=${this.state.s2}&token=63be4d70d9de414b602114f1fe143ac4`)
      .then((res) => res.json())
      .then((res)=>{
        this.setState({
          ...this.state, 
          articles:res.articles,
          loading:false
        });
      })
      .catch((err)=>{
        
        this.setState({
          ...this.state,
          loading:false

        })

      })
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
      let s1 = s.slice(0,2);
      let s2 = s1.toLowerCase();
    this.setState(prevState => {
      return { ...prevState, s2: s2 }
    });
  }

getgeo =() =>{
    if(navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
    
       this.setState({
        ...this.state,lat:lat,
        lon:lon
       })
       
     })
   }
 }
async componentDidMount(){
  this.getgeo();
   await this.temperature();
}

  render() {  
  return (

    <div className="app">
       <Navbar/>
       
       <div className="search">
       <Search handleInput={this.handleInput} search={this.search} handleInput2={this.handleInput2} search2={this.search2}/>
       <Temp temp={this.state.temp} desc={this.state.desc}/>
       </div>
 
       <div >
           { this.state.loading?<div style={{width:"100%", display:"flex", justifyContent:"center", marginTop:"10%"}}>
                                <Loader type="TailSpin" color="#223343" height={80} width={80} />
                                 </div>
                               : <ShowData state={this.state.articles}/> 
           }
      </div>
     
    </div>
  );
}
}

export default App;
