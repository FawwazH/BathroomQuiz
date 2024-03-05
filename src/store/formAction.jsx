import { DataObject } from "@mui/icons-material";
import { storage, db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const uploadImagesAndCreateRecords = async (userInput) => {
  try {
    // Define an async function to handle the image upload
    const uploadImage = async (image, isInspirational) => {
      const path = isInspirational ? "inspirational-images" : "bathroom-images";
      // Creating a reference to the file
      const imageRef = ref(storage, `${path}/${image.file.name}v4()`);

      // Fetch the image Blob asynchronously
      const response = await fetch(image.dataURL);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      await uploadBytes(imageRef, blob);

      return imageRef.fullPath;
    };

    const userResponsesRef = collection(db, "userResponses");

    const createDBRecord = async (
      userInput,
      inspirationalImageRef,
      bathroomImageRef
    ) => {
      await addDoc(userResponsesRef, {
        ...userInput,
        inspirationaImages: inspirationalImageRef,
        bathroomImageRef,
      });
    };

    //Getting inspirational images from local Storage
    const inspirationalImagesObject = localStorage.getItem("selectedFiles");

    /*Transforming into array */
    const inspirationalImages = JSON.parse(inspirationalImagesObject);
    let inspirtionalImagesRef = [];
    //Uploading Inspirational Images
    if (inspirationalImages.length > 0) {
      // Use Promise.all with await to wait for all uploads to complete
      inspirtionalImagesRef = await Promise.all(
        inspirationalImages.map((image) => uploadImage(image, true))
      );

      // Now remove the inspirational images from local storage
      localStorage.removeItem("selectedFiles");
    }

    //Uploading Bathroom Images
    const bathroomImagesObject = localStorage.getItem("bathroomImages");

    //Transforming into array
    const bathroomImages = JSON.parse(bathroomImagesObject);

    //Uploading bathroom images
    const bathroomImagesRef = await Promise.all(
      bathroomImages.map((image) => uploadImage(image, false))
    );
    /*Image ref */
    console.log(bathroomImagesRef);

    /*User input */
    console.log(userInput);
    localStorage.removeItem("bathroomImages");

    //Finally adding firestore reference
    createDBRecord(userInput, inspirtionalImagesRef, bathroomImagesRef);
  } catch (error) {
    console.error("Error uploading information:", error);
  }
};

export default uploadImagesAndCreateRecords;
