import React from "react";
import { useState } from "react";
import PokeCard from "./PokeCard";
import "./PokeManager.css";

export default function PokeManager() {
  const API = "https://pokeapi.co/api/v2/pokemon/";

  const [inputName, setInputName] = useState("");
  const [pokeList, setPokeList] = useState([]);

  async function getPokemon(name) {
    try {
      const response = await fetch(`${API}${name}`);
      if (response.ok) {
        const result = await response.json();

        setPokeList((prev) => [...prev, result]);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function removePokemon(name) {
    const filteredList = pokeList.filter((el) => el.name !== name);

    setPokeList(filteredList);
  }
  return (
    <>
      <div className="input-with-button-container">
        <input
          className="text-input"
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <button className="add-button" onClick={() => getPokemon(inputName)}>
          Add
        </button>
      </div>

      <div className="pokemons-container">
        {pokeList.length > 0 &&
          pokeList.map((el) => (
            <PokeCard
              key={el.name}
              name={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
              sprites={[el.sprites.front_default, el.sprites.front_shiny]}
              onRemove={() => removePokemon(el.name)}
            />
          ))}
      </div>
    </>
  );
}
