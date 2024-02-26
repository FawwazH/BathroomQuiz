import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setBathroomRestrictions } from "../../store/formSlice";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 420px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const Challenges = () => {
  const dispatch = useDispatch();
  const bathroomRestrictions = useSelector(
    (state) => state.formValid.bathroomRestrictions
  );

  const maxCharacterLimit = 500; // Set your desired character limit
  const remainingCharacters = maxCharacterLimit - bathroomRestrictions.length;

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= maxCharacterLimit) {
      dispatch(setBathroomRestrictions(newValue));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem auto",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Typography variant="body1">
        Bathroom Restrictions, Challenges or General Comments
      </Typography>
      <Textarea
        style={{ height: "150px" }}
        aria-label="empty textarea"
        placeholder={`Bathroom restrictions, challenges, or general comments (Max ${maxCharacterLimit} characters)`}
        value={bathroomRestrictions}
        onChange={handleTextareaChange}
      />
      <Typography variant="body2" color="textSecondary">
        {`${remainingCharacters}/${maxCharacterLimit} characters remaining`}
      </Typography>
    </div>
  );
};

export default Challenges;
