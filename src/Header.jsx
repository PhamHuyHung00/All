import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const Header = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueriesData(["post"]);
  const data1 = queryClient.getQueryCache();
  console.log(data1);
  console.log("Data: ", data);
  return <div>Header</div>;
};

export default Header;
