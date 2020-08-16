import React from 'react';
import Result from './result'

class ShowData extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			articles:this.props.state
		}
	}
  
  render(){
 
  	return(
         <div className="main">
            {
           this.state.articles.map((item) => {
            return (
                 
                 <Result key={item.id} item={item}/>
                 
                 )
           })
         }
         </div>
     )
  }
}
export default ShowData;