import "./App.css";
import MyNavbar from "./components/MyNavbar";
import ThemeContextProvider from "./context/ThemeContextProvider";
import WeatherContextProvider from "./context/WeatherContextProvider";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <>
      {/*Inseriamo dentro al componente di contesto, tutti i componenti che vogliamo voler ricevere i dati condivisi*/}
      {/*In questo caso MyNavbar ha bisogno di accedere al tema corrente*/}
      <ThemeContextProvider>
        <MyNavbar />
      </ThemeContextProvider>

      {/*Inseriamo dentro al componente di contesto, tutti i componenti che vogliamo voler ricevere i dati condivisi*/}
      {/*In questo caso WeatherCard ha bisogno di accedere ai dati ottenuti dall'API*/}
      <WeatherContextProvider>
        <WeatherCard />
      </WeatherContextProvider>
    </>
  );
}

export default App;
