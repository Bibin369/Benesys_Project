import "../css/Login/loginDashboard.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Slide } from "@mui/material";
import {
  Box,
  Grid2 as Grid,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material"; // Import Snackbar and Alert
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store";
import { users } from "../mockData";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../src/assets/images/benesys-logo.jpg";
import sectionlogo from "../../src/assets/images/Mask Group 71.jpg";
import axios from "axios";
import { AES } from "crypto-js";

const CustomTextField = styled(TextField)(({ hasData }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: hasData ? "#637381" : "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#00796b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#637381",
    },
  },
}));

const LoginDashboard = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const Transition = (props) => {
    return <Slide {...props} direction={props.in ? "right" : "right"} />;
  };
  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const Api = "https://apidev-hunterfinancial.oneteamus.com/api/1.0/Token";

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
    // .matches(
    //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    //   "Must be a valid Gmail address"
    // ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/\d/, "Must contain a number")
      .matches(/[@$!%*?&]/, "Must contain a special character"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(Api, {
          username: values.email,
          password: values.password,
        });
        const { token, role } = response.data;

        const secretKey = "bibin_2001";

        const encryptedData = AES.encrypt(token, secretKey).toString();

        localStorage.setItem("token", encryptedData);
        console.log(token);

        dispatch(login({ role }));
        navigate("/UserDashboard");
      } catch (error) {
        console.error("Login error:", error);
        setSnackbarMessage(
          error.response?.data?.message || "Invalid credentials"
        );
        setSnackbarOpen(true);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      xs={12}
      classname="Login-Main"
      sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <Grid item xs={12} classname="Login-Header" sx={{ padding: "20px" }}>
        <img src={logo} alt="Benesys Logo" />
      </Grid>
      <Grid
        container
        xs={12}
        classname="Login-Components-wrapper"
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          "flex-wrap": "nowrap",
        }}
      >
        {!isMobile && (
          <Grid
            container
            xs={6}
            classname="Side-1"
            sx={{ width: "100vw", height: "100vh" }}
          >
            <img
              src={sectionlogo}
              alt="Section Logo"
              className="section-logo"
              style={{ right: "10px", top: "45px", width: "100%" }}
            />
          </Grid>
        )}
        <Grid
          container
          xs={6}
          classname="Side-2"
          sx={{
            width: "100vw",
            height: "100vh",
            display: "Flex",
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <Box className="form-container">
            <h1 className="form-top-text1">Sign in to Admin</h1>
            <p className="form-top-text2">
              Enter the email address and password
            </p>
            <form onSubmit={formik.handleSubmit}>
              <CustomTextField
                className="textfield"
                label="Email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasData={!!formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 1 }}
              />
              <CustomTextField
                className="textfield"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                hasData={!!formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box className="options-container">
                <label className="checkbox-text">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="/forgot-password">Forgot Password?</a>
              </Box>
              <button type="submit" className="button-1">
                Login
              </button>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Transition}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "#f57c00" } }} // Custom background color
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%", fontWeight: "bold", borderRadius: "8px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LoginDashboard;
