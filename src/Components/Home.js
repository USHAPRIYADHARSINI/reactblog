import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogContext from "./BlogContext";
import '../App.css';

function Home({ setBlogId }) {
    const {allBlogs, allData} = useContext(BlogContext);
    useEffect(()=>{
        console.log(allData)
    },[])
  const navigate = useNavigate();
  const handleClick = async (id) => {
    await setBlogId(id);
    navigate(`/blog/${id}`);
  };
  return (
    <div className="home">
      <h1>Welcome to my blog</h1>
      <h4>Latest posts</h4>
      <div className="allblogs">
        {allBlogs? allBlogs.map((n, index) => (
          <div className="card" key={index} onClick={() => handleClick(n.blogId)}>
            <img src={n.url} alt="pic" className="img"/>
            <h5 className="cardtitle">{n.headline}</h5>
            <img src={allData.about.picture} alt="profile pic" className="pp"/>
            <p>{allData.about.name}</p>
            <p className="light">{n.dateCreated}</p>
          </div>
        )) : null}
      </div>
    </div>
  );
}

export default Home;
