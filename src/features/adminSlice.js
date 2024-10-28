import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAgentDataByAdmin,
  getAllApplicationforApproval,
  getAllApproval,
  getStudentDataByAdmin,
} from "./adminApi";

// Async thunk to fetch agent data
export const applicationForApproval = createAsyncThunk(
  "agents/applicationForApproval",
  async (
    { tabType, page, perPage, search, isTypeFilter },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllApplicationforApproval(
        tabType,
        page,
        perPage,
        search,
        isTypeFilter
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);
export const agentStudentApprovals = createAsyncThunk(
  "agents/agentStudentApprovals",
  async (
    { tabType, search, page, perPage, isTypeFilter },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllApproval(
        tabType,
        search,
        page,
        perPage,
        isTypeFilter
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);
export const agentDataProfile = createAsyncThunk(
  "admin/agentDataProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAgentDataByAdmin(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);

export const getStudentById = createAsyncThunk(
  "admin/getStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getStudentDataByAdmin(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Failed to fetch agent data"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    approvals: [],
    applications: [],
    tabType: "",
    status: "idle",
    error: null,
    updateState: false,
    agentProfile: "",
    getStudentDataById: null
  },
  reducers: {
    setTabType: (state, action) => {
      state.updateState = !state.updateState;
      state.tabType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applicationForApproval.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applicationForApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.applications = action.payload;
      })
      .addCase(applicationForApproval.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(agentStudentApprovals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(agentStudentApprovals.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Payload received:", action.payload);

        state.approvals = action.payload;
      })
      .addCase(agentStudentApprovals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(agentDataProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(agentDataProfile.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.agentProfile = action.payload;
      })
      .addCase(agentDataProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(getStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.getStudentDataById = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
export const { setTabType } = adminSlice.actions;
export default adminSlice.reducer;
