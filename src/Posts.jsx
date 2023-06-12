import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useQueries,
  useQuery,
  userQuery,
} from "@tanstack/react-query";
const Posts = () => {
  const fetchApi = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${pageParam}`
    );
    return response.data;
  };

  // const fetchApi1 = async () => {
  //   const response = await axios.get(
  //     "http://jsonplaceholder.typicode.com/users"
  //   );
  //   return response.data;
  // };

  // const { isError, isLoading, data } = useQuery(["posts"], fetchApi, {
  // retry: 1, //số lần gọi lại api khi bị lỗi
  // retryDelay: 1000, // thời gian cách mỗi api gọi lại
  // cacheTime: 10000, // sau 10s cache sẽ tự động xoá. mặc định là 5p.
  // staleTime: 5000, // khi mà là infinity thì data luôn luôn là mới.|| sau 5s data sẽ là cũ => khi người dùng rời khỏi ứng dụng mà data là cũ => TanStack Query sẽ tự động yêu cầu dữ liệu mới.
  //  });

  //   const results = useQueries({
  //     queries: [
  //       { queryKey: ["post", 1], queryFn: fetchApi },
  //       { queryKey: ["post", 2], queryFn: fetchApi1 },
  //     ],
  //   });
  //   console.log(results);
  // const [userId, setUserId] = useState("");

  // const { isError, isLoading, data } = useQuery(["posts", userId], fetchApi, {
  //   enabled: !!userId, // nếu userId !== undefined && userId !== null && userId !== false && userId !== 0 && userId !== '' thì mới call api fetchApi
  // });
  const [page, setPage] = useState(1);
  // const { isError, isLoading, data, isPreviousData } = useQuery(
  //   ["posts", page],
  //   fetchApi,
  //   {
  //     keepPreviousData: true, //mất data cũ khi có data mới
  //   }
  // );
  const {
    isError,
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(["posts", page], fetchApi, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 100) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return <h1>...Loading</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  console.log("data: ", data);
  return (
    <div>
      {data?.pages.map((page) => (
        <h1 key={page.id}>{page.title}</h1>
      ))}
      <button onClick={(e) => fetchNextPage()}>LoadMore</button>
      {/* <input
        value={userId}
        placeholder="user id"
        onChange={(e) => setUserId(e.target.value)}
      /> */}
      {/* <button
        onClick={(e) => setPage((prev) => prev - 1)}
        disabled={page === 0 || isPreviousData}
      >
        Previous
      </button>
      <button
        onClick={(e) => setPage((prev) => prev + 1)}
        disabled={page === 100 || isPreviousData}
      >
        Next
      </button>

      {data?.title} */}
      {/* {data?.map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))} */}
    </div>
  );
};

export default Posts;
