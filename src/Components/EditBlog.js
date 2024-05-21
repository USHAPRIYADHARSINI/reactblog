import React, { useContext, useRef, useState } from 'react'
import parse from 'html-react-parser';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlogContext from './BlogContext';
import { Navigate, useNavigate } from 'react-router-dom';
// import styles from "../styles.module.css";

function EditBlog({blogId}) {
    const navigate = useNavigate()

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
    
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
    
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
    
        ['clean']                                         // remove formatting button
      ];
    
      const quillModule = {
        toolbar: toolbarOptions,
      }

    const {allData, allBlogs, setAllBlogs, setAllData, setOneBlog, oneBlog} = useContext(BlogContext)

    const quillref = useRef(oneBlog.description)

    const handleDone = async(id) => {
        // allBlogs.map((n,index)=>(console.log(n.blogId)))
        console.log(id)
        let oldBlogs = allBlogs.filter((n,index)=>((n.blogId))!==id)         // identify how to destructure
        console.log(oldBlogs)
        const newdata = quillref.current.value
        console.log(newdata)
        const newSetofdata = {...oneBlog, "description": newdata, "modified": new Date()}
         let newSet = [newSetofdata,...oldBlogs];
         console.log(newSet)
         await setAllBlogs(newSet);
         const newAllData = {...allData};
         newAllData.mainEntity.itemListElement = newSet
         await setAllData(newAllData)
        if(newSet && allData){
            localStorage.clear();
            localStorage.setItem("item", allData)
            setOneBlog(newSet)
        }
        if(oneBlog){
            alert("Items edited successfully")
            navigate('/')
        }
    }

  return (
    <div>EditBlog
        <h4>{console.log(oneBlog)}</h4>
        <QuillEditor
                modules={quillModule}
                className= "quill-editor"
                theme="snow"
                name="quillref"
                ref={quillref}
                defaultValue = {oneBlog.description}
              />
        <button onClick={()=> handleDone(oneBlog.blogId)}>Done!</button>
    </div>
  )
}

export default EditBlog