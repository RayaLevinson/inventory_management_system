import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  revisions: [],
  loading: false,
  revision: null,
};

export const revisionSlice = createSlice({
  name: "revision",
  initialState,
  reducers: {
    setRevision: (state, action) => {
      state.revision = action.payload;
    },
    addRevision: (state, action) => {
      let revisions = state.revisions;
      revisions.unshift(action.payload);
      state.revisions = revisions;
    },
    setRevisions: (state, action) => {
      state.revisions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateRevision: (state, action) => {
      const { id, revision } = action.payload;
      state.revisions.every(({ _id }, i) => {
        if (id === _id) {
          state.revisions[i] = revision;
          return false;
        }
        return true;
      });
    },
    removeRevision: (state, action) => {
      const { id } = action.payload;
      state.revisions.every(({ _id }, i) => {
        if (id === _id) {
          state.revisions.splice(i, 1);
          return false;
        }
        return true;
      });
    },
  },
});

const revisionReducer = revisionSlice.reducer;

export const revisionActions = revisionSlice.actions;
export default revisionReducer;
