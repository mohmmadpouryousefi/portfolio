import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Updated to use Vite's environment variable format
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((post) => post.category)),
        ];
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        setError(err.message || "An error occurred while fetching posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by category
  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>My Blog</h1>
        <p>Thoughts, tutorials, and insights about web development</p>
        {localStorage.getItem("isAuthenticated") === "true" && (
          <Link to="/admin/blog/new" className="new-post-btn">
            Create New Post
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="blog-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-spinner">Loading posts...</div>
      ) : (
        <div className="blog-posts-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="blog-post-card" key={post._id}>
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-content">
                  <h2 className="post-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="post-meta">
                    <span className="post-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="post-author">By {post.author}</span>
                  </div>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">No posts found in this category</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
