import { configureStore } from "@reduxjs/toolkit";
import databaseSlice from "./databaseSlice";

const store = configureStore({
  reducer: {
    database: databaseSlice.reducer
    },
});

export default store;
