import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setValid, setInvalid, setBathroomPlans } from "../../store/formSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import imageCompression from "browser-image-compression";
import FacebookCircularProgress from "../FacebookCircularProgress";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const BathroomImages = () => {
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [plan, setPlan] = React.useState("");
  const isMounted = React.useRef(false);
  const [imageLoader, setImageLoader] = React.useState(false);
  const bathroomPlans = useSelector((state) => state.formValid.bathroomPlans);
  React.useEffect(() => {
    // Load files from local storage on component mount
    const storedFiles =
      JSON.parse(localStorage.getItem("bathroomImages")) || [];
    if (!isMounted.current) {
      setSelectedFiles(storedFiles);
      isMounted.current = true;
    }
  }, []);

  React.useEffect(() => {
    // Save files to local storage whenever selectedFiles changes
    localStorage.setItem("bathroomImages", JSON.stringify(selectedFiles));
    if (plan !== "" && selectedFiles.length >= 1) {
      dispatch(setValid());
    } else {
      dispatch(setInvalid());
    }
  }, [selectedFiles, plan]);

  const handleChange = (event) => {
    dispatch(setBathroomPlans(event.target.value));
    setPlan(event.target.value);
  };

  const handleFileChange = async (event) => {
    setImageLoader(true);
    const files = event.target.files;

    if (files.length + selectedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const compressOptions = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFiles = await Promise.all(
      Array.from(files).map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, compressOptions);
          return compressedFile;
        } catch (error) {
          console.error("Error compressing image:", error);
          return file;
        }
      })
    );

    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...compressedFiles.map((compressedFile, index) => ({
        dataURL: URL.createObjectURL(compressedFile),
        file: compressedFile,
      })),
    ]);
    setImageLoader(false);
  };

  const handleRemoveFile = (index) => {
    // Remove the file at the specified index
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div style={{ textAlign: "center", margin: "2rem auto" }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Bathroom Images *
        <VisuallyHiddenInput
          type="file"
          accept="image/*" // Adjust the accepted file types as needed
          multiple
          onChange={handleFileChange}
        />
      </Button>
      <p>Maximum three (3) images</p>
      {imageLoader && <FacebookCircularProgress />}

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {selectedFiles.map((file, index) => (
          <li key={index}>
            <img
              src={file.dataURL}
              alt={`Selected file ${index + 1}`}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                marginRight: "10px",
                display: !imageLoader ? "block" : "none",
              }}
            />
            <Typography variant="body2">{file.file.name}</Typography>
            <Button
              variant="text"
              size="small"
              color="error"
              onClick={() => handleRemoveFile(index)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* DropDown */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-label">Bathroom Plans</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plan}
            label="Plans"
            onChange={handleChange}
          >
            <MenuItem value="Actively considering a Bathroom Design">
              Actively considering a Bathroom Design
            </MenuItem>
            <MenuItem value="Currently in the Process of Redesigning My Bathroom">
              Currently in the Process of Redesigning My Bathroom
            </MenuItem>
            <MenuItem value="Exploring Ideas, No Immediate Redesign Plans">
              Exploring Ideas, No Immediate Redesign Plans
            </MenuItem>
            <MenuItem value="Curious to See How My Bathroom Could Look">
              Curious to See How My Bathroom Could Look
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default BathroomImages;
