import React from "react";
import { ListGroup, Button } from "react-bootstrap";

export default function CardItem(props) {
  const { id, title, price, quantity, onRemove } = props;
  return (
    <ListGroup.Item key={id}>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          {title} - ${price} x {quantity}
        </span>
        <Button variant="danger" onClick={onRemove}>
          Rimuovi
        </Button>
      </div>
    </ListGroup.Item>
  );
}
