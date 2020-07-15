import * as Yup from "yup";

export const userSchema = Yup.object({
  userId: Yup.string().required("user ID required"),
});
