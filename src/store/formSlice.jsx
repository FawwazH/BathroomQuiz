import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "formValid",
  initialState: {
    isValid: true,
    fullName: "",
    emailAddress: "",
    contactNumber: "",
    stylePreference: "",
    inspirationImages: [],
    colorPreference: "",
    bathroomRestrictions: "",
    bathroomImages: [],
    bathroomPlans: "",
  },
  reducers: {
    setValid: (state) => {
      state.isValid = true;
    },
    setInvalid: (state) => {
      state.isValid = false;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.emailAddress = action.payload;
    },
    setContactNumber: (state, action) => {
      state.contactNumber = action.payload;
    },
    setStylePreference: (state, action) => {
      state.stylePreference = action.payload;
    },
    setColorPreference: (state, action) => {
      state.colorPreference = action.payload;
    },
    setBathroomRestrictions: (state, action) => {
      state.bathroomRestrictions = action.payload;
    },
  },
});

export const {
  setValid,
  setInvalid,
  setFullName,
  setEmail,
  setContactNumber,
  setStylePreference,
  setInspirationImages,
  setColorPreference,
  setBathroomRestrictions,
} = formSlice.actions;

export default formSlice.reducer;
