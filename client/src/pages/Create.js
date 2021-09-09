import React, { useState } from "react";
import ReactFileBase64 from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../redux/actions";
import { bindActionCreators } from "redux";
import {
  Typography,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import { RadioGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
const Create = () => {
  const classes = useStyles();
  const history = useHistory();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    creator: "",
    image: "",
    category: "",
  });

  const dispatch = useDispatch();

  const { createPost } = bindActionCreators(postActions, dispatch);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(postData); // will delete
    await createPost(postData);
    setPostData({
      title: "",
      content: "",
      creator: "",
      image: "",
      category: "",
    });
  };

  return (
    <Container>
      <Typography
        variant="h4"
        color="textSecondary"
        display="block"
        gutterBottom
        
      >
        Create a New Post
      </Typography>
      <form autoComplete="off" onSubmit={submitHandler}>
        <TextField
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          className={classes.field}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          className={classes.field}
          label="Author"
          variant="outlined"
          color="secondary"
          fullWidth
          required

        />
        <TextField
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
          className={classes.field}
          label="Content"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
        />
        <ReactFileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
        />
        <FormControl className={classes.field}>
          <FormLabel>Post Category</FormLabel>
          <RadioGroup
            value={postData.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <div>
              <FormControlLabel
                value="Fashion"
                control={<Radio />}
                label="Fashion"
              />
              <FormControlLabel value="Food" control={<Radio />} label="Food" />
              <FormControlLabel
                value="Travel"
                control={<Radio />}
                label="Travel"
              />
            </div>
            <div>
              <FormControlLabel
                value="Music"
                control={<Radio />}
                label="Music"
              />
              <FormControlLabel
                value="Fitness"
                control={<Radio />}
                label="Fitness"
              />
              <FormControlLabel
                value="Sports"
                control={<Radio />}
                label="Sports"
              />
            </div>
            <div>
              <FormControlLabel
                value="Finance"
                control={<Radio />}
                label="Finance"
              />
              <FormControlLabel
                value="Political"
                control={<Radio />}
                label="Political"
              />
              <FormControlLabel
                value="Education"
                control={<Radio />}
                label="Education"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Create
        </Button>
      </form>
    </Container>
  );
};

export default Create;
