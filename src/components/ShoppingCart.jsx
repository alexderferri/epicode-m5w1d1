import React from "react";
import mockData from "../data/mockData";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Container, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";
import CardItem from "../components/CardItem";
import { useParams } from "react-router-dom";

export default function ShoppingCart() {
  const { promo } = useParams();

  params.promo;

  // Creiamo una variabile di stato che conterrà i dati presi dal file mockData.js
  // Inizializziamo la variabile con un array vuoto = []
  const [items, setItems] = useState([]);

  // Andiamo a salvare tutti gli articoli messi nel carello attraverso una variabile di stato
  const [cartItems, setCartItems] = useState([]);

  // Andiamo a salvare il prezzo totale della lista della spesa attraverso una variabile di stato
  const [totalPrice, setTotalPrice] = useState(0);

  // Andiamo a salvare il messaggio da dare all'utente nei diversi contesti
  // Il messaggio sarò un oggetto di questo tipo
  /*
  {
    variant: "danger",
    message: "Hai rimosso questo articolo",
    active: true
  }

*/
  const [showAlert, setShowAlert] = useState({});

  // Al montaggio del componente App, andiamo a popolare la variabile items con i dati presi dal file mockData.js
  useEffect(() => {
    // Andiamo a passare i dati del file mockData.js all'interno della variabile items
    setItems(mockData);
  }, []);

  // Vogliamo fare un debug, per capire se items è stata popolata con i dati di mockData.js
  useEffect(() => {
    console.log(items);
  }, [items]);

  // Vogliamo fare un debug, per capire se cartItems viene aggiornato correttamente
  useEffect(() => {
    // Calcoliamo il prezzo totale
    const newPrice = calculateTotalPrice();

    // Aggiorniamo lo stato di totalPrice
    setTotalPrice(newPrice);
  }, [cartItems]);

  // Questa funzione permetterà all'utente di inserire nell'array del carello, tutti gli articoli
  // che vogliamo aggiungere
  const addToCart = (item) => {
    // Controlla che l'articolo non sia già presente all'interno del carrello
    // (indice) => articolo già presente nella lista
    // (-1) => articolo non presente nella lista

    /* 

      addToCart({id: 4, title: "pokemon card"})
      addToCart({id: 4, title: "pokemon card"})
      //addToCart({id: 98, title: "Spaghetti"})

    [
      {
        id: 4,
        title: "pokemon card"
        quantity: 3
      },
      {
        id: 78,
        title: "basketball"
      }
    ]
    */
    const itemsAlreadyExistingIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    // L'articolo è già presente nella lista
    if (itemsAlreadyExistingIndex !== -1) {
      // Prendiamo gli articoli già presenti nel carrello e li aggiungiamo ad un array temporaneo
      // Utilizziamo lo spread operator (...) per andare a spalmare tutto il contenuto nell'array nuovo
      const updatedCartItems = [...cartItems];

      // Andiamo ad incrementare la quantità dell'elemento di 1
      updatedCartItems[itemsAlreadyExistingIndex].quantity += 1;

      // Andiamo ad aggiornare la lista
      setCartItems(updatedCartItems);
    } else {
      // L'articolo non è presente nel carrello

      // Andiamo ad aggiornare la lista "cartItems", aggiungendo un nuovo oggetto rappresentato
      // dai parametri di items + un parametro "quantity" inizializzato a 1
      // Avremo quindi un array di oggetti simili a questo
      /*
        {
          id: 1
          title: "sony ps5"
          price: 500,
          image: URL,
          quantity: 1
        }
     */
      // setCartItems([...cartItems, {...item, quantity: 1}]);
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }

    setShowAlert({
      variant: "success",
      message: "Hai aggiunto un articolo",
      active: true,
    });
  };

  // Questa funzione permeterrò all'utente di rimuovere l'articolo dal carrello
  // La funzione prende come parametro l'id dell'articolo da rimuovere
  const removeFromCart = (itemId) => {
    // Andiamo a filtrare l'array degli articoli presenti nella lista, andando ad eliminare tutti gli articolo con l'id
    // passato come parametro
    //const updatedCartItems = cartItems.filter((el) => el.id !== itemId);

    // Itera tutta la lista della spesa
    for (let i = 0; i < cartItems.length; i++) {
      // Se l'elemento ha lo stesso id dell'elemento passato alla funzione, diminuisci la sua quantità di 1
      if (cartItems[i].id === itemId) {
        // Diminuisci la quantità di 1
        cartItems[i].quantity--;
      }
    }

    // Andiamo a filtrare la lista della spesa, togliendo tutti gli elementi che hanno quantità <= 0
    const updatedCartItems2 = cartItems.filter((el) => el.quantity >= 1);

    // Andiamo ad aggiornare la lista degli articoli nella lista della spesa.
    // Variabile di stato "cartItems"
    setCartItems(updatedCartItems2);

    setShowAlert({
      variant: "danger",
      message: "Hai rimosso un articolo",
      active: true,
    });
  };

  // Questa funzione ci servirà per andare a calcolare il prezzo totale degli articoli nella listaù
  const calculateTotalPrice = () => {
    // Vai a iterare tutti gli elementi dell'array e attraverso un'accumulator "total", vai ad aggiungere il prezzo per la quantitò
    let total = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    total -= promo > 0 ? (total / 100) * promo : 0;
    return total;
  };

  return (
    <Container>
      <h1 className="text-center my-4">Articoli in sconto</h1>
      <Row>
        {items.map((item) => (
          <Col key={item.id} md={4}>
            <ItemCard
              onAdd={() => addToCart(item)}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          </Col>
        ))}
      </Row>
      {showAlert.active && (
        <Alert
          variant={showAlert.variant}
          onClose={() => setShowAlert({ active: false })}
          dismissible
        >
          {showAlert.message}
        </Alert>
      )}
      <hr />
      <h2>Lista della spesa</h2>
      <ListGroup>
        {cartItems.map((cartItem) => (
          <CardItem
            id={cartItem.id}
            title={cartItem.title}
            price={cartItem.price}
            quantity={cartItem.quantity}
            onRemove={() => removeFromCart(cartItem.id)}
          />
        ))}
      </ListGroup>
      <div className="mt-4">
        <h3>Prezzo Totale: ${totalPrice}</h3>
      </div>
    </Container>
  );
}
