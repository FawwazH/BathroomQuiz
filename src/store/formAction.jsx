import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const uploadImagesAndCreateRecords = async (dataObj) => {
  try {
    // Create a reference to the 'usersResponses' collection in Firestore
    //const usersCollectionRef = firestore.collection("userResponses");
    let inspirationalImagesReference = [];
    let bathroomImagesReference = [];
    //Uploading inspirational images
    const inspirationalImagesObject = localStorage.getItem("selectedFiles");

    /*Transforming into array */
    const inspirationalImages = JSON.parse(inspirationalImagesObject);

    if (inspirationalImages.length > 0) {
      // Define an async function to handle the image upload
      const uploadImage = async (image) => {
        // Creating a reference to the file
        const inspirationalImageRef = ref(
          storage,
          `inspirational-images/${image.file.name}`
        );

        // Fetch the image Blob asynchronously
        const response = await fetch(image.dataURL);
        const blob = await response.blob();

        // Upload the image to Firebase Storage
        await uploadBytes(inspirationalImageRef, blob);

        // Adding reference to the file
        inspirationalImagesReference.push(inspirationalImageRef);
      };

      // Use Promise.all with await to wait for all uploads to complete
      await Promise.all(inspirationalImages.map(uploadImage));

      // Now remove the inspirational images from local storage
      localStorage.removeItem("selectedFiles");
    }
  } catch (error) {
    console.error("Error uploading information:", error);
  }
};

export default uploadImagesAndCreateRecords;
