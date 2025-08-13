import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import "../../styles/admin/blogEditor.css";

const BlogEditor = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      console.log("Token exists:", !!token); // Debug log
      console.log("Token preview:", token ? token.substring(0, 20) + "..." : "No token"); // Debug log

      if (!token) {
        throw new Error("Authentication required. Please login first.");
      }

      // Validate token format (JWT should have 3 parts separated by dots)
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format. Please login again.");
      }

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      console.log("API URL:", apiUrl); // Debug log

      // Call the backend API to create a new post
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, // This is correct for your backend
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();
      console.log("Response data:", data); // Debug log

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated");
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(data.msg || `Server error: ${response.status}`);
      }

      alert("Post created successfully!");
      navigate("/blog");
    } catch (error) {
      setError(error.message || "An error occurred while creating the post");
      console.error("Error creating post:", error);
      
      // If it's an auth error, redirect to login
      if (error.message.includes("Authentication") || error.message.includes("Session expired")) {
        setTimeout(() => {
          navigate("/admin/login");
        }, 2000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="blog-editor">
      <div className="editor-container">
        <div className="editor-header">
          <h1>Create New Blog Post</h1>
          <Button 
            onClick={handleLogout} 
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              required
              placeholder="e.g. Web Development, Design, JavaScript"
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt}
              onChange={handleChange}
              required
              rows="3"
              placeholder="A brief summary of your post"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              rows="10"
              placeholder="Your full blog post content"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={post.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/blog")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;