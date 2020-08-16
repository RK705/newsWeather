import React from 'react';

function Temp ({temp, desc} ) {
 
  	return(
        <div className="temp">
        <span>{desc}</span>
        <p><span className="cels">{(temp-273.15).toFixed(2)}</span><sup>&nbsp;&deg;C</sup></p>
        </div>
  		)

}
export default Temp;