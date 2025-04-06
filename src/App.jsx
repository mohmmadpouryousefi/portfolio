import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 seconds loading time
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  if (error) return <div>Error loading the page</div>;
  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <Hero />
      <About />
      <Skills />
      {/* <Header /> */}
      <Footer />
      <BackToTop />
      {/* Other components will go here */}
    </div>
  );
}

export default App;
