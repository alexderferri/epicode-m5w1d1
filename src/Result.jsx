import React from "react";
import "./Result.css";

export default function Result(props) {
  return (
    <div className="container">
      <div>
        <h1>{props.country}</h1>
        <img src={`https://flagsapi.com/${props.country}/flat/64.png`}></img>
      </div>
      <h2 className="percentage">{`${Math.round(
        props.probability * 100
      )}%`}</h2>
    </div>
  );
}
