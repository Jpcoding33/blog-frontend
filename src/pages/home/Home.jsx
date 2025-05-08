import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import axiosInstance from "../../api/axiosInstance";
import {
  Box,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import About from "../../components/sidebar/About";
import { BeatLoader } from "react-spinners";

export default function Home() {
  const { search } = useLocation();
  const postRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const pagination = {
        page,
        limit: pageLimit,
      };

      const res = await axiosInstance.get("/posts" + search, {
        params: pagination,
      });

      setPosts(res.data.docs);
      setTotalPages(Number(Math.ceil(res.data.totalDocs / pageLimit)));
      setIsLoading(false);
    };
    fetchPosts();
  }, [search, page]);

  const handleChange = (event, value) => {
    setPage(value);

    if (postRef.current) {
      const offset = 70;
      const elementTop =
        postRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  const searchbarStyle = {
    margin: 2,
    padding: 0.5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    height: "35px",
    width: ["85%", "85%", "90%"],
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  };

  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Grid
          md={4}
          item
          sx={{
            width: "100%",
          }}
        >
          <Sidebar onSetPage={handleChange} />
        </Grid>
        <Grid
          ref={postRef}
          xs={12}
          md={8}
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper sx={searchbarStyle}>
            <IconButton
              type="button"
              sx={{ padding: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Blogs..."
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
          {isLoading ? (
            <Box
              sx={{
                marginY: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BeatLoader color="tomato" />
              <Typography sx={{ marginTop: 2 }}>Loading Posts</Typography>
            </Box>
          ) : (
            <Posts posts={posts} />
          )}
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{ marginY: 2 }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: ["flex", "flex", "none"] }}>
        <About />
      </Box>
    </React.Fragment>
  );
}
