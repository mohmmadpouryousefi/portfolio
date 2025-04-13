import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Blog from "./pages/blog";
import BlogPost from "./pages/blogPost";
import "./App.css";
import BlogEditor from "./pages/admin/BlogEditor";

// Add these imports
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Skills />
                <Footer />
                <BackToTop />
              </>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/blog/new"
            element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
