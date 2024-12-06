import React, { useEffect, useRef, useState } from 'react';
import user from "../images/user.png";
import image from "../images/image.svg";
import steve from "../images/steve.jpg";
import video from "../images/video.svg";
import article from "../images/article.svg";
import { Card, CardContent, CardMedia, TextField, Typography, Button, Box } from '@mui/material';
import Post from './Post';
import { collection, doc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
import Filepost from './Filepost';

function Middle({ userData }) {
  const postRef = useRef(null);
  const filePostRef = useRef(null);

  const [posts, setPosts] = useState([]);

  const getPost = () => {
    setTimeout(async () => {
      const postDocument = doc(database, "Users", auth.currentUser?.uid);
      const postRef = collection(postDocument, "Posts");
      try {
        const data = await getDocs(postRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          likeCount: 0, // Initialize like count to 0
          showCommentInput: false, // Initialize comment input visibility
          comments: [] // Initialize empty comments
        }));
        setPosts(filteredData);
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  useEffect(() => {
    getPost();
  }, [posts]); // Keeping the infinite loop here

  // Handle like button click
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likeCount: post.likeCount + 1 } : post
      )
    );
  };

  // Toggle comment input visibility
  const handleCommentClick = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, showCommentInput: !post.showCommentInput } : post
      )
    );
  };

  // Handle comment submission
  const handleCommentSubmit = (id, comment) => {
    if (!comment.trim()) return; // Prevent empty comments
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment], showCommentInput: false }
          : post
      )
    );
  };

  return (
    <div>
      <Box sx={{ backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: 2 }}>
        <img 
          style={{ width: "55px", borderRadius: "50%" }} 
          src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? user} 
          alt="User" 
        />
        <TextField
          onClick={() => postRef.current?.click()}
          variant='outlined'
          label="Start a post"
          style={{ width: "450px", marginLeft: "15px" }}
          InputProps={{ sx: { borderRadius: 150 } }}
        />
        <br />
        <Post ref={postRef} />
        <Filepost ref={filePostRef} />
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          <img onClick={() => filePostRef.current?.click()} 
               style={{ width: "25px", cursor: 'pointer' }} 
               src={image} alt="Post Image" /> 
          <img onClick={() => filePostRef.current?.click()} 
               style={{ width: "25px", cursor: 'pointer' }} 
               src={video} alt="Post Video" /> 
          <img onClick={() => filePostRef.current?.click()} 
               style={{ width: "25px", cursor: 'pointer' }} 
               src={article} alt="Post Article" /> 
        </Box>
      </Box>

      <div style={{ paddingTop: "20px" }}>
        {posts.map((post) => (
          <Card sx={{ mt: "10px", boxShadow: 2 }} key={post.id}>
            <CardContent>
              <div style={{ display: "flex", alignItems: 'center' }}>
                <img src={post.profile_image ?? user} 
                     style={{ width: "50px", borderRadius: "50%" }} 
                     alt="Post User" />
                <div style={{ marginLeft: "10px" }}>
                  <Typography variant="h6">{post.username}</Typography>
                  <Typography sx={{ color: "#BFBFBF" }}>{post.designation}</Typography>
                </div>
              </div>
              <Typography variant="body1" sx={{ mt: 1 }}>{post.textPost}</Typography>
            </CardContent>
            {post.filePost && (
              <CardMedia
                component="img"
                height={250}
                image={post.filePost ?? steve}
                alt="Post Media"
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
              <Button variant="outlined" color="primary" onClick={() => handleLike(post.id)}>
                Like {post.likeCount}
              </Button>
              <Button variant="outlined" color="primary" onClick={() => handleCommentClick(post.id)}>
                Comment
              </Button>
              <Button variant="outlined" color="primary">Share</Button>
            </div>

            {post.showCommentInput && (
              <TextField
                label="Write a comment"
                fullWidth
                variant="outlined"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommentSubmit(post.id, e.target.value);
                    e.target.value = ''; // Clear the input field after submission
                  }
                }}
                sx={{ mt: 2 }}
              />
            )}

            <div style={{ marginLeft: '20px', marginTop: '10px' }}>
              {post.comments.map((comment, index) => (
                <Typography key={index} sx={{ mt: 1 }}>
                  {comment}
                </Typography>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Middle;
