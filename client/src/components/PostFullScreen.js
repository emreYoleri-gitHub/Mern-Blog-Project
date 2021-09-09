import React, { useState } from "react";
import moment from "moment";
import {
  CardHeader,
  Card,
  CardContent,
  IconButton,
  Typography,
  CardActions,
  Modal,
  makeStyles,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";
import { getModalStyle, useStyles } from "./NoteCard";

const PostFullScreen = ({
  post,
  handleOpen,
  handlePostModalClose,
  deletePost,
}) => {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  return (
    <div style={modalStyle} className={classes.paper}>
      <Typography align="center" component={"h3"} variant={"span"}>
        <IconButton onClick={() => deletePost(post._id)}>
          <DeleteOutline />
        </IconButton>
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
        <IconButton>
          <CloseIcon onClick={handlePostModalClose} />
        </IconButton>
      </Typography>

      <Card elevation={2}>
        <CardHeader
          style={{
            wordWrap: "break-word",
          }}
          title={post?.title}
          subheader={moment(post?.createdAt).fromNow()}
        />

        <CardContent>
          <Typography
            color="textSecondary"
            variant="body2"
            style={{
              wordWrap: "break-word",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            {post?.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h5" align="center" style={{ width: "100%" }}>
            Author: &nbsp;
            {post?.creator}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default PostFullScreen;
