import React, { createContext } from "react";
import { useState, useEffect } from "react";

// Creiamo il contesto per la gestione dei dati del tempo metereologico
// Il valore di default del contesto sarà null
export const WeatherContext = createContext(null);

export default function WeatherContextProvider({ children }) {
  // Crea lo stato del contesto. Qui avremo il risultato della nostra API del meteo.
  // Per ora, è un'oggetto vuoto.
  const [weatherData, setWeatherData] = useState({});

  // Questo è l'endpoint della nostra API
  const API_ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min";

  // Questa funzione chiamerà l'API e metterà il risultato dentro alla variabile di stato "weatherData"
  async function fetchWeatherData() {
    // Facciamo il solito blocco try and catch per gestire eventuali errori
    try {
      // Proviamo ad ottenere la risposta dal server
      const response = await fetch(API_ENDPOINT);

      // Abbiamo ottenuto risposta affermativa?
      if (response.ok) {
        // Otteniamo il JSON dalla risposta
        const result = await response.json();

        // Settiamo il risultato dentro la variabile di stato "weatherData"
        setWeatherData(result);
      } else {
        // Gestiamo l'errore. Putroppo la chiamata API ci ha dato esito negativo
        const error = new Error(`HTTP Error! Status: ${response.status}`);
        error.response = response;
        throw error;
      }

      // Catturiamo l'errore
    } catch (err) {
      console.error(err);
    }
  }

  // Fai la chimata API non appena il componente viene montato
  // Per fare questo, lasciamo l'array delle dipendenze vuoto
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Questo è un oggetto dei valori che verranno condivisi nel contesto
  const value = {
    weatherData,
  };

  // Passiamo l'oggetto dei valori condivisi nella prop "value"
  // Rendirizziamo poi tutti i figli del componente di contesto
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
