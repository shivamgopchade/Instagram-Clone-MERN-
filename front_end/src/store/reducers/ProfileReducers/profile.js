import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPosts } from "../PostReducers/post";

export const Getprofile = createAsyncThunk(
  "profiles/GET",
  async ({ user_id }, { dispatch }) => {
    //console.log("id in hook", user_id);
    return fetch(`http://localhost:5000/profile/Profiledetails/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch(getUserPosts({ user_id }));
        return res.json();
      })
      .catch((err) => console.log(err));
  }
);
export const Updateprofile = createAsyncThunk(
  "profiles/POST",
  async ({ id, name, bio, file }, { dispatch }) => {
    //console.log("bio is", bio);
    return fetch(`http://localhost:5000/profile/update/${id}`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        bio: bio,
        profile_image: file,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState: { loading: true, profile: null, user: null },
  extraReducers: {
    [Getprofile.pending]: (state, action) => {
      console.log("pending");
      state.loading = true;
    },
    [Getprofile.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.loading = false;
      state.profile = action.payload.profile;
      state.user = action.payload.user;
      //console.log("bio in store", action.payload.profile.bio);
    },
    [Getprofile.rejected]: (state, action) => {
      console.log("rejected");
      state.loading = false;
    },
    [Updateprofile.pending]: (state) => {
      state.loading = true;
      console.log("pending update");
    },
    [Updateprofile.fulfilled]: (state, action) => {
      //console.log(action.payload);
      state.loading = false;
      state.profile = action.payload;
    },
    [Updateprofile.rejected]: (state) => {
      console.log("update rejected");
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
