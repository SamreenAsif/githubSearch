import React, { useState } from "react";
import "./SearchUser.css";

export const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [result, setResults] = useState([]); // state for storing data received from api

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("search-btn").click();
    }
  };

  const handleSearchInputChange = (event) => {
   
    setUsername(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${username}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const data = await response.json();
   
      setResults((prev)=>[
        ...prev,
        ...data.items,
      ]);

    } catch (error) {
      console.error("Error occurred while fetching data from API:", error);
    }
  };

  return (
    <>
      <div className="header">
        <h1>GitHub Search</h1>
      </div>
      <form className="search-bar">
        <input
          type="text"
          name="Search"
          placeholder="Search..."
          id="search-text"
          value={username}
          onKeyDown={handleKeyDown}
          onChange={handleSearchInputChange}
        />
        <button id="search-btn" onClick={handleSearch}>
          SEARCH
        </button>
      </form>

      {result.length > 0 && (
        <div>
          {result.map((user) => (
            <div className="container" key={user.id}>
              <div className="profile">
                <img src={user.avatar_url} id="profile-img" alt={user.login} />
              </div>
              <div className="user-info">
                <p>
                  <label htmlFor="name" id="user-name">
                    Name :{" "}
                  </label>{" "}
                  {user.login}
                </p>
                <p>
                  <label htmlFor="link" id="user-account-link">
                    Link :{" "}
                  </label>
                  <a href={user.html_url}>{user.html_url}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
