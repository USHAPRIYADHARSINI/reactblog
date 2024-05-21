import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import "../App.css";

function Blog({ blogId }) {
  const navigate = useNavigate();
  const { allData, setOneBlog, oneBlog } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  const handleEdit = async (blogId) => {
    if (blogId) {
      navigate(`/blog/edit/${blogId}`);
    }
  };

  useEffect(() => {
    const allBlogs = allData.mainEntity.itemListElement;
    console.log(allBlogs, blogId);
    if (blogId && allBlogs) {
      let [one] = allBlogs.filter((n, index) => n.blogId == blogId);
      console.log(one);
      setOneBlog(one);
      setLoading(false);
    }
  }, []);

  return (
    <div className="blogpost">
      {loading ? (
        <h4>Loading is true</h4>
      ) : (
        <>
          <div className="headline">
            <h2>{oneBlog.headline}</h2>
            <button onClick={() => handleEdit(blogId)}>Edit</button>
          </div>
          <div className="blog-details">
            <div className="profile">
              <img src={allData.about.picture} alt="profile picture" className="pp" />
              <p>{allData.about.name}</p>
            </div>
            <p>{oneBlog.dateCreated}</p>
          </div>
          <img src={oneBlog.url} alt="blog image" className="blogimg" />
          <div className="theblog">{parse(oneBlog.description)}</div>
          </>
      )}
    </div>
  );
}

export default Blog;
