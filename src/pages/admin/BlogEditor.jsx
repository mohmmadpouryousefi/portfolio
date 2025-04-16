import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  // Inside the handleSubmit function, update the fetch call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      // Call the backend API to create a new post
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to create post");
      }

      alert("Post created successfully!");
      navigate("/blog");
    } catch (error) {
      setError(error.message || "An error occurred while creating the post");
      console.error("Error creating post:", error);
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
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
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
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/blog")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;
