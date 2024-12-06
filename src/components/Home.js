import React from 'react'
import Sidebar from './Sidebar'
import Middle from './Middle'
import Rightbar from './Rightbar'
import { Grid } from '@mui/material'

function Home({userData}) {
  return (
    <div style={{backgroundColor:"#F8F1F1",height:"100%",padding:"40px"}}>
        <Grid container spacing={4}>
            <Grid item xs={3}>  
                <Sidebar userData={userData}/>
            </Grid>
            <Grid item xs={6}>
                <Middle userData={userData}/>
            </Grid>
            <Grid item xs={3}>
                <Rightbar/>
            </Grid>

        </Grid>
    </div>
  )
}

export default Home
