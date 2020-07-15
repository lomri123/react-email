import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "../components/bars/Sidebar";
import Topbar from "../components/bars/Topbar";
import EmailContent from "./EmailContent";

function EmailPage() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar handleDrawerToggle={handleDrawerToggle} />
      <EmailContent />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

export default EmailPage;
