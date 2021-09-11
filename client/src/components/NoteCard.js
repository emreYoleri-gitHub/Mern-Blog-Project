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
  CardMedia,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarIcon from "@material-ui/icons/Star";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../redux/actions/index";
import { useHistory } from "react-router-dom";
import UpdatePost from "../pages/UpdatePost";
import PostFullScreen from "./PostFullScreen";

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius : "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

const NoteCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { deletePost, updatePost } = bindActionCreators(postActions, dispatch);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handlePostModalOpen = () => setPostModalOpen(true);

  const handlePostModalClose = () => setPostModalOpen(false);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <UpdatePost handleClose={handleClose} post={post} />
    </div>
  );

  const maxLength = 300;

  return (
    <>
      <Card elevation={1}>
        <CardHeader
          action={
            <>
              <IconButton onClick={() => deletePost(post._id)}>
                <DeleteOutline />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <EditIcon />
              </IconButton>
              <IconButton>
                <StarIcon />
              </IconButton>
            </>
          }
          title={
            post?.title?.length < 15
              ? post?.title
              : `${post?.title.slice(0, 15)}...`
          }
          subheader={moment(post?.createdAt).fromNow()}
        />
        <CardContent>
          {post?.image.length ? (
            <CardMedia className={classes.media} image={post.image} />
          ) : null}
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ wordWrap: "break-word" }}
          >
            {post?.content?.length < maxLength ? (
              post?.content
            ) : (
              <>
                {post?.content.slice(0, maxLength)}

                <Typography align="center" component={"h1"} variant={"h3"}>
                  <IconButton onClick={handlePostModalOpen}>
                    <MoreHorizIcon />
                  </IconButton>
                </Typography>
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="textSecondary">
            Author: &nbsp;
          </Typography>

          <Typography variant="h5" color="secondary">
            {post?.creator}
          </Typography>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>

      <Modal open={postModalOpen} onClose={handlePostModalClose}>
        <PostFullScreen
          post={post}
          handleOpen={handleOpen}
          handlePostModalClose={handlePostModalClose}
          deletePost={deletePost}
        />
      </Modal>
    </>
  );
};

export default NoteCard;
