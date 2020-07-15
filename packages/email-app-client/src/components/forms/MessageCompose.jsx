import React from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { ToastContainer, toast } from "react-toastify";
import SubmitButton from "../buttons/SubmitButton";
import { FormInput } from "./FormInput";
import { messageSchema } from "../../validation/message";
import { messageFormValues } from "../../utils/messageFormValues";
import { addMessage } from "../../services/messagesApi";
import { TextBox } from "./TextBox";

function MessageCompose() {
  return (
    <Formik
      initialValues={messageFormValues}
      onSubmit={async (
        values,
        { setSubmitting, setErrors, setStatus, resetForm }
      ) => {
        try {
          const { result } = await addMessage(values);
          resetForm({});
          setStatus({ success: true });
          toast.success("Message sent!");
        } catch (error) {
          const myError = error?.response?.data?.error
            ? error.response.data.error
            : "error sending message";
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
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: 20,
                padding: 20,
              }}
            >
              <form style={{ width: "50%" }}>
                <h1>Send Mail</h1>
                <FormInput name="subject" />
                <FormInput name="sender" />
                <FormInput name="receiver" />
                <TextBox name="text" />
                <SubmitButton />
              </form>
            </div>
            <Persist name="newMessage" />
            <ToastContainer position="top-center" />
          </form>
        );
      }}
    </Formik>
  );
}

export default MessageCompose;
