import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContextProvider";

export default function WeatherCard() {
  // Usiamo il valore condiviso dal contesto: "weatherData"
  // Dobbiamo passare al React Hook useContext la reference del contesto da cui
  // vogliamo prendere i valori condivisi: WeatherContext
  const { weatherData } = useContext(WeatherContext);

  // Variabili per la temperatura e la temperatura minima. Inizializzate a zero di default
  const [temperature, setTemperature] = useState(0);
  const [minTemperature, setMinTemperature] = useState(0);

  // Chiama questa callback ognivolta che weatherData cambia valore
  // In questo modo quando weatherData si popolerà di dati tramite la chimata API,
  // noi possiamo assegnare temperature e minTemperature
  useEffect(() => {
    // Assicuriamoci che weatherData abbia del contenuto. All'inizio sarà un {} = oggetto vuoto
    if (weatherData) {
      // Imposta le temperature in base al risultato dell'oggetto weatherData
      setTemperature(weatherData?.daily?.temperature_2m_max[0]);
      setMinTemperature(weatherData?.daily?.temperature_2m_min[0]);
    }
  }, []);

  return (
    <div className={`weather-card ${theme === "dark" ? "dark-card" : ""}`}>
      {/*Stilizza il div qui sopra, aggiungendo la classe "dark-card" solo se il tema è "dark"*/}
      <h1>Temperatura: {temperature}</h1>
      <h2>Temperatura Min: {minTemperature}</h2>
    </div>
  );
}
