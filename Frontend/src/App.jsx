import { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "a960a6e0ad42e6cf104b";

function App() {
  const [reRender, setReRender] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const useParam = new URLSearchParams(queryString);
    const codeParam = useParam.get("code");
    // console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"), // Bearer ACCESSTOKEN
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setUserData(data);
      });
  }

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?scope=user&client_id=" +
        CLIENT_ID
    );
  }

  return (
    <div className="app">
      <header className="App-header">
        {localStorage.getItem("accessToken") ? (
          <>
            <h1> We have the Access Token </h1>
            <button
              onClick={() => {
                localStorage.removeItem("accessToken");
                setReRender(!reRender);
              }}
            >
              Logout
            </button>
            <h3>get User Data from Github API</h3>
            <button onClick={getUserData}>Get Data</button>
            <br />
            {userData ? (
              <>
                name: {userData.name}
                <br />
                Profile Page: <a href={userData.html_url} target="_blank">{userData.html_url}</a>
              </>
            ) : null}
          </>
        ) : (
          <>
            <button onClick={loginWithGithub}>Login Withb Github</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
