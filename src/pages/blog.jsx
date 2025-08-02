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
        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/posts`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch posts: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Handle the correct response format from your backend
        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
          // Extract unique categories
          // CORRECT - use data.posts instead of data
          const uniqueCategories = [
            ...new Set(data.posts.map((post) => post.category)),
          ];
          setCategories(["All", ...uniqueCategories]);
        } else {
          throw new Error("Invalid response format from server");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching posts");
        console.error("Error fetching posts:", err);
        setPosts([]); // Set empty array as fallback
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
                  <img
                    src={post.image || "/placeholder-image.jpg"}
                    alt={post.title}
                    onError={(e) => {
                      // Use a placeholder or hide the image instead
                      e.target.style.display = "none";
                      // Or use a data URL for a simple placeholder
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";
                    }}
                  />
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="post-content">
                  <h2 className="post-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <div className="post-meta">
                    <span className="post-date">
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                    <span className="post-author">
                      By {post.author || "Unknown Author"}
                    </span>
                  </div>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              {error
                ? "Failed to load posts"
                : "No posts found in this category"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
