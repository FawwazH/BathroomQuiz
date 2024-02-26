import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setColorPreference } from "../../store/formSlice";

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

const Inspirations = () => {
  const dispatch = useDispatch();
  const colorPreference = useSelector(
    (state) => state.formValid.colorPreference
  );
  const isMounted = React.useRef(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  React.useEffect(() => {
    // Load files from local storage on component mount
    const storedFiles = JSON.parse(localStorage.getItem("selectedFiles")) || [];
    if (!isMounted.current) {
      setSelectedFiles(storedFiles);
      isMounted.current = true;
    }
  }, []);

  React.useEffect(() => {
    // Save files to local storage whenever selectedFiles changes
    localStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));
  }, [selectedFiles]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    // Ensure the total number of files is not more than 3
    if (files.length + selectedFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    // Read the selected image files as data URLs
    const fileReaders = Array.from(files).map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    // Wait for all FileReader promises to resolve and update the selectedFiles state
    Promise.all(fileReaders).then((dataURLs) => {
      setSelectedFiles((prevFiles) => [
        ...prevFiles,
        ...dataURLs.map((dataURL, index) => ({ dataURL, file: files[index] })),
      ]);
    });
  };

  const handleRemoveFile = (index) => {
    // Remove the file at the specified index
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleColorChange = (event) => {
    dispatch(setColorPreference(event.target.value));
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
        Upload Inspiration Images
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

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Typography variant="body1">Color Preferences:</Typography>
        <input
          placeholder="Hex Code #3e3e3e"
          style={{
            borderRadius: ".3rem",
            padding: ".6rem .3rem",
            border: "3px solid #eee",
          }}
          type="text"
          value={colorPreference}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default Inspirations;
