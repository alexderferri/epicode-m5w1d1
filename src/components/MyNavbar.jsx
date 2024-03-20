import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import MyButton from "./MyButton";
import { ThemeContext } from "../context/ThemeContextProvider";
import { useContext } from "react";

export default function MyNavbar() {
  // Usiamo il valore condiviso dal contesto: "theme"
  // Dobbiamo passare al React Hook useContext la reference del contesto da cui
  // vogliamo prendere il valore condiviso
  // Attenzione: nonostante il contesto ThemeContext condivida due valori (theme e setTheme)
  // Noi prendiamo solo "theme", in quanto "setTheme" non ci serve in questo componente
  const { theme } = useContext(ThemeContext);

  return (
    <Navbar bg={theme} variant={theme}>
      <Container>
        <Navbar.Brand>
          {theme === "dark" && (
            <img
              src="https://epicode.com/wp-content/uploads/2022/06/EPICODE-2.0-LOGO-15.png"
              alt="epicode logo"
              width="130"
              height="30"
              className="d-inline-block align-top"
            />
          )}
        </Navbar.Brand>
        <MyButton />
      </Container>
    </Navbar>
  );
}
