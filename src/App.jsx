import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      <Header />
      <Footer />
      {/* Other components will go here */}
    </div>
  );
}

export default App;
