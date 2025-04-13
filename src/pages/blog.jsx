import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with your actual API call to fetch blog posts
    const fetchPosts = async () => {
      try {
        // Simulating API call with sample data
        // In a real app, you would fetch from your backend or CMS
        setTimeout(() => {
          const samplePosts = [
            {
              id: 1,
              title: "Getting Started with React",
              excerpt:
                "Learn the basics of React and how to create your first component.",
              date: "June 15, 2023",
              author: "Mohammad",
              category: "Frontend",
              image: "https://via.placeholder.com/800x400?text=React+Basics",
              slug: "getting-started-with-react",
            },
            {
              id: 2,
              title: "CSS Grid vs Flexbox",
              excerpt:
                "Understanding when to use CSS Grid and when to use Flexbox for layouts.",
              date: "July 2, 2023",
              author: "Mohammad",
              category: "CSS",
              image:
                "https://via.placeholder.com/800x400?text=CSS+Grid+vs+Flexbox",
              slug: "css-grid-vs-flexbox",
            },
            {
              id: 3,
              title: "JavaScript Best Practices",
              excerpt:
                "Improve your JavaScript code with these best practices and tips.",
              date: "August 10, 2023",
              author: "Mohammad",
              category: "JavaScript",
              image:
                "https://via.placeholder.com/800x400?text=JavaScript+Best+Practices",
              slug: "javascript-best-practices",
            },
          ];
          setPosts(samplePosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>My Blog</h1>
        <p>Thoughts, tutorials, and insights about web development</p>
        <Link to="/admin/blog/new" className="new-post-btn">
          Create New Post
        </Link>
      </div>

      <div className="blog-categories">
        <button className="category-btn active">All</button>
        <button className="category-btn">Frontend</button>
        <button className="category-btn">Backend</button>
        <button className="category-btn">JavaScript</button>
        <button className="category-btn">CSS</button>
        <button className="category-btn">React</button>
      </div>

      <div className="blog-search">
        <input type="text" placeholder="Search articles..." />
        <button>Search</button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="blog-posts-grid">
          {posts.map((post) => (
            <div className="blog-post-card" key={post.id}>
              <div className="post-image">
                <img src={post.image} alt={post.title} />
                <span className="post-category">{post.category}</span>
              </div>
              <div className="post-content">
                <h2 className="post-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-author">By {post.author}</span>
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="blog-pagination">
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default Blog;
