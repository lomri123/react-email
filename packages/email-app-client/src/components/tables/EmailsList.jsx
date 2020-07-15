import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SingleEmail from "./SingleEmail";
import MessagesFetch from "./../forms/MessagesFetch";
import { deleteMessage } from "../../services/messagesApi";
import AlertDialog from "./../popups/AlertDialog";
import { deleteSingleMessage } from "../../stores/actions/actions";

function EmailsList({ messageData, type, dispatchMessageData }) {
  const emails = messageData[type] || [];
  const [open, setOpen] = useState(false);
  const [emailId, setEmailId] = useState("");

  const handleClose = (action) => {
    if (action === "delete") {
      deleteEmail();
    }
    setOpen(false);
  };

  const deleteEmail = async () => {
    try {
      await deleteMessage(emailId, type);
      const dispatchMessage = deleteSingleMessage(emailId, type);
      dispatchMessageData(dispatchMessage);
    } catch (error) {
      toast.error("couldn't delete message");
    }
  };
  return (
    <>
      <MessagesFetch />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell size="small" />
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell size="small">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <SingleEmail
                key={email.messageId}
                email={email}
                type={type}
                setEmailId={setEmailId}
                setModalOpen={setOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AlertDialog open={open} setOpen={setOpen} handleClose={handleClose} />
      <ToastContainer hideProgressBar={true} />
    </>
  );
}

EmailsList.propTypes = {
  type: PropTypes.string,
  dispatchMessageData: PropTypes.func,
};

export default EmailsList;
