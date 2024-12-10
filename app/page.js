'use client'
import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";

function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [wordsNumber, setWordsNumber] = useState(0);
  let posts = [
    {
    title:"Understanding the difference between grid-templates and grid-auto",
    content:"With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns. Although I knew they were to d..."
    ,date:"Oct 09,2018"
  }]
  useEffect(()=>{
    function countWords(){
      const query = searchQuery.toLowerCase()
      if(query.trim() === ""){setWordsNumber(0);return}
      let count =0;
      posts.forEach(post =>{
        const title =post.title.toLowerCase().split(" ")
        title.forEach(word => {
          if(word.includes(query))count++
          
        })
        const content = post.content.toLowerCase().split(" ")
        content.forEach(word => {
          if(word.includes(query))count++
        })
        const date = post.date.toLowerCase().split(" ")
        date.forEach(word => {
          if(word.includes(query))count++
          
        })
      })
      setWordsNumber(count)
  
    }
    countWords()

  },[posts,searchQuery]) 
  

  const filtered = posts.filter(post =>post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  posts.filter(post => post.content.toLowerCase().includes(searchQuery))
)
  return (
    <div>
      <input
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <br></br>
      {wordsNumber > 0 && <span><b>{wordsNumber} posts</b> were found</span>}
      <div>
        {filtered.map((post) => (
          <div key={post.title}>
            <h3>
              <Highlighter
                searchWords={[searchQuery]}
                textToHighlight={post.title}
                autoEscape={true}
              />
            </h3>
            <p>{post.date}</p>
            <p>
              <Highlighter
                searchWords={[searchQuery]}
                textToHighlight={post.content}
                autoEscape={true}
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;