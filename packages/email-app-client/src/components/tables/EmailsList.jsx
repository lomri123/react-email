import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SingleEmail from "./SingleEmail";
import MessagesFetch from "./../forms/MessagesFetch";

function EmailsList({ messageData, type }) {
  const emails = messageData[type] || [];
  console.log(messageData);

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
              <TableCell>Date</TableCell>
              <TableCell size="small">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emails.map((email) => (
              <SingleEmail key={email.messageId} email={email} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EmailsList;
