import React from 'react'
import reactjs from "../images/reactjs.png"
import user from "../images/user.png"
import { Link } from 'react-router-dom'
function Sidebar({userData}) {

  return (
    <div style={{backgroundColor:"white",border:"1px solid #C6C3C3",width:"250px",height:"370px",borderRadius:"15px",marginLeft:"25px"}}>
      <img style={{height:"65px",width:"250px",borderTopRightRadius:"15px",borderTopLeftRadius:"15px"}} src={ reactjs}/>
      <div style={{textAlign:"center"}}>
        <img src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? user} style={{width:"55px",borderRadius:"50%"}}/>
        <h3 style={{textAlign:"center"}}>{userData._document?.data?.value.mapValue.fields.username.stringValue}</h3>
      </div>
      <h4 style={{position:'relative',textAlign:"center"}}>{userData._document?.data?.value.mapValue.fields.designation.stringValue}</h4>
      <div style={{color:"#3C3B3B",borderTop:"1px solid #C6C3C3",paddingLeft:"10px"}}>
       <Link to= "/connect" style={{textDecoration:"none",color:"gray"}} state={{username:userData._document?.data?.value.mapValue.fields.username.stringValue,
        designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
        profile_image:userData._document?.data?.value.mapValue.fields.profile_image.stringValue}}><h5 style={{fontWeight:"100"}}>Connections</h5></Link> 
        <Link to='/invite' style={{textDecoration:"none",color:"gray"}} state={{username:userData._document?.data?.value.mapValue.fields.username.stringValue,
        designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
        profile_image:userData._document?.data?.value.mapValue.fields.profile_image.stringValue}}><h5 style={{fontWeight:"100"}}>Invitations</h5></Link>
      </div>
    </div>
  )
}

export default Sidebar
