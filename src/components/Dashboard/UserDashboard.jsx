import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/Home/DashBoard.css";
import logo from "../../../src/assets/images/benesys-logo.jpg";
import profile from "../../../src/assets/images/Group100.png";
import menu1 from "../../../src/assets/images/Group 157.png";
import menu2 from "../../../src/assets/images/Group 96.png";
import menu3 from "../../../src/assets/images/Group 99.png";
import menu4 from "../../../src/assets/images/Group 98.png";
import card1 from "../../../src/assets/images/Group 287.png";
import card2 from "../../../src/assets/images/Group 299.png";
import card3 from "../../../src/assets/images/Group 288.png";
import img5 from "../../../src/assets/images/Component 179.png";
import img6 from "../../../src/assets/images/Group 442.png";
import { employees } from "../../mockData";


const UserDashboard = () => {
  const role = useSelector((state) => state.auth.role);
  const [isReimbursementOpen, setIsReimbursementOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(employees);

  const toggleReimbursementDropdown = () => {
    setIsReimbursementOpen(!isReimbursementOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setOpenLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    navigate("/");
  };

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleToggleStanding = (index) => {
    setRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, standing: row.standing === 1 ? 0 : 1 } : row
      )
    );
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <Grid container className="User-interface-container">
      <Grid item xs={12} className="top-header">
        <Box>
          <img src={logo} alt="Benesys Logo" className="top-header-image" />
        </Box>
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Profile" src={profile} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>
                {role === 1 ? "Admin" : role === 2 ? "User" : "Guest"} Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Grid>
      <Grid item xs={2} className="sidebar-container">
        <Grid item xs={12} className="sidebar">
          <Box className="sidebar-top-1">
            <img
              src={profile}
              alt="Benesys Profile"
              className="top-header-profile"
            />
          </Box>
          <Box className="sidebar-top-1">
            <h1 className="sidebar-name">Benesys</h1>
            <h1 className="role">
              {role === 1 ? "Admin" : role === 2 ? "User" : "Guest"}
            </h1>
          </Box>
        </Grid>
        <Grid item xs={9} className="sidebar-menus">
          <Box className="sidebar-menu-1">
            <img src={menu1} alt="Dashboard" className="sidebar-menu-image1" />
            <h1 className="sidebar-menu-text-1">Dashboard</h1>
          </Box>
          <Box className="sidebar-menu-1">
            <img src={menu2} alt="Courses" className="sidebar-menu-image1" />
            <h1 className="sidebar-menu-text-1">Courses</h1>
          </Box>
          <Box className="sidebar-menu-1">
            <img src={menu3} alt="Employee" className="sidebar-menu-image1" />
            <h1 className="sidebar-menu-text-1">Employee</h1>
          </Box>
          <Box className="sidebar-menu-1" onClick={toggleReimbursementDropdown}>
            <img
              src={menu4}
              alt="Reimbursement"
              className="sidebar-menu-image1"
            />
            <h1 className="sidebar-menu-text-1">Reimbursement</h1>
            <ExpandMoreIcon className="dropdown-icon" />
          </Box>
          {isReimbursementOpen && (
            <Box className="dropdown-menu">
              <ul>
                <li>Reimbursement Process…</li>
                <li>Reimbursement History</li>
                <li>Apprentice Rate Card</li>
              </ul>
            </Box>
          )}
        </Grid>
      </Grid>
      <Grid item xs={10} className="Main-content-top">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box className="Top-card-1">
              <Box className="Top-card-1-text">
                <h1 className="card-text-1">Total Course</h1>
                <h1 className="card-text-2">36</h1>
                <h1 className="card-text-3">
                  426 Employees joined in 33 courses
                </h1>
              </Box>
              <Box className="Top-card-1-img">
                <img
                  src={card1}
                  alt="Courses"
                  className="sidebar-menu-image1"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className="Top-card-1">
              <Box className="Top-card-1-text">
                <h1 className="card-text-1">Total Employers</h1>
                <h1 className="card-text-2">86</h1>
              </Box>
              <Box className="Top-card-1-img">
                <img
                  src={card2}
                  alt="Employers"
                  className="sidebar-menu-image1"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box className="Top-card-1">
              <Box className="Top-card-1-text">
                <h1 className="card-text-1">Total Employees</h1>
                <h1 className="card-text-2">638</h1>
              </Box>
              <Box className="Top-card-1-img">
                <img
                  src={card3}
                  alt="Employees"
                  className="sidebar-menu-image1"
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box className="middle-options">
              <img
                src={img5}
                alt="Employers Banner"
                className="middle-menu-image1"
              />
              <h1 className="middle-menu-text">Employers</h1>
            </Box>
          </Grid>
          <Grid item xs={12} className="table-header-wrapper">
            <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
              <h1 className="middle-table-top-text">Employers</h1>
            </Grid>
            <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
              <SearchIcon className="sidebar-menu-icon" />
              <input
                type="text"
                id="search-employer"
                placeholder="Search by employer name"
                className="search-box"
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <img
                src={img6}
                alt="Employers Banner"
                className="search-filter-img"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className="table-headers-middle">
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {[
                      "Employer Name",
                      "Phone Number",
                      "Email Address",
                      "Employer ID",
                      "Standing",
                    ].map((heading) => (
                      <TableCell
                        key={heading}
                        align="left"
                        sx={{
                          fontWeight: "bold",
                          color: "#919EAB",
                          fontSize: "13px",
                        }}
                      >
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{row.empName}</TableCell>
                      <TableCell align="left">{row.phno}</TableCell>
                      <TableCell align="left">{row.emailId}</TableCell>
                      <TableCell align="left">{row.employerId}</TableCell>
                      <TableCell align="left">
                        <Switch
                          checked={row.standing === 1}
                          onChange={() => handleToggleStanding(index)}
                          color={row.standing === 1 ? "success" : "warning"}
                          {...label}
                        />
                        <span
                          style={{
                            fontWeight: "bold",
                            fontFamily: "PublicSans-Bold, sans-serif",
                            color: "#637381",
                            fontSize: "12px",
                          }}
                        >
                          {row.standing === 1 ? "Eligible" : "On Hold"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      {openLogoutModal && <div className="modal-overlay" />}
      <Dialog
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
        classes={{ paper: "dialog-container" }}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from this device?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserDashboard;
