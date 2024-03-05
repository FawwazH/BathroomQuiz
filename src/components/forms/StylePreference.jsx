import React from "react";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import FacebookCircularProgress from "../FacebookCircularProgress";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { useSelector, useDispatch } from "react-redux";
import { setValid, setStylePreference } from "../../store/formSlice";

const StylePreference = () => {
  const dispatch = useDispatch();
  const stylePreference = useSelector(
    (state) => state.formValid.stylePreference
  );

  const [traditionalImageLoaded, setTraditionalImageLoaded] =
    React.useState(false);
  const [modernImageLoaded, setModernImageLoaded] = React.useState(false);
  const [contemporaryImageLoaded, setContemporaryImageLoaded] =
    React.useState(false);
  const [industrialImageLoaded, setIndustrialImageLoaded] =
    React.useState(false);

  const handleTraditionalImageLoad = () => {
    setTraditionalImageLoaded(true);
  };

  const handleModernImageLoad = () => {
    setModernImageLoaded(true);
  };

  const handleContemporaryImageLoad = () => {
    setContemporaryImageLoaded(true);
  };

  const handleIndustrialImageLoad = () => {
    setIndustrialImageLoaded(true);
  };

  const handleRadioChange = (event) => {
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
            {!traditionalImageLoaded && (
              <FacebookCircularProgress style={{ margin: "0 auto" }} />
            )}
            <img
              style={{
                width: "50%",
                borderRadius: ".6rem",
                display: traditionalImageLoaded ? "block" : "none",
              }}
              src="/images/traditional-bathroom.jpg"
              onLoad={handleTraditionalImageLoad}
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
            {!modernImageLoaded && <FacebookCircularProgress />}
            <img
              style={{
                width: "50%",
                borderRadius: ".6rem",
                display: modernImageLoaded ? "block" : "none",
              }}
              src="/images/modern-bathroom.jpg"
              onLoad={handleModernImageLoad}
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
            {!contemporaryImageLoaded && <FacebookCircularProgress />}
            <img
              style={{
                width: "50%",
                borderRadius: ".6rem",
                display: contemporaryImageLoaded ? "block" : "none",
              }}
              src="/images/contemporary-bathroom.jpg"
              onLoad={handleContemporaryImageLoad}
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
            {!industrialImageLoaded && <FacebookCircularProgress />}
            <img
              style={{
                width: "50%",
                borderRadius: ".6rem",
                display: industrialImageLoaded ? "block" : "none",
              }}
              src="/images/industrial-bathroom.jpg"
              onLoad={handleIndustrialImageLoad}
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
