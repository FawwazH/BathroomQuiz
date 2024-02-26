import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Email from "@mui/icons-material/Email";
import Call from "@mui/icons-material/Call";
import { useSelector, useDispatch } from "react-redux";
import {
  setFullName,
  setEmail,
  setContactNumber,
  setValid,
  setInvalid,
} from "../../store/formSlice";

const BasicInformation = () => {
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.formValid.fullName);
  const emailAddress = useSelector((state) => state.formValid.emailAddress);
  const contactNumber = useSelector((state) => state.formValid.contactNumber);
  const [fullNameError, setFullNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [contactNumberError, setContactNumberError] = React.useState(false);

  React.useEffect(() => {
    updateFormValidity();
  }, [fullNameError, emailError, contactNumberError]);

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    dispatch(setFullName(value));
    setFullNameError(value.trim().length < 4);
    // setFullName(value);
    // setFullNameError(value.trim().length < 4);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    dispatch(setEmail(value));
    setEmailError(!isValidEmail(value.trim()));
    // setEmail(value);
    // setEmailError(!isValidEmail(value.trim()));
  };

  const handleContactNumberChange = (event) => {
    const value = event.target.value;
    dispatch(setContactNumber(value));
    setContactNumberError(value.trim().length < 7);
    // setContactNumber(value);
    // setContactNumberError(value.trim().length < 7);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const updateFormValidity = () => {
    const hasErrors =
      fullNameError ||
      emailError ||
      contactNumberError ||
      fullName.trim().length < 4 ||
      !isValidEmail(emailAddress.trim()) ||
      contactNumber.trim().length < 7; // Check for initial errors

    if (hasErrors) {
      dispatch(setInvalid());
    } else if (!hasErrors) {
      dispatch(setValid());
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "40%", margin: "2rem auto" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ flex: 1 }}
                id="full_name"
                label="Full Name"
                variant="standard"
                value={fullName}
                onChange={handleFullNameChange}
                error={fullNameError}
                helperText={fullNameError ? "Full Name is required" : ""}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ flex: 1 }}
                id="email_address"
                label="Email Address"
                variant="standard"
                onChange={handleEmailChange}
                value={emailAddress}
                error={emailError}
                helperText={emailError ? "Enter a valid email address" : ""}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Call sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                sx={{ flex: 1 }}
                id="contact_number"
                label="Contact Number"
                variant="standard"
                value={contactNumber}
                onChange={handleContactNumberChange}
                error={contactNumberError}
                helperText={
                  contactNumberError ? "Contact Number is required" : ""
                }
                required
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BasicInformation;
