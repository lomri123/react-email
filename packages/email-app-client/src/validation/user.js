import * as Yup from "yup";

export const userSchema = Yup.object({
  userId: Yup.string().required("userId can't be empty"),
});
