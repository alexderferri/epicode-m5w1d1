import React from "react";
import { Card, Button } from "react-bootstrap";
import HTMLReactParser from "html-react-parser";
import "./MovieCard.css";

export default function MovieCard(props) {
  const {
    id,
    title,
    image,
    summary,
    rating,
    onFavourite,
    onRemove,
    isFavourite,
  } = props;

  return (
    <Card bg="dark" text="light" border="primary" style={{ width: "18rem" }}>
      <Card.Header>{`#${id} ${title}`}</Card.Header>
      <Card.Img
        variant="top"
        src={image}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>Trama</Card.Title>
        <Card.Text style={{ maxHeight: "150px", overflowY: "auto" }}>
          {summary && HTMLReactParser(summary)}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>Punteggio: {rating != null ? rating : "0"}</small>
      </Card.Footer>
      {/* Se ci troviamo nella sezione preferiti renderizziamo il bottone "Rimuovi dai Preferiti"
        altrimenti renderizziamo il bottone "Aggiungi ai Preferiti".
        I due bottoni hanno due callback diverse all'onClick. Il primo onFavourite e il secondo onRemove.
        Queste due prop che contengono due funzioni, hanno fatto tanto strada per arrivare qui. Pensa che arrivano dal componente
        due livelli sopra App.jsx!
      */}
      {!isFavourite ? (
        <Button onClick={onFavourite}>Aggiungi ai Preferiti</Button>
      ) : (
        <Button variant="danger" onClick={onRemove}>
          Rimuovi dai Preferiti
        </Button>
      )}
    </Card>
  );
}
