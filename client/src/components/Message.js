import React from "react";
import Alert from '@material-ui/lab/Alert';
const Message = ({ children }) => {
  return <Alert severity="error">{children}</Alert>;
};

export default Message;
