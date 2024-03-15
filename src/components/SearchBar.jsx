import React from "react";
import { Form, Button } from "react-bootstrap";
import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar(props) {
  const { onSearch } = props;

  const [inputName, setInputName] = useState("");

  return (
    <Form onSubmit={(e) => onSearch(e, inputName)} className="m-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="search-title">Cerca Serie</Form.Label>
        <Form.Control
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          type="text"
          placeholder="Inserisci nome della serie"
        />
        <Form.Text className="search-muted">
          Inserisci il titolo di una serie tv.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Cerca
      </Button>
    </Form>
  );
}
