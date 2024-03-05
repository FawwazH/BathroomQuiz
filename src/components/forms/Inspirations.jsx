import * as React from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { setColorPreference } from "../../store/formSlice";
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

const Inspirations = () => {
  const dispatch = useDispatch();
  const colorPreference = useSelector(
    (state) => state.formValid.colorPreference
  );
  const isMounted = React.useRef(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [imageLoader, setImageLoader] = React.useState(false);

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
        file: { compressedFile, name: compressedFile.name },
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
