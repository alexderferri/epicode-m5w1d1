import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContextProvider";

export default function MyButton() {
  // Usiamo i due valori condivisi dal contesto: "theme" e "setTheme"
  // Dobbiamo passare al React Hook useContext la reference del contesto da cui
  // vogliamo prendere i valori condivisi
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Cambia Tema
    </Button>
  );
}
