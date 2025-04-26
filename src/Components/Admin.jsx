import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // If you're using React Router for navigation

const Admin = () => {
  const navigate = useNavigate(); // Hook for navigation

  const dashboardItems = [
    {
      title: 'Total Books',
      value: 4,
      color: '#2196F3', // Blue
      icon: <span style={{ fontSize: '2em' }}><img src="iconbook.png"/></span>, // Example icon
      linkTo: '/static-pages', // Replace with your actual route
    },
    {
      title: 'Total Users',
      value: 15,
      color: 'green', // Orange
      icon: <span style={{ fontSize: '2em' }}><img src="iconuser.png"/></span>, // Example icon
      linkTo: '/slides', // Replace with your actual route
    },
    {
      title: 'Total reviews',
      value: 70,
      color: '#F44336', // Red
      icon: <span style={{ fontSize: '2em' }}><img src="iconreview.png"/></span>, // Example icon
      linkTo: '/team', // Replace with your actual route
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
    <div
         style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '35px', // Adjust the width as needed
          backgroundColor: 'rgb(40,20,5)', // Example blue color - use the color from your image
          height:"700px", // Make it span the full height of the parent
          marginTop:"75px",
          marginLeft:"8px"
        }}
      ></div>
      <div style={{marginLeft:"25px",marginTop:"5px"}}>
     <div style={{backgroundColor:"lightgray",marginTop:"18px",marginLeft:"25px"}}> <Typography variant='h4' sx={{marginTop:"0px",marginLeft:"20px",display:"inline-block",fontFamily:"inherit  "}}>DASHBOARD<Typography sx={{display:"inline-block",marginLeft:"15px",fontFamily:"-moz-initial"}}variant='h6'>Control panel</Typography></Typography></div>
    <Grid container spacing={5} sx={{ padding: 3  }}>
      {dashboardItems.map((item, index) => (
        
        <Grid item xs={12} sm={6} md={4} key={index}>
          
          <CardActionArea onClick={() => navigate(item.linkTo)} sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    '& .overlay': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                    '& .cardContent': {
                      transform: 'translateY(-30px)', // Adjust as needed
                    },
                  },
                }}>
            <Card sx={{ backgroundColor: item.color, color: 'white',width:"320px",height:"140px",borderRadius:"10px",}}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {item.value}
                </Typography>
                <Typography variant="subtitle1">
                  {item.title}
                </Typography>
                <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '2em', opacity: 0.7,marginTop:"10px", }}>
                  {item.icon}
                </div>
              </CardContent>
              <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      height: 'auto',
                      padding: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transform: 'translateY(100%)',
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      borderRadius: '0 0 10px 10px',
                    }}
                  >
                    <Typography variant="body2">Click to view</Typography>
                  </Box>
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
    </div>
    </div>
  );
};

export default Admin;