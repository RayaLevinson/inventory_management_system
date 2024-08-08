import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materialTypes: [],
  loading: false,
  materialType: null
}

export const materialTypeSlice = createSlice({
  name: "materialType",
  initialState,
  reducers: {
    setMaterialType: (state, action) => {
      state.materialType = action.payload;
    },
    addMaterialType: (state, action) => {
      let materialTypes = state.materialTypes;
      materialTypes.unshift(action.payload);
      state.materialTypes = materialTypes;
    },
    setMaterialTypes: (state, action) => {
      state.materialTypes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateMaterialType: (state, action) => {
      const { id, materialType } = action.payload;
      state.materialTypes.every(({ _id }, i) => {
        if (id === _id) {
          state.materialTypes[i] = materialType;
          return false;
        }
        return true;
      });
    },
    removeMaterialType: (state, action) => {
      const { id } = action.payload;
      state.materialTypes.every(({ _id }, i) => {
        if (id === _id) {
          state.materialTypes.splice(i, 1);
          return false;
        }
        return true;
      });
    },
    removeAllMaterialTypes: (state, action) => {      
      state.materialTypes = [];
        return true;
    },
  },
});

const materialTypeReducer = materialTypeSlice.reducer;

export const materialTypeActions = materialTypeSlice.actions;
export default materialTypeReducer;
