import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AddIconBox from "@material-ui/icons/AddBox";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";

function Sidebar({ mobileOpen, handleDrawerToggle, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [selectedItem, setSelectedItem] = useState("received");

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["received", "Sent"].map((text, index) => (
          <Link
            to={`/${text.toLowerCase()}`}
            className={classes.link}
            onClick={() => setSelectedItem(text)}
            key={text}
          >
            <ListItem button key={text} selected={selectedItem === text}>
              <ListItemIcon>
                {index % 2 !== 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Compose"].map((text) => (
          <Link
            to={`/${text.toLowerCase()}`}
            className={classes.link}
            onClick={() => setSelectedItem(text)}
            key={text}
          >
            <ListItem button key={text} selected={selectedItem === text}>
              <ListItemIcon>
                <AddIconBox />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool,
  window: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
};

export default Sidebar;
