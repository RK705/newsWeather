import React from 'react'

function Result(props) {
return(	
    <div className="card mb-3" >
    <div className="card-body">
    <h5 className="card-title" >{props.item.title}</h5>
    <p className="card-text"><small className="text-muted">{props.item.date}</small></p>
    <span className="text-muted">{props.item.source}</span>&nbsp;&nbsp;&nbsp;
    <a href={props.item.website} className="btn btn-sm btn-secondary">source</a>
    <p><a href={props.item.link} className="btn btn-sm btn-outline-dark">more...</a></p>
    </div>
    </div>		
    )
   }
export default Result
