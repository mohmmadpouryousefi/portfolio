import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/blogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with your actual API call to fetch a specific blog post
    const fetchPost = async () => {
      try {
        // Simulating API call with sample data
        setTimeout(() => {
          // In a real app, you would fetch the specific post by slug
          const samplePost = {
            id: 1,
            title: "Getting Started with React",
            content: `
              <p>React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.</p>
              
              <h2>Why React?</h2>
              <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
              
              <p>Declarative views make your code more predictable and easier to debug.</p>
              
              <h2>Component-Based</h2>
              <p>Build encapsulated components that manage their own state, then compose them to make complex UIs.</p>
              
              <p>Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.</p>
              
              <h2>Learn Once, Write Anywhere</h2>
              <p>We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.</p>
              
              <p>React can also render on the server using Node and power mobile apps using React Native.</p>
            `,
            date: "June 15, 2023",
            author: "Mohammad",
            category: "Frontend",
            image: "https://via.placeholder.com/1200x600?text=React+Basics",
          };
          setPost(samplePost);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
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
            <span className="post-date">{post.date}</span>
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
