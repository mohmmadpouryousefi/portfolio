import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/blogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/posts/${slug}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const data = await response.json();
        console.log("Post data:", data); // Debug log

        if (data.success && data.post) {
          setPost(data.post);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="loading-spinner">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-page">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="error-message">
          <h2>Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to format date safely
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Unknown date";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Unknown date";
    }
  };

  // Helper function to get author safely
  const getAuthor = (post) => {
    return post.author || "Unknown Author";
  };

  return (
    <div className="blog-post-page">
      <div className="blog-post-container">
        <div className="blog-post-header">
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
          
          <div className="post-category-badge">{post.category}</div>
          
          <h1 className="post-title">{post.title}</h1>
          
          <div className="post-meta">
            <span className="post-date">
              {formatDate(post.createdAt)}
            </span>
            <span className="post-author">
              By {getAuthor(post)}
            </span>
          </div>
        </div>

        {post.image && (
          <div className="post-featured-image">
            <img 
              src={post.image} 
              alt={post.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="post-content">
          <div className="post-excerpt">
            <p>{post.excerpt}</p>
          </div>
          
          <div className="post-body">
            {/* Split content by newlines and render as paragraphs */}
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>{paragraph.trim()}</p>
              )
            ))}
          </div>
        </div>

        <div className="post-footer">
          <div className="post-tags">
            <span className="tag">{post.category}</span>
          </div>
          
          <div className="post-navigation">
            <Link to="/blog" className="back-to-blog-btn">
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
