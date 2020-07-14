import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Context } from "./../stores/Store";
import { makeStyles } from "@material-ui/core/styles";
import EmailsList from "../components/tables/EmailsList";
import MessageCompose from "../components/forms/MessageCompose";

function EmailContent() {
  const { messageData, dispatchMessageData } = useContext(Context);
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/received">
          <EmailsList type="received" messageData={messageData} />
        </Route>
        <Route path="/sent">
          <EmailsList type="sent" messageData={messageData} />
        </Route>
        <Route path="/compose">
          <MessageCompose dispatchMessageData={dispatchMessageData} />
        </Route>
        <Redirect from="/" to="received" />
      </Switch>
    </main>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default EmailContent;
