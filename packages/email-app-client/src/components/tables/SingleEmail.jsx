import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import formatDatetime from "./../../utils/formatDateTime";

function SingleEmail({ email, type, setEmailId, setModalOpen }) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const handleDeleteClick = (id) => {
    setModalOpen(true);
    setEmailId(id);
  };
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {type === "sent" ? email["receiver"] : email["sender"]}
        </TableCell>
        <TableCell>{email.subject}</TableCell>
        <TableCell>{formatDatetime(email.createDate)}</TableCell>
        <TableCell>
          <IconButton onClick={() => handleDeleteClick(email.messageId)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1} style={{ whiteSpace: "pre-wrap" }}>
              {email.text}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    textBox: { whiteSpace: "pre-wrap" },
  },
});

SingleEmail.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    subject: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
  }),
  type: PropTypes.string,
  deleteEmail: PropTypes.func,
};

export default SingleEmail;
