import React, { useState } from 'react';
import { Person } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddBlog({setAllBlogs}, {setAllData},{allData}) {
    const [addNew, setAddNew] = useState('')
    function getId(){
        return Date.now().toString(36);
    }
    const id = getId()
    const newBlog = {
        "@type": "BlogPosting",
        "name": "Another post",
        "headline": "Another post",
        "description": addNew,
        "url": "http://www.cheapflight.com.uk/news/another-post/",
        "dateCreated": new Date(),
        "author": {"@id": "#123"},
        "blogId": id
      }
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
    const handleShoot = async() => {
        let oldBlogs = allData.mainEntity.itemListElement         
         let newSet = [newBlog,...oldBlogs]
         await setAllBlogs(newSet);
         const newAllData = {...allData};
         newAllData.mainEntity.itemListElement = newSet
         await setAllData(newAllData)
        if(newSet && allData){
            localStorage.clear()
            localStorage.setItem("item", allData)
        }  
    }
  return (
    <div>
        <h4>Add a new Blog</h4>
    <ReactQuill
            modules={quillModule}
            // className= "react-quill"
            theme="snow"
            name="addNew"
            value={addNew}
            onChange={setAddNew}
          />
    {/* <JsonLd<Person>                                     
      item={{
            "@context": "http://schema.org/",
            "@type": "CollectionPage",
            "name": "Articles by: Stepanie Schaefer",
            "headline": "Articles by: Stephanie Schaefer",

            "about": {
              "@type": "Person",
              "@id": "#123",
              "name": "Stephanie Schaefer",
              "description": "Stephanie is a Boston native who loves to find ways to escape New England winters. She’s thrown a coin in the Trevi Fountain, sipped wine on a vineyard in Northern Spain and swam in the Mediterranean Sea. Although she hasn’t been everywhere, it’s definitely on her list."
              },
          
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "BlogPosting",
                  "name": "Top 10 booze-infused getaways",
                  "headline": "Top 10 booze-infused getaways",
                  "description": "Vacations are all about letting loose, so it’s no surprise that more and more travelers are opting for locations known for their libations. Whether you’re a former keg stand ..",
                  "url": "http://www.cheapflight.com.uk/news/top-10-booze-infused-getaways/",
                  "dateCreated": "2016-04-08",
                  "author": {"@id": "#123"}
                },
                {
                  "@type": "BlogPosting",
                  "name": "Another post",
                  "headline": "Another post",
                  "description": "Another post description.",
                  "url": "http://www.cheapflight.com.uk/news/another-post/",
                  "dateCreated": "2016-09-08",
                  "author": {"@id": "#123"}
                }
                ]
              }
          }}
    /> */}
    <button onClick={()=> handleShoot(addNew)}>Shoot</button>              

    {/* check schema before adding */}

</div>
  )
}

export default AddBlog