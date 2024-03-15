import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList(props) {
  const { data, onFavourite, onRemove, isFavourite } = props;

  return (
    <div className="movies-container">
      {/* Renderizziamo tutto il contenuto della prop data che non sarà altro che la lista dei risultati ottenuti dall'API.
          Questa prop è il riflesso della variable "result" del genitore App.jsx.
      */}
      {data.length > 0 &&
        data.map((el) => (
          <MovieCard
            key={el.show.id}
            id={el.show.id}
            title={el.show.name}
            image={el.show.image?.original ?? ""}
            summary={el.show.summary ?? ""}
            rating={el.show.rating.average}
            onFavourite={() => onFavourite(el)}
            onRemove={() => onRemove(el)}
            isFavourite={isFavourite}
          />
        ))}
    </div>
  );
}
