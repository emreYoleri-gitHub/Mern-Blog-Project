import React, { useEffect, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import { useSelector } from "react-redux";

const Notes = () => {
  
  const { posts } = useSelector((state) => state.posts);

  return (
    <Container>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={6} lg={4}>
            <NoteCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
