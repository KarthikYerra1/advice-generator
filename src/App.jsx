import { useState, useEffect } from "react";

import patternDividerMobile from "./assets/images/patternDividerMobile.svg";
import patternDividerDesktop from "./assets/images/patternDividerDesktop.svg";
import iconDice from "./assets/images/iconDice.svg";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState("");
  const [styleBtn, setStyleBtn] = useState("");

  const getAdvice = async () => {
    const apiUrl = "https://api.adviceslip.com/advice";
    const options = { method: "GET" };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    const { id, advice } = data.slip;
    setAdvice(advice);
    setAdviceId(id);
    setStyleBtn("");
  };

  const handleOnClick = () => {
    setStyleBtn("rotate-dice");
    setTimeout(() => {
      getAdvice();
    }, 500);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="advice-container">
      <div>
        <h3>ADVICE #{adviceId}</h3>
        <h1>{`"${advice}"`}</h1>
        <picture>
          <source srcSet={patternDividerMobile} media="(max-width: 575px)" />
          <source srcSet={patternDividerDesktop} />
          <img
            src={patternDividerDesktop}
            alt="pattern-divider"
            style={{ width: "100%", height: "auto" }}
            className="pattern-divider"
          />
        </picture>

        <button className={`dice-btn ${styleBtn}`} onClick={handleOnClick}>
          <img src={iconDice} alt="dice-icon" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default App;
