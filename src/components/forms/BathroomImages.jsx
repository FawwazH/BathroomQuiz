import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setValid, setInvalid } from "../../store/formSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import imageCompression from "browser-image-compression";

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
    setPlan(event.target.value);
  };

  const compressImage = async (file) => {
    const compressedFile = await new ImageCompressor().compress(file);
    return compressedFile;
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;

    // Ensure the total number of files is not more than 3
    if (files.length + selectedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const compressedFiles = await Promise.all(
      Array.from(files).map(async (file) => await compressImage(file))
    );

    setSelectedFiles((prevFiles) => [
      ...prevFiles,
      ...compressedFiles.map((compressedFile, index) => ({
        dataURL: URL.createObjectURL(compressedFile),
        file: compressedFile,
      })),
    ]);

    // Read the selected image files as data URLs
    // const fileReaders = Array.from(files).map((file) => {
    //   const reader = new FileReader();
    //   return new Promise((resolve) => {
    //     reader.onloadend = () => resolve(reader.result);
    //     reader.readAsDataURL(file);
    //   });
    // });

    // // Wait for all FileReader promises to resolve and update the selectedFiles state
    // Promise.all(fileReaders).then((dataURLs) => {
    //   setSelectedFiles((prevFiles) => [
    //     ...prevFiles,
    //     ...dataURLs.map((dataURL, index) => ({ dataURL, file: files[index] })),
    //   ]);
    // });
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
            <MenuItem value={10}>
              Actively considering a Bathroom Design
            </MenuItem>
            <MenuItem value={20}>
              Currently in the Process of Redesigning My Bathroom
            </MenuItem>
            <MenuItem value={30}>
              Exploring Ideas, No Immediate Redesign Plans
            </MenuItem>
            <MenuItem value={40}>
              Curious to See How My Bathroom Could Look
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default BathroomImages;
