import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "../user/userSlice";

import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { hideLoading, showLoading, getAllJobs } from "../allJobs/allJobsSlice";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const resp = await customFetch.post("/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handelChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created Successfully!");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Deleted Successfully!");
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Updated Successfully!");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handelChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
