import React, { useContext } from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { ToastContainer, toast } from "react-toastify";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../stores/Store";
import { getMessages } from "../../services/messagesApi";
import SubmitButton from "../buttons/SubmitButton";
import { FormInput } from "./FormInput";
import { userSchema } from "./../../validation/user";
import {
  addMessages,
  setUser,
  resetMessages,
} from "../../stores/actions/actions";

function MessagesFetch() {
  const { dispatchMessageData, dispatchUserData } = useContext(Context);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ userId: "" }}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, setStatus, resetForm }
      ) => {
        try {
          const { data, status } = await getMessages(values.userId);
          const { result } = data;
          let dispatchMessage;
          if (status === 204) {
            toast.warning("User has no messages");
            dispatchMessage = resetMessages();
          } else {
            toast.success("Messages downloaded");
            dispatchMessage = addMessages(result);
          }
          dispatchMessageData(dispatchMessage);
          const dispatchUser = setUser(values.userId);
          dispatchUserData(dispatchUser);
          resetForm({});
          setStatus({ success: true });
        } catch (error) {
          const myError = error?.response?.data?.error
            ? error.response.data.error
            : "error fetching messages";
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: error.message });
          toast.error(myError);
        }
      }}
      validationSchema={userSchema}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <>
            <form onSubmit={handleSubmit} className={classes.content}>
              <FormInput
                name="userId"
                label="fetch user emails"
                className={classes.input}
              />
              <div className={classes.button}>
                <SubmitButton />
              </div>
            </form>
            <Persist name="messagesFetch" />
            <ToastContainer position="top-center" />
          </>
        );
      }}
    </Formik>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
    paddingBottom: theme.spacing(3),
    width: "250px",
  },
  button: {
    marginTop: "23px",
    marginLeft: "10px",
  },
}));

export default MessagesFetch;
