import React from "react";
import { useState } from "react";
import "./PokeCard.css";

export default function PokeCard(props) {
  const [shiny, setShiny] = useState(false);

  function handleShiny() {
    setShiny(!shiny);
  }
  return (
    <div className="card-container">
      <h1>{props.name}</h1>
      <img
        className="poke-image"
        src={shiny ? props.sprites[1] : props.sprites[0]}
        alt=""
      />
      <button className="shiny-button" onClick={handleShiny}>
        Set Shiny
      </button>
      <button className="remove-button" onClick={props.onRemove}>
        Remove
      </button>
    </div>
  );
}
