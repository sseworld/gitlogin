import { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "a960a6e0ad42e6cf104b";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const queryString = window.location.search;
    const useParam = new URLSearchParams(queryString);
    const codeParam = useParam.get("code");
    console.log(codeParam)
  }, []);

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?scope=user&client_id=" +
        CLIENT_ID
    );
  }

  return (
    <div className="app">
      <header className="App-header">
        <button onClick={loginWithGithub}>Login Withb Github</button>
      </header>
    </div>
  );
}

export default App;
