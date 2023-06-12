import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Header from "./Header";

const Post01 = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [idPost, setIdPost] = useState();

  const fetchApi = async () => {
    const response = await axios.get(`http://localhost:3001/posts`);
    return response.data;
  };

  const fetchCreateApi = async () => {
    const response = await axios.post(`http://localhost:3001/posts`, {
      title: "json-server04",
      author: "typicode04",
    });
    return response.data;
  };

  const fetchDeleteApi = async () => {
    const response = await axios.delete(
      `http://localhost:3001/posts/${idPost}`
    );
    return response.data;
  };

  const query = useQuery(["post"], fetchApi, {
    refetchOnWindowFocus: false,
  });
  const queryCreate = useQuery(["create-post"], fetchCreateApi, {
    enabled: !!isCreate,
  });
  const queryDelete = useQuery(["delete-post"], fetchDeleteApi, {
    enabled: !!idPost,
  });

  const mutationsCreatePost = useMutation(["mutation-post"], (newPost) => {
    return axios.post(`http://localhost:3001/posts`, newPost);
  });

  const handleCreatePost = () => {
    setIsCreate(true);
  };
  const handleDeletePost = (idPost) => {
    console.log("Post Id: ", idPost);
    setIdPost(idPost);
  };

  const handleCreatePostMutation = () => {
    mutationsCreatePost.mutate(
      {
        title: "Mujson-server000",
        author: "Mutypicode000",
      },
      {
        onSuccess: () => {
          console.log("Success");
        },
        onError: () => {
          console.log("Error");
        },
        onSettled: () => {
          console.log("Settled");
          query.refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (
      (!!isCreate && !queryCreate.isFetching) ||
      (!!idPost && !queryDelete.isFetching)
    ) {
      setIsCreate(false);
      setIdPost(undefined);
      query.refetch();
    }
  }, [queryCreate.isFetching, queryDelete.isFetching]);

  if (query.isLoading) {
    return <h1>...loading</h1>;
  }

  if (query.isError) {
    return <h1>...Error</h1>;
  }

  return (
    <div>
      React Query
      <Header />
      {query.data?.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>
            {item.title} - {item.id}
          </h1>
          <span onClick={() => handleDeletePost(item.id)}>X</span>
        </div>
      ))}
      <button onClick={handleCreatePost} disabled={!!queryCreate.isFetching}>
        Create Post
      </button>
      <button onClick={handleCreatePostMutation}>Create post mutation</button>
    </div>
  );
};

export default Post01;
