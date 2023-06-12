import React, { useState, useEffect } from "react";
import axios from "axios";

const ReactPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchApi = async () => {
    const response = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (!posts.length) {
    return <h1>...Loading</h1>;
  }
  return (
    <div>
      ReactPosts
      {posts?.map((post) => (
        <h1 key={post.id}> {post.title}</h1>
      ))}
    </div>
  );
};

export default ReactPosts;
