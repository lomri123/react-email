import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../stores/Store";
import SubmitButton from "../buttons/SubmitButton";
import { FormInput } from "./FormInput";
import { messageSchema } from "../../validation/message";
import { messageFormValues } from "../../utils/messageFormValues";
import { addMessage } from "../../services/messagesApi";
import { TextBox } from "./TextBox";
import { addSingleMessage } from "./../../stores/actions/actions";

function MessageCompose() {
  const { dispatchMessageData, activeUser } = useContext(Context);
  const classes = useStyles();

  return (
    <Formik
      initialValues={messageFormValues}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, setStatus, resetForm }
      ) => {
        try {
          const { result } = await addMessage(values);
          if (result.sender === activeUser || result.receiver === activeUser) {
            const type = result.sender === activeUser ? "sent" : "received";
            const dispatchMessage = addSingleMessage(result, type);
            dispatchMessageData(dispatchMessage);
          }
          resetForm({ messageFormValues });
          setStatus({ success: true });
          toast.success("email sent!");
        } catch (error) {
          const myError = error?.response?.data?.error
            ? error.response.data.error
            : "error sending email";
          setStatus({ success: false });
          setSubmitting(false);
          setErrors({ submit: error.message });
          toast.error(myError);
        }
      }}
      validationSchema={messageSchema}
    >
      {(props) => {
        const { handleSubmit } = props;
        return (
          <form onSubmit={handleSubmit} className={classes.form}>
            <h1>Send Mail</h1>
            <FormInput name="subject" />
            <FormInput name="sender" />
            <FormInput name="receiver" />
            <TextBox name="text" label="message text" />
            <SubmitButton />
            <Persist name="newMessage" />
            <ToastContainer hideProgressBar={true} />
          </form>
        );
      }}
    </Formik>
  );
}

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: "450px",
    margin: "0 auto",
    padding: 20,
    backgroundColor: "white",
    borderRadius: "10px",
  },
}));

export default MessageCompose;
