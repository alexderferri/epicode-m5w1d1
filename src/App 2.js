import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import { Alert, Tabs, Tab } from "react-bootstrap";

function App() {
  /* Endpoint dell'API. dopo "q=" aggiungeremo il titolo della serie tv da cercare. 
      Abbiamo questo parametro nella variabile di stato "inputName" del componente figlio SearchBar.jsx
  */
  const API_ENDPOINT = "https://api.tvmaze.com/search/shows?q=";

  // Questa variabile avrà al suo interno un array contenente tutti i risultati presi dalla chimata fetch all'API
  const [results, setResults] = useState([]);

  // Questa variabile avrà una stringa contenente il messaggio da dare all'utente. Rappresentato sotto un Alert di Bootstrap
  const [message, setMessage] = useState("");

  /* Questa variabile terrà traccia della scheda (o Tab) al momento selezionata.
      Nel nostro caso abbiamo "search" e "favourites" che sono rappresentate dall'eventKey nel componente Tab di Bootstrap
  */
  const [currentTab, setCurrentTab] = useState("search");

  // Questa variabile avrà al suo interno un array contenente tutte le serie tv preferite.
  const [favourites, setFavourites] = useState([]);

  // Chiamiamo una callback al momento di montaggio del nostro componente App.jsx. Quindi una volta al refresh della pagina
  useEffect(() => {
    // Ottieni le serie tv preferite salvate nel local storage sotto la key "favourites"
    let localSave = localStorage.getItem("favourites");

    /* Controlla se abbiamo effettivamente dei dati all'interno della chiave "favourites" nel local storage.
      La prima volta non ci sarà sicuramente nessun elemento salvato.
    */
    if (localSave) {
      // Aggiungi all'array "favourites" il contenuto del local storage. Prima assicurati perà di convertire il JSON
      setFavourites(JSON.parse(localSave));
    }
  }, []);

  /* Questa funzione non farà altro che aggiungere all'array "favourites" l'elemento passato come argomento (item)
    item sarà un oggetto javascript rappresentante la serie tv.
  */
  function addToFavourites(item) {
    /* Aggiungi l'elemento a favourites, assicurandoti di non eliminare il contenuto precedente di "favourites".
      In questo caso usiamo lo stato precedente di favourites per poi appendere all'array il nostro item
    */
    setFavourites((prev) => [...prev, item]);

    // Salviamo anche sul local storage l'elemento sotto la chiave "favourites". Assicuriamoci di convertire l'oggetto in JSON
    localStorage.setItem("favourites", JSON.stringify([...favourites, item]));

    // Mostriamo un messaggio all'utente, andando a modificare la variabile "message".
    setMessage("Elemento aggiunto ai preferiti");
  }

  /* Questa funzione non farà altro che rimuovere dall'array "favourites" l'elemento passato come argomento (item)
    item sarà un oggetto javascript rappresentante la serie tv.
  */
  function removeFromFavourites(item) {
    /* Rimuovi l'elemento da favourites. Utilizzeremo il metodo filter dell'array per andare a eliminare solo l'elemento
      che contiene l'id uguale all'elemento passato come parametro (item)
    */
    setFavourites((prev) => prev.filter((el) => el.show.id !== item.show.id));

    // Andiamo ad effettuare la stessa operazione anche sul local storage, assicurandoci di riconvertire in JSON il contenuto dell'array.
    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites.filter((el) => el.show.id !== item.show.id))
    );

    // Mostriamo un messaggio all'utente, andando a modificare la variabile "message"
    setMessage("Elemento rimosso dai preferiti");
  }

  /* Questa funzione verrà invocata dal componente figlio SearchBar.jsx al onSubmit del Form bootstrap.
     L'evento onSubmit si porterà dietro un oggetto che abbiamo chiamato "event" e il valore che è contenuto dentro
     al campo di testo del From (value).
  */
  async function handleSearch(event, value) {
    // Interrompiamo i comportamenti di default del form
    event.preventDefault();
    event.stopPropagation();

    // Resettiamo il messaggio da dare all'utente
    setMessage("");

    // Proviamo ad effettuare la chiamata API
    try {
      // Attendiamo la risposta dalla fetch, in cui abbiamo passatto il nostro URL dell'endpoint e il valore del campo di testo
      const response = await fetch(`${API_ENDPOINT}${value}`);

      // Ok. React ci ha detto che abbiamo ottenuto una risposta, continuiamo l'operazione
      if (response.ok) {
        // Attendiamo che la risposta ci torni nel formato JSON
        const result = await response.json();

        /* Salviamo il risultato della chimata API dentro la variabile di stato "result".
          Il risultato è un array di oggetti che rappresentano le serie tv
        */
        setResults(result);

        // Purtroppo può capitare che il risultato sia un array vuoto, senza alcuna serie tv. Gestiamo questa casistica
        if (result.length <= 0) {
          // Mostriamo all'utente che non è stato trovato nessun risultato
          setMessage("Nessun risultato trovato");
        }
      } else {
        // Gestiamo l'errore. Purtroppo la chiamata API ci ha dato esito negativo

        // Creiamo un'istanza dell'oggetto Error Javascript.
        const error = new Error(`HTTP error! Status: ${response.status}`);

        // Assegnamo all'errore la risposta che abbiamo ottenuto dall'API
        error.response = response;

        // Lanciamo l'errore così che possa essere catturato dal blocco catch qui sotto
        throw error;
      }
    } catch (error) {
      // Scriviamo in console l'errore. Volendo potremmo mostrare all'utente il messaggio contenuto nell'errore, ma non è il caso.
      console.error(error);
    }
  }

  return (
    <div className="App">
      {/* Renderizziamo la Navbar*/}
      <AppNavbar />
      {/* Qui utilizziamo il nostro amato operatore && per mostrare un alert solo se il messaggio non è vuoto (stringa vuota)*/}
      {message && (
        <Alert className="alert" dismissible={true} variant="primary">
          {message}
        </Alert>
      )}
      {/* Renderizziamo le Tabs (schede). Qui c'è da fare un po' di speigazione delle props del componente
          defaultActiveKey è la tab attiva di default, quando il componente Tabs viene montato. Dovviamo utilizzare la evenKey 
          che abbiamo assegnato al componente Tab. activeKey è la Tab attualmente attiva. Siccome vogliamo questo parametro cambi
          durante l'esecuzione della nostra applicazione, la assegnamo alla variabile di stato "currentTab". 
          onSelect ci permette di cambiare il valore di "currentTab" ogni volta noi clicchiamo su una Tab differente.
      */}
      <Tabs
        defaultActiveKey="search"
        id="uncontrolled-tab-example"
        className="mb-3 mt-4"
        activeKey={currentTab}
        onSelect={(k) => setCurrentTab(k)}
      >
        {/* All'interno del componente Tabs renderizziamo due Tab che rappresenteranno la sezione di ricerca della serie tv
           e la sezione dei preferiti. Associamo ad ogni tabo l'eventKey e un title. Il title verrà mostrato nella UI.
           Dentro ad ogni componente Tab andiamo a mettere tutti i componenti che verranno renderizzati quando quella Tab è attiva.
      */}
        <Tab eventKey="search" title="Cerca">
          {/* Passiamo la funzione handleSearch come prop del componente SearchBar.jsx, in modo che possa essere invocata
              quando facciamo il submit del form.
          */}
          <SearchBar onSearch={handleSearch} />
          {/* Passiamo al componente MovieList.jsx una prop chiamata data, che conterrà l'array dei risultati ottenuti dall'API.
             In questo modo potrà renderizzarli correttamente.
             Passiamo inoltre la prop OnFavourite e OnRemove che saranno due callback da invocare quando premiamo sul bottone apposito
             nel componente MovieCard.jsx. Queste due prop dovranno essere passate a due livelli sottostanti, fino ad arrivare al componente MovieCard.jsx
             isFavourite è una prop che servirà a decretare se siamo nella sezione preferiti o meno. Questo ci aiuterà a cambiare il comportamento
             del bottone dentro al componente MovieCard.jsx
          */}
          <MovieList
            data={results}
            onFavourite={addToFavourites}
            isFavourite={false}
          />
        </Tab>
        <Tab eventKey="favourite" title="Preferiti">
          <MovieList
            data={favourites}
            isFavourite={true}
            onRemove={removeFromFavourites}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
