import * as yup from "yup";
export const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  releaseDate: yup.date(),
  movieUrl: yup
    .string()
    .url("Movie URL must be a valid URL")
    .required("Movie URL is required"),
  overview: yup.string().required("Overview is required"),
  runtime: yup
    .number()
    .positive()
    .integer()
    .min(10)
    .max(300)
    .required("Runtime is required"),
  genres: yup.array().min(1).required("Genre is required")
});
