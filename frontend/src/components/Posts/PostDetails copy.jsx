import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getPostAPI } from "../../services/postAPI";

const PostDetails = () => {
  //!Get post id
  const { postId } = useParams();

  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryFn: () => getPostAPI(postId),
    queryKey: ["get-post"],
  });

  console.log(data);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {isSuccess && <p>Post created successfully</p>}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Details;
