import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ItemCard(props) {
  // Il componente ItemCard riceve le seguenti props dal suo componente genitore
  const { image, title, price, onAdd } = props;

  return (
    <Card className="mb-4" style={{ width: "18rem", height: "30rem" }}>
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
        <Button onClick={onAdd}>Acquista</Button>
      </Card.Body>
    </Card>
  );
}
