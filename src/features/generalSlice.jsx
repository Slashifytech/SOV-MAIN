import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  countryInstituteOptions,
  countryOptions,
  courseData,
  getStudentDataById,
  prefferedCountry,
} from "./generalApi";

export const getCountryOption = createAsyncThunk(
  "general/getCountryOption",
  async (_, { rejectWithValue }) => {
    try {
      const res = await countryOptions();

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch country options"
      );
    }
  }
);
export const getPrefCountryOption = createAsyncThunk(
  "general/getPrefCountryOption",
  async (_, { rejectWithValue }) => {
    try {
      const res = await prefferedCountry();

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch country options"
      );
    }
  }
);

export const getInstituteOption = createAsyncThunk(
  "general/getInstituteOption",
  async (country, { rejectWithValue }) => {
    try {
      const res = await countryInstituteOptions(country);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch country options"
      );
    }
  }
);
export const getCourses = createAsyncThunk(
  "general/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await courseData();
      // console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch country options"
      );
    }
  }
);

export const studentById = createAsyncThunk(
  "general/studentById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getStudentDataById(id);
      // console.log(res);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Failed to fetch country options"
      );
    }
  }
);


const generalSlice = createSlice({
  name: "general",
  initialState: {
    countryOption: [],
    prefCountryOption: [],
    instituteOption: [],
    courses:[],
    studentData:null,
    status: "idle",
    error: null,
  },
  reducers: {
    // Add a reducer to remove a university optimistically (immediate UI update)
    removeShortlistedUniversity: (state, action) => {
      state.instituteOption = state.instituteOption.filter(
        (institute) => institute.id !== action.pay
      );
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getCountryOption.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCountryOption.fulfilled, (state, action) => {
        state.countryOption = action.payload[0].allCountry;
        state.status = "succeeded";
      })
      .addCase(getCountryOption.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getInstituteOption.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getInstituteOption.fulfilled, (state, action) => {
        state.instituteOption = action.payload;
        state.status = "succeeded";
      })
      .addCase(getInstituteOption.rejected, (state, action) => {
        state.status = "failed";
        state.instituteOption = []
        state.error = action.payload || action.error.message;
      })
      .addCase(getPrefCountryOption.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPrefCountryOption.fulfilled, (state, action) => {
        state.prefCountryOption = action.payload[0].preferredCountry;
        state.status = "succeeded";
      })
      .addCase(getPrefCountryOption.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.status = "succeeded";
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })  .addCase(studentById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(studentById.fulfilled, (state, action) => {
        state.studentData = action.payload;
        state.status = "succeeded";
      })
      .addCase(studentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const { clearInstituteOption } = generalSlice.actions;
export default generalSlice.reducer;
