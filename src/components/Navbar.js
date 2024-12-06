import { Button, Grid } from '@mui/material'
import React from 'react'
import wmlogo from "../images/wmlogo.png"
import search from "../images/search.png"
import home from "../images/home.png"
import message from "../images/message.png"
import social from "../images/social.png"
import user from "../images/user.png"
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'

function Navbar({userData}) {

   const navigate = useNavigate()

   const logout = async() => {
    try{
      await signOut(auth,googleProvider)
      navigate("/")
    }catch(err){
      console.error(err)
    }
   }



  console.log(userData)
  return (
    <div style={{padding:"10px",borderBottom:"1px solid #C6C3C3 "}}>
      <Grid container>
          <Grid item xs={5}>
            <img style={{width:"40px",borderRadius:"5px",marginLeft:"80px"}} src={wmlogo}/>
            <img style={{width:"25px",borderRadius:"5px",marginLeft:"20px"}} src={search}/>
          </Grid>
          <Grid item xs={6}>
            <img style={{width:"25px",marginLeft:"50px"}} src={home}/>
            <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
              currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue
            }}><img style={{width:"25px",marginLeft:"50px"}} src={social}/></Link>
            <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
              currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue
            }}><img style={{width:"25px",marginLeft:"50px"}} src={message}/></Link>
            
            <img style={{width:"25px",marginLeft:"50px",borderRadius:"50%"}} src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? user}/>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={logout} variant='contained' sx={{backgroundColor:"white",color:"black"}} size='small' >Logout</Button>
          </Grid>
      </Grid>
    </div>
  )
}

export default Navbar
