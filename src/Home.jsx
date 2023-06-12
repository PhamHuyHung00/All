import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ display: `flex`, gap: `20px` }}>
      <h1>Home Page</h1>
      <Link to="/">Home</Link>
      <Link to="/react-query"> React Query</Link>
      <Link to="/react"> React api</Link>
    </div>
  );
};

export default Home;
