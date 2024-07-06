import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getPostAPI, updatePostAPI } from "../../services/postAPI";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdatePost = () => {
  //!Get post id
  const { postId } = useParams();

  const { data } = useQuery({
    queryFn: () => getPostAPI(postId),
    queryKey: ["get-post"],
  });

  // console.log("data: ", data);

  const postMutation = useMutation({
    mutationFn: updatePostAPI,
    mutationKey: ["update-post"],
  });

  const formik = useFormik({
    initialValues: {
      title: data?.postFound?.title || "",
      description: data?.postFound?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      postMutation.mutate({
        ...values,
        postId,
      });
    },
  });

  //!Loading state
  const isLoading = postMutation.isPending;
  //!isError state
  const isError = postMutation.isError;
  //!Success state
  const isSuccess = postMutation.isSuccess;
  //!Error
  const error = postMutation.error;

  return (
    <div>
      <h1>You are updating the post {data?.postFound.title}</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && <p>Post updated successfully</p>}
      <form onSubmit={formik.handleSubmit}>
        {formik.touched.title && formik.errors.title && (
          <span>{formik.errors.title}</span>
        )}
        <input
          {...formik.getFieldProps("title")}
          type="text"
          name="title"
          placeholder="title"
        />
        <input
          {...formik.getFieldProps("description")}
          type="text"
          name="description"
          placeholder="description"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePost;
