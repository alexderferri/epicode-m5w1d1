import React, { createContext } from "react";
import { useState } from "react";

// Creiamo il contesto per la gestione del tema (chiaro o scuro)
// Il valore di default del contesto sarà null
export const ThemeContext = createContext(null);

// Passiamo al componente tutti i figli che verranno renderizzati sotto di esso
export default function ThemeContextProvider({ children }) {
  // Inizializziamo lo stato del componente di contesto
  // Lo stato rappresenterà il tema utilizzato dall'utente (chiaro o scuro)
  const [theme, setTheme] = useState("dark");

  // Creiamo un oggetto con tutti i valori che verranno condivisi pubblicamente
  // con tutti i componenti che possono accedere al contesto
  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
  };

  // Passiamo l'oggetto dei valori condivisi nella prop "value"
  // Rendirizziamo poi tutti i figli del componente di contesto
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
