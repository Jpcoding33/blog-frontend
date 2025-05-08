import { Box, Typography } from "@mui/material";

export default function About() {
  const aboutTitleStyle = {
    width: "80%",
    fontFamily: "Varela, sans-serif",
    margin: "1rem 2rem 1.5rem",
    padding: "10px !important",
    textAlign: "center",
    borderTop: "1px solid #a7a4a4",
    borderBottom: "1px solid #a7a4a4",
  };

  const aboutItemStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  };

  return (
    <Box sx={aboutItemStyle}>
      <Typography sx={aboutTitleStyle}>ABOUT</Typography>
      <img
        style={{
          width: "80%",
          height: "auto",
          borderRadius: "10px",
        }}
        src="https://images.unsplash.com/photo-1657639039662-9edac2e6a40b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <Typography
        sx={{
          width: "80%",
          textAlign: "justify",
          padding: 1.5,
          color: "#666",
          fontsize: "18px",
          lineHeight: "25px",
          "&::first-letter": {
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: 600,
          },
          marginTop: 2,
        }}
      >
        Welcome to our blog platform — a space where ideas come to life, stories
        are shared, and communities grow. Whether you're here to read insightful
        articles, share your personal experiences, or discover fresh
        perspectives, this blog is built to connect people through meaningful
        content.
      </Typography>
      <Typography
        sx={{
          width: "80%",
          textAlign: "justify",
          padding: 1.5,
          color: "#666",
          fontsize: "18px",
          lineHeight: "25px",
        }}
      >
        Our goal is to provide a clean, user-friendly environment for writers
        and readers alike. With features like easy post creation, commenting,
        categorization, and tagging, we aim to make publishing and discovering
        content seamless and enjoyable.
      </Typography>
      <Typography
        sx={{
          width: "80%",
          textAlign: "justify",
          padding: 1.5,
          color: "#666",
          fontsize: "18px",
          lineHeight: "25px",
        }}
      >
        Start writing, start reading — and most importantly, start connecting.
      </Typography>
    </Box>
  );
}
