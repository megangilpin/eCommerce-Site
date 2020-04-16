import React from 'react';

function Item(props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: "5px", padding: "5px", height: "125px", width: "125px", margin: "10px", border: "1px solid black"}}>
      <img style={{ maxHeight: "50px"}}src={props.img}>
      </img>
      <h6 >{props.name}</h6>
    </div>
  );
}

export default Item;