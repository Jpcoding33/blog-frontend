import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axiosInstance from "../../api/axiosInstance";
import { uploadImageToCloudinary } from "../../cloudinaryAPI/cloudinary";
import { toast } from "react-toastify";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [file, setFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      userId: user._id ? user._id : 0,
      username: user.username ? user.username : "",
      email: user.email ? user.email : "",
      about: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string().required("Email is required"),
    }),
    onSubmit(values) {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: values.userId,
      username: values.username,
      email: values.email,
      about: values.about,
    };
    if (values.image) {
      try {
        const response = await uploadImageToCloudinary(file);
        if (response) {
          updatedUser.profilePic = {
            url: response.url,
            assetId: response.public_id,
          };
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data ||
          "Profile picture update failed!";
        toast.error(errorMessage);
      }
    }
    try {
      const res = await axiosInstance.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      toast.success("Profile updated successfully!");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data ||
        "Profile update failed!";
      toast.error(errorMessage);
    }
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: [2, 5],
      }}
    >
      <Paper
        sx={{
          padding: [2, 3],
          borderRadius: 4,
          paddingBottom: 5,
          background: "#fff6e8",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "tomato", fontSize: ["1.2rem", "2rem"] }}>
            Update Your Account
          </Typography>
          <Button
            sx={{
              textTransform: "none",
              background: "tomato",
              color: "white",
              borderRadius: 5,
              padding: ["0.5rem", "0.5rem", "0.5rem 1rem"],
              "&:hover": { background: "tomato" },
              display: ["none", "none", "flex"],
            }}
          >
            <DeleteForeverIcon sx={{ marginRight: [0, 0, 0.5] }} />
            <Typography
              sx={{ display: ["none", "none", "flex"], fontSize: 14 }}
            >
              Delete Your Account
            </Typography>
          </Button>
          <IconButton
            sx={{
              background: "tomato",
              display: ["flex", "flex", "none"],
              color: "white",
            }}
            size="small"
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
        <form
          sx={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ position: "relative", marginTop: 4 }}>
              <Avatar
                src={file ? URL.createObjectURL(file) : user.profilePic?.url}
                sx={{
                  height: 200,
                  width: 200,
                  borderRadius: 10,
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: -10,
                  right: -10,
                  background: "white",
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                <FormLabel
                  htmlFor="fileInput"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <AddPhotoAlternateIcon
                    sx={{ color: "tomato", fontSize: 25 }}
                  />
                </FormLabel>
                <input
                  name="file"
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                />
              </Box>
            </Box>
          </Box>
          <TextField
            name="username"
            type="text"
            label="Username"
            size="small"
            fullWidth={true}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && !!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ margin: "2rem 0 1rem" }}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            size="small"
            fullWidth={true}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ margin: "1rem 0" }}
          />
          <TextField
            name="about"
            type="textarea"
            label="About"
            size="small"
            multiline
            rows={5}
            fullWidth={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.about && !!formik.errors.about}
            helperText={formik.touched.about && formik.errors.about}
            sx={{ margin: "1rem 0" }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "teal",
                width: "fit-content",
                "&:hover": {
                  background: "teal",
                },
                marginTop: 1,
              }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
}
