import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk("posts/GET", async () => {
  return fetch(`http://localhost:5000/post/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
});

export const getUserPosts = createAsyncThunk(
  "posts/USERGET",
  async ({ user_id }, { dispatch }) => {
    //console.log(user_id);
    return fetch(`http://localhost:5000/post/userposts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
      credentials: "include",
    }).then((res) => res.json());
  }
);

export const deletePost = createAsyncThunk(
  "posts/DELETE",
  async ({ id }, { dispatch }) => {
    console.log("id is", id);
    const res = await fetch(`http://localhost:5000/post/deletePost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 200) console.log("post deleted");
    return res.json();
  }
);

export const likePost = createAsyncThunk(
  "posts/likes",
  async ({ id, user }, { dispatch }) => {
    const res = await fetch(`http://localhost:5000/post/likePost/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: user,
        status: "like",
      }),
      credentials: "include",
    });

    return res.json();
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikes",
  async ({ id, user }, { dispatch }) => {
    const res = await fetch(`http://localhost:5000/post/likePost/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users: user,
        status: "dislike",
      }),
      credentials: "include",
    });
    return res.json();
  }
);

export const postslice = createSlice({
  name: "posts",
  initialState: { loading: false, data: [] },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },

    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.status = "failed";
    },

    [likePost.pending]: (state, action) => {
      //state.loading = true;
      console.log("pending");
    },

    [likePost.fulfilled]: (state, action) => {
      //console.log("fulfilled");
      //state.loading = false;
      const user = action.payload.user;
      //console.log(user);
      state.data = state.data.map((post) => {
        if (post._id === action.payload.id) {
          if (
            !post.likes.find((users) => {
              //console.log(users === user._id);
              return users === user._id;
            })
          )
            post.likes.push(user._id);
        }
        return post;
      });
      //console.log("data:", state.data);
    },

    [likePost.rejected]: (state, action) => {
      //state.loading = false;
      console.log("failed");
    },

    [dislikePost.pending]: (state, action) => {
      //state.loading = true;
      console.log("pending dislike");
    },

    [dislikePost.fulfilled]: (state, action) => {
      const user1 = action.payload.user;
      //state.loading = false;
      //console.log("disliked fulfilled");
      state.data = state.data.map((post) => {
        if (post._id === action.payload.id) {
          post.likes = post.likes.filter((user) => user !== user1._id);
        }

        return post;
      });
      //console.log(state.data);
    },

    [dislikePost.rejected]: (state, action) => {
      //state.loading = false;
      console.log("post failed dislike");
    },

    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },

    [deletePost.fulfilled]: (state, action) => {
      state.data = state.data.filter((post) => {
        return post._id !== action.payload.id;
      });
      state.loading = false;
    },

    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      console.log("rejected delete");
    },

    [getUserPosts.pending]: (state, action) => {
      state.loading = true;
      console.log("user post pending");
    },

    [getUserPosts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      console.log("user post fulfilled");
    },

    [getUserPosts.rejected]: (state, action) => {
      state.loading = false;
      console.log("user post rejected");
    },
  },
});

export default postslice.reducer;
