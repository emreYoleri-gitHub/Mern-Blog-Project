import React, { useEffect, useState } from "react";
import { Paper, Grid, Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
 
  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
