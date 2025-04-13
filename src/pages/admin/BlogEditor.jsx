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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would send the data to your backend API
      // For now, we'll just simulate a successful submission
      console.log("Submitting post:", post);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Post created successfully!");
      navigate("/blog");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-container">
        <h1>Create New Blog Post</h1>

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
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="React">React</option>
            </select>
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
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={post.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              rows="15"
            ></textarea>
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
