import React from "react";
import "../styles/loading.css";

const Loading = () => {
  const loadingText = "Loading...";

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">
        {loadingText.split("").map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;