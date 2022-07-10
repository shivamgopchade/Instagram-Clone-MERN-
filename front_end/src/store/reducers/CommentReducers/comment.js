import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/GETPOSTCOMMENT",
  async ({ post_id }, { dispatch }) => {
    //console.log(post_id);
    return fetch(`http://localhost:5000/comment/getComments/${post_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export const getComment = createAsyncThunk(
  "comments/GETCOMMENT",
  async ({ comment_id }, { dispatch }) => {
    console.log(comment_id);
    return fetch(`http://localhost:5000/comment/getComment/${comment_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);
export const deleteComment = createAsyncThunk(
  "comments/DELETECOMMENT",
  async ({ comment }, { dispatch }) => {
    //console.log(comment);
    return fetch(`http://localhost:5000/comment/deleteComment`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export const addComment = createAsyncThunk(
  "comments/ADDCOMMENT",
  async ({ body }, { dispatch }) => {
    console.log(body);
    return fetch(`http://localhost:5000/comment/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
);

export const comment_slice = createSlice({
  name: "comments",
  initialState: { comments: [], loading: false },
  extraReducers: {
    [getComment.pending]: (state, action) => {
      state.loading = true;
      //console.log("pending");
    },
    [getComment.fulfilled]: (state, action) => {
      //console.log("fulfilled");
      state.loading = false;
      const comment = action.payload;
      state.comments = comment;
    },
    [getComment.rejected]: (state, action) => {
      //console.log("rejected");
      state.loading = false;
    },
    [getComments.pending]: (state, action) => {
      state.loading = true;
      //console.log("pending");
    },
    [getComments.fulfilled]: (state, action) => {
      //console.log("fulfilled");
      state.loading = false;
      const comment = action.payload;
      state.comments = comment;
    },
    [getComments.rejected]: (state, action) => {
      //console.log("rejected");
      state.loading = false;
    },
    [addComment.pending]: (state, action) => {
      state.loading = true;
      //console.log("pending");
    },
    [addComment.fulfilled]: (state, action) => {
      //console.log("fulfilled");
      state.loading = false;
      const comment = action.payload;
      //console.log(comment);
      state.comments = [...state.comments, comment];
    },
    [addComment.rejected]: (state, action) => {
      //console.log("rejected");
      state.loading = false;
    },
    [deleteComment.pending]: (state, action) => {
      state.loading = true;
      //console.log("pending");
    },
    [deleteComment.fulfilled]: (state, action) => {
      //console.log("fulfilled");
      state.loading = false;
      const deleted_comment = action.payload;
      console.log("payload is", action.payload);
      state.comments = state.comments.filter(
        (comment) => comment._id !== deleted_comment._id
      );
    },
    [deleteComment.rejected]: (state, action) => {
      //console.log("rejected");
      state.loading = false;
    },
  },
});

export default comment_slice.reducer;
