import * as Yup from "yup";

export const messageSchema = Yup.object({
  subject: Yup.string().required("Subject can't be empty"),
  sender: Yup.string().required("Please fill in a valid sender id"),
  receiver: Yup.string().required("Please fill in a valid receiver id"),
  text: Yup.string().required("message body can't be empty"),
});
