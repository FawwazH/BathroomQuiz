import React from "react";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useSelector, useDispatch } from "react-redux";
import { setValid, setStylePreference } from "../../store/formSlice";

const StylePreference = () => {
  const dispatch = useDispatch();
  const stylePreference = useSelector(
    (state) => state.formValid.stylePreference
  );
  //const [selectedValue, setSelectedValue] = React.useState("");

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    dispatch(setStylePreference(event.target.value));
    dispatch(setValid());
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "2rem 0" }}>
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50%", borderRadius: ".6rem" }}
              src="/images/traditional-bathroom.jpg"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label={<Typography variant="body1">Traditional</Typography>}
              value="traditional"
              checked={stylePreference === "traditional"}
              onChange={handleRadioChange}
            />
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50%", borderRadius: ".6rem" }}
              src="/images/modern-bathroom.jpg"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label={<Typography variant="body1">Modern</Typography>}
              value="modern"
              checked={stylePreference === "modern"}
              onChange={handleRadioChange}
            />
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50%", borderRadius: ".6rem" }}
              src="/images/contemporary-bathroom.jpg"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label={<Typography variant="body1">Contemporary</Typography>}
              value="contemporary"
              checked={stylePreference === "contemporary"}
              onChange={handleRadioChange}
            />
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50%", borderRadius: ".6rem" }}
              src="/images/industrial-bathroom.jpg"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label={<Typography variant="body1">Industrial</Typography>}
              value="industrial"
              checked={stylePreference === "industrial"}
              onChange={handleRadioChange}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StylePreference;
