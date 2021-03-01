import React, { useEffect, useState } from "react";

import "./App.css";

import Chuck from "./chuck.png";

import axios from "axios";

function App() {
  const [joke, setJoke] = useState("");
  const [query, setQuery] = useState("");
  const [searchedJokes, setSearchedJokes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    console.log(response.data.value);
    setJoke(response.data.value);
  };
  const getResult = async (e) => {
    e.preventDefault();
    const searchUrl = `https://api.chucknorris.io/jokes/search/`;
    const res = await axios.get(searchUrl, {
      params: {
        query: query,
      },
    });
    console.log(res.data.result)
    setSearchedJokes(res.data.result)

    console.log(searchedJokes.length)
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // change state for query her
    setQuery(e.target.value);
    console.log(query);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">CHUCKNORRIS JOKES</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-header">Search for a word</div>
            <div className="card-body">
              <input type="text" defaultValue={query} onChange={handleSearch} />
            </div>
          </div>
          <div>
            <button className="btn btn-warning" onClick={getResult}>
              Generate Joke
            </button>
          </div>
        </div>

        {/* <h3 className="subTitle">{joke}</h3> */}
  <div className="randomJoke">{joke}</div>
  <h3 className="searched_jokes_title">Searched Jokes</h3>
<div className="searchedJokes">
  {searchedJokes.length <= 0 ? (
    <p className="no_search">You have no searched joke yet</p>
  ) : (
    searchedJokes.map((result,index) =>
      <div key={index} className="single_search">{result.value}</div>)
      .filter((result,index) => index <= 5)
  )}
</div>
      </div>
    </div>
  );
}

export default App;
