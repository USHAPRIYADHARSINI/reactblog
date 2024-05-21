// import logo from './logo.svg';
import { useContext, useEffect, useState } from "react";
import "./App.css";
import Blog from "./Components/Blog";
import Home from "./Components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditBlog from "./Components/EditBlog";
import AddBlog from "./Components/AddBlog";
import { BlogProvider } from "./Components/BlogContext";
import BlogContext from "./Components/BlogContext";

function App() {
  const [blogId, setBlogId] = useState("");
  const navigate = useNavigate();
  // const {allData} = useContext(BlogContext);

  return (
    <BlogProvider>
      <div className="App">
        <div className="topbar">
          <button onClick={()=>navigate("/")}> Home</button>
          <h4>Blog with me</h4>
        </div>
        
        <Routes>
          <Route path="/" element={<Home setBlogId={setBlogId} />} />
          {/* <Route path="/blog/addnew" element={<AddBlog />} /> */}
          <Route path={`/blog/${blogId}`} element={<Blog blogId={blogId} />} />
          <Route path={`/blog/edit/${blogId}`} element={<EditBlog />} />
        </Routes>
        <p className="notification">Kindly clear your local storage and refresh if you want to undo all the data changes</p>
      </div>
    </BlogProvider>
  );
}

export default App;
