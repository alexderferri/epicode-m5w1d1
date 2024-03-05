import React from "react";
import "./Card.css";

export default function Card(props) {
  const { artist, avatarSrc, bestSong, description } = props;
  return (
    <div className="card">
      <div className="card-header">
        <img className="card-avatar" src={avatarSrc} alt="" />
        <h1 className="card-title">{artist}</h1>
      </div>

      <ul className="card-songlist">
        <li>{bestSong}</li>
      </ul>
      <p className="card-description">{description}</p>
    </div>
  );
}
