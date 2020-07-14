import React from "react";
import { Formik } from "formik";
import { Persist } from "formik-persist";
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
      onSubmit={async (values) => {
        try {
          const { result } = await addMessage(values);
          console.log("result", result);
        } catch (error) {
          console.log("error", error);
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
          </form>
        );
      }}
    </Formik>
  );
}

export default MessageCompose;
