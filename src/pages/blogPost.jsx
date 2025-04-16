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
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${slug}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="loading-spinner">Loading post...</div>;
  }

  if (error) {
    return <div className="post-not-found">{error}</div>;
  }

  if (!post) {
    return <div className="post-not-found">Post not found</div>;
  }

  return (
    <div className="blog-post-page">
      <div className="blog-post-container">
        <Link to="/blog" className="back-to-blog">
          &larr; Back to Blog
        </Link>

        <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="post-author">By {post.author}</span>
            <span className="post-category">{post.category}</span>
          </div>
        </div>

        <div className="blog-post-featured-image">
          <img src={post.image} alt={post.title} />
        </div>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="blog-post-share">
          <h3>Share this post</h3>
          <div className="share-buttons">
            <button className="share-btn twitter">Twitter</button>
            <button className="share-btn facebook">Facebook</button>
            <button className="share-btn linkedin">LinkedIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
