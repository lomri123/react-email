import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../stores/Store";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getUsers, getMessages } from "../../services/messagesApi";
import {
  addMessages,
  setUser,
  resetMessages,
} from "../../stores/actions/actions";

export default function AsyncSearch() {
  const { dispatchMessageData, dispatchActiveUser } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [userInput, setUserInput] = useState("");

  const handleClearClick = () => {
    const dispatchMessage = resetMessages();
    dispatchMessageData(dispatchMessage);
    const dispatchUser = setUser("");
    dispatchActiveUser(dispatchUser);
  };

  const handleSearchSelect = async (userId) => {
    if (userId === "" || userId === null) {
      handleClearClick();
    } else {
      try {
        const { data, status } = await getMessages(userId);
        const { result } = data;
        let dispatchMessage;
        if (status === 204) {
          toast.warning("User has no emails");
          dispatchMessage = resetMessages();
        } else {
          toast.success("emails downloaded");
          dispatchMessage = addMessages(result);
        }
        dispatchMessageData(dispatchMessage);
        const dispatchUser = setUser(userId);
        dispatchActiveUser(dispatchUser);
      } catch (error) {
        const myError = error?.response?.data?.error
          ? error.response.data.error
          : "error fetching emails";
        toast.error(myError);
      }
    }
  };

  useEffect(() => {
    let active = true;

    if (userInput === "") {
      setOptions([]);
      return;
    }

    (async () => {
      const { data: users } = await getUsers(userInput);

      if (active) {
        setOptions(users);
      }
    })();

    return () => {
      active = false;
    };
  }, [userInput]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        style={{ width: 250, marginBottom: "15px" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        onChange={(event, newValue) => {
          handleSearchSelect(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setUserInput(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search user"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <ToastContainer hideProgressBar={true} />
    </>
  );
}
