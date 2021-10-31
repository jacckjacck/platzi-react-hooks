import React, { useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Characters from "./Characters";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);

  return (
    <>
      <div className="Header">
        <h1 style={{ color }}>ReactHooks</h1>
        <button type="button" onClick={() => setDarkMode(!darkMode)}>
          DarkMode
        </button>
      </div>
      <Characters />
    </>
  );
};

export default Header;
