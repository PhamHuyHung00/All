import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Posts from "./Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./Home";
import ReactPosts from "./ReactPosts";
import Post01 from "./Post01";
function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/react-query" element={<Post01 />} />
            <Route path="/react" element={<ReactPosts />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
