import "./App.css";
import NameForm from "./NameForm";
import "bootstrap/dist/css/bootstrap.min.css";
import PokeManager from "./PokeManager";

function App() {
  return (
    <div className="App">
      <div className="form-container"></div>
      <PokeManager />
    </div>
  );
}

export default App;
