import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'

function Rightbar() {

  const [news,setNews]=useState([])

  const getNews = () => {
    fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=e6dd438be58a48f09e0531cf0dad4d3e")
    .then(res => res.json())
    .then(json=>setNews(json.articles))
  } 

  useEffect(()=>{
   getNews()
  },[])


  const newsList = news.slice(1,8)

  

  return (
    <div style={{borderRadius:"20px",backgroundColor:"white",height:"500px",paddingTop:"10px",paddingLeft:"20px"}}>
      <h4>News</h4>
      {newsList.map((eachNews)=>{
        return <>
        <li style={{marginTop:"10px"}}>{eachNews.title}</li>
        </>
      })}
    </div>
  )
}

export default Rightbar
