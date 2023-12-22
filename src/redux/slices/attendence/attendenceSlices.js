import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

// reset actions
export const resetAttendancePunchIn = createAction("attendence/punchIn");

export const attendencePunchInAction = createAsyncThunk(
  "attendence/punchIn",
  async (attendence, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseUrl}/api/attendence`,
        attendence
      );
      console.log("data", data);
      dispatch(resetAttendancePunchIn());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const attendenceSlice = createSlice({
  name: "attendence",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(attendencePunchInAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAttendancePunchIn, (state, action) => {
      state.isPunChedIn = true;
    });
    builder.addCase(attendencePunchInAction.fulfilled, (state, action) => {
      state.attendence = action?.payload;
      state.isPunChedIn = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(attendencePunchInAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default attendenceSlice.reducer;
