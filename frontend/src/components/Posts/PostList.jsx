import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deletePostAPI, listPostAPI } from "../../services/postAPI";
import { Link } from "react-router-dom";
import "./postCss.css";
import NoDataFound from "../Alerts/NoDataFound";
import AlertMessage from "../Alerts/AlertMessage";
import PostCategory from "../Category/PostCategory";
import { fetchCategoriesAPI } from "../../services/categoryAPI";
import { AiOutlineRadiusBottomleft } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const PostList = () => {
  //?Filtering
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  console.log("filters: ", filters);

  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["list-post", { ...filters, page }],
    queryFn: () =>
      listPostAPI({ ...filters, title: searchTerm, page, limit: 10 }),
  });

  //?Category Handlers
  const handleCategoryFilter = (categoryId) => {
    setFilters({
      ...filters,
      category: categoryId,
    });
    setPage(1);
    refetch();
  };

  const postMutation = useMutation({
    mutationFn: deletePostAPI,
    mutationKey: ["delete-post"],
  });
  const { data: categoriesData } = useQuery({
    queryFn: fetchCategoriesAPI,
    queryKey: ["list-category"],
  });

  //!Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //!Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ ...filters, title: searchTerm });
    setPage(1);
    refetch();
  };

  //!Clear filters
  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
    refetch();
  };

  //!Pagination handler
  const handlePageChange = (page) => {
    setPage(page);
    refetch();
  };
  // const deleteHandler = async (postId) => {
  //   postMutation
  //     .mutateAsync(postId)
  //     .then(() => {
  //       refetch();
  //     })
  //     .catch((e) => console.error(e));
  // };
  return (
    <section className="overflow-hidden">
      <div className="container px-24 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-16">
          Blog
        </h1>
        {/* featured post */}
        {/* <FeaturedPost post={featuredPost} /> */}
        <h2 className="text-4xl font-bold font-heading mb-10">
          Latest articles
        </h2>
        {/* Search field */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row items-center gap-2 mb-4"
        >
          <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow p-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 text-white bg-orange-500 hover:bg-blue-600 rounded-r-lg"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={clearFilters}
            className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
          >
            <MdClear className="h-4 w-4" />
            Clear Filters
          </button>
        </form>
        {/* Post category */}
        <PostCategory
          categories={categoriesData}
          onCategorySelect={handleCategoryFilter}
          onClearFilters={clearFilters}
        />
        {/* If no post found based on filtering */}
        {data?.posts?.length <= 0 && <NoDataFound text="No Post Found" />}
        {/* Alert messages */}
        {isLoading && <AlertMessage type="loading" message="Loading..." />}
        {isError && (
          <AlertMessage
            type="error"
            message="Something went wrong. Please try again later"
          />
        )}
        <div className="flex flex-wrap mb-32 -mx-4">
          {/* Posts */}
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3">
                  <div className="relative" style={{ height: 240 }}>
                    <div className="absolute top-0 left-0 z-10"></div>
                    <div className="absolute bottom-0 right-0 z-10"></div>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src={post?.image?.path}
                      alt={post?.createdAt}
                    />
                  </div>
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{
                        __html: post?.description,
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={4}
                        height={4}
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                      </svg>
                      <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                        {post?.category?.categoryName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center items-center my-8 space-x-4">
        {isPreviousButtonVisible && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}

        <span className="text-sm font-semibold">
          Page {page} of {postsData?.totalPages}
        </span>

        {isNextButtonVisible && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Next
          </button>
        )}
      </div> */}
      <div className="w-full flex justify-center items-center gap-3 mb-5">
        {page > 1 && (
          <button
            className="py-3 px-7 border-2 border-orange-500 rounded-lg font-medium  hover:bg-red-500 hover:border-white transition-colors duration-200 ease-linear"
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>
        )}
        <span>
          Page {page} of {data?.totalPages}
        </span>
        {page < data?.totalPages && (
          <button
            className="py-3 px-7 border-2 border-orange-500 rounded-lg font-medium hover:bg-red-500 hover:border-white transition-colors duration-200 ease-linear"
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default PostList;
