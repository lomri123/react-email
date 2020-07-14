import React, { useContext } from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../../stores/Store";
import { getMessages } from "../../services/messagesApi";
import SubmitButton from "../buttons/SubmitButton";
import { FormInput } from "./FormInput";
import { userSchema } from "./../../validation/user";
import { addMessages, setUser } from "../../stores/actions/actions";

function MessagesFetch() {
  const { dispatchMessageData, dispatchUserData } = useContext(Context);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ userId: "" }}
      onSubmit={async (values) => {
        try {
          const { result } = await getMessages(values.userId);
          console.log(result);
          const dispatchMessage = addMessages(result);
          dispatchMessageData(dispatchMessage);
          const dispatchUser = setUser(values.userId);
          dispatchUserData(dispatchUser);
        } catch (error) {
          console.log("error", error);
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
    width: "300px",
  },
  button: {
    marginTop: "23px",
    marginLeft: "10px",
  },
}));

export default MessagesFetch;
