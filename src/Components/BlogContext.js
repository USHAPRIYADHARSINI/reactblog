import {createContext, useState, useEffect} from "react";

const BlogContext = createContext();

export default BlogContext

export const BlogProvider = ({ children }) => {
    const item={
        "@context": "http://schema.org/",
        "@type": "CollectionPage",
        "name": "Articles by: Stepanie Schaefer",
        "headline": "Articles by: Stephanie Schaefer",
    
        "about": {
          "@type": "Person",
          "@id": "#123",
          "name": "Stephanie Schaefer",
          "description": "Stephanie is a Boston native who loves to find ways to escape New England winters. She’s thrown a coin in the Trevi Fountain, sipped wine on a vineyard in Northern Spain and swam in the Mediterranean Sea. Although she hasn’t been everywhere, it’s definitely on her list.",
          "picture":"https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"
          },
      
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "BlogPosting",
              "name": "The Impact of Technology on the Workplace: How Technology is Changing",
              "headline": "The Impact of Technology on the Workplace: How Technology is Changing",
              "description": `<p>Traveling is an enriching experience that opens up new horizons, exposes us to different
              cultures, and creates memories that last a lifetime. However, traveling can also be
              stressful and overwhelming, especially if you don't plan and prepare adequately. In this
              blog article, we'll explore tips and tricks for a memorable journey and how to make the
              most of your travels.
              One of the most rewarding aspects of traveling is immersing yourself in the local culture
              and customs. This includes trying local cuisine, attending cultural events and festivals,
              and interacting with locals. Learning a few phrases in the local language can also go a
              long way in making connections and showing respect.</p>`,
              "url": "https://the-shooting-star.com/wp-content/uploads/2024/01/IMG_8115-1024x1024.jpg",
              "dateCreated": "2016-04-08",
              "author": {"@id": "#123"},
              "blogId":"123456"
            },
            {
              "@type": "BlogPosting",
              "name": "Another post",
              "headline": "Another post",
              "description": `<p>Another post description.</p>`,
              "url": "https://the-shooting-star.com/wp-content/uploads/2024/01/IMG_2303.jpg",
              "dateCreated": "2016-09-08",
              "author": {"@id": "#123"},
              "blogId":"123457"
            }
            ]
          }
      }

    const [allData, setAllData] = useState('')

    const [allBlogs, setAllBlogs] = useState('')

    const [loading, setLoading] = useState(true);
    
  const [oneBlog, setOneBlog] = useState('');

    const contextData = {
        allData,
        setAllData,
        allBlogs,
        setAllBlogs,
        oneBlog,
        setOneBlog
    }

    const all =  localStorage.getItem("items")

    useEffect(() => {
       if(!all){
        localStorage.setItem("items", JSON.stringify(item))
       const data = JSON.parse(localStorage.getItem("items"))
       if(data){
        setAllData(data)
        setAllBlogs(data.mainEntity.itemListElement)
        // setBlogId(null)
        // setOneBlog(null)
       }
       setLoading(false)
       }
    }, [])

    return (
        <BlogContext.Provider value={contextData}>
            {loading ? null : children}
        </BlogContext.Provider>
    )

}