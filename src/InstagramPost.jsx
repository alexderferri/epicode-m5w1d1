import React from "react";
import { useState } from "react";
import { Card, Button, Badge, Container, Row, Col } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export default function InstagramPost(props) {
  const { image, title, description, comments } = props;

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  function handleLikes() {
    // Se abbiamo messo mi piace, togliamo il like. Altrimenti, aggiungiamo un like
    setLikes((prevState) => (!liked ? prevState + 1 : prevState - 1));

    // Togli o metti il like al post
    setLiked(!liked);
  }

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex flex-column justify-content-between align-content-center">
            {comments.map((el, index) => (
              <div
                style={{
                  border: "1px solid gray",
                }}
                className="d-flex flex-column justify-content-around align-content-center"
                key={index}
              >
                <h4>{el.user}</h4>
                <p>{el.text}</p>
                <h5>{el.timestamp} ore fa</h5>
              </div>
            ))}
          </div>
          <Button onClick={handleLikes} variant="outline-primary">
            {!liked && (
              <FaHeart
                style={{
                  marginRight: "8px",
                  color: "red",
                }}
              />
            )}
            {liked ? "Non mi piace più" : "Mi piace"}
          </Button>
        </Card.Body>
        <Badge bg="secondary">{`${likes} mi piace`}</Badge>
      </Card>
    </div>
  );
}
