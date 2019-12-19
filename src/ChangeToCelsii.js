import React from 'react'

function ChangeToCelsii(props){
  var change = props.change
  return (
    <div>{(change-273).toFixed(0)}°C</div>
    ) 
}

export default ChangeToCelsii
