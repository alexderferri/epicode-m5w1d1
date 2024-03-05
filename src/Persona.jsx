import React from "react";

export default function Persona(props) {
  const { name, age } = props;

  const message =
    age >= 18 ? <p>{name}, sei un adulto</p> : <p>{name}, sei un minorenne</p>;
  return (
    <div>
      <h1>{name}</h1>
      {message}
    </div>
  );
}
