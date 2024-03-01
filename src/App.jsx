import * as React from "react";
import BasicInformation from "./components/forms/BasicInformation";
import StylePreference from "./components/forms/StylePreference";
import Inspirations from "./components/forms/Inspirations";
import Challenges from "./components/forms/Challenges";
import BathroomImages from "./components/forms/BathroomImages";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import { setValid, setInvalid } from "./store/formSlice";

import { useSelector, useDispatch } from "react-redux";

import uploadImagesAndCreateRecords from "./store/formAction";

const steps = [
  "Basic Information",
  "Style Preference",
  "Inspirations",
  "Challenges or Restrictions",
  "Upload Bathroom Images",
];

const forms = [
  <BasicInformation />,
  <StylePreference />,
  <Inspirations />,
  <Challenges />,
  <BathroomImages />,
];
const App = () => {
  const dispatch = useDispatch();
  const bool = useSelector((state) => state.formValid.isValid);
  const dataObject = useSelector((state) => state.formValid);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  React.useEffect(() => {
    if (isStepOptional(activeStep)) {
      dispatch(setValid());
    } else {
      dispatch(setInvalid());
    }
  }, [activeStep]);

  const isStepOptional = (step) => {
    return step === 2 || step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const { inspirationImages, bathroomImages, isValid, ...filteredState } =
        dataObject;
      uploadImagesAndCreateRecords(filteredState);
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <h2>Bathroom Quiz</h2>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {forms[activeStep]}

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, mx: "auto" }}>
              Thank you for your information. We will be in contact with you
              soon.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}

              <Button onClick={handleNext} disabled={!bool}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};

export default App;
