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
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { postActions } from "../redux/actions/index";
import { useHistory } from "react-router-dom";
import UpdatePost from "../pages/UpdatePost";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NoteCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { deletePost, updatePost } = bindActionCreators(postActions, dispatch);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            </>
          }
          title={
            post?.title?.length < 10
              ? post?.title
              : `${post?.title.slice(0, 10)}...`
          }
          subheader={moment(post?.createdAt).fromNow()}
        />
        <CardContent>
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

                <Typography align="center" component={'h3'} variant={'span'}>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Typography>
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="h5">
            Author: &nbsp;
            {post?.creator}
          </Typography>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </>
  );
};

export default NoteCard;
