import React from "react";
import {
  CardHeader,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const NoteCard = ({ note , deleteHandler }) => {
  return (
    <>
      <Card elevation={1} >
        <CardHeader
          action={
            <IconButton onClick = {()=>deleteHandler(note.id)}>
              <DeleteOutline />
            </IconButton>
          }
          title = {note.title}
          subheader = {note.currentCategory}
        />
        <CardContent>
            <Typography color="textSecondary" variant="body2">
                {note.details}
            </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
