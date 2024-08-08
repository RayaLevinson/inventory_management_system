import http from "@redux/services/http.service";
import Promisable from '@redux/services/promisable.service'
import { getAppDispatch } from "utils/dispatch.util";
import { materialActions } from "@redux/slices/material";
import { modalActions } from "@redux/slices/modal";

const url = "/materials";

const MaterialService = {
  getMaterialsByFilter: async (filterData) => {
    const dispatch = getAppDispatch();
    dispatch?.(modalActions.setLoading(true));

    http.setJWT();

    const [success, error] = await Promisable.asPromise(http.post(`${url}/filtered`, filterData))

    if (success) {
      const { materials, count } = success.data.data;

      dispatch?.(materialActions.setMaterials({ materials, count}));
    }

    dispatch?.(modalActions.setLoading(false));
    // dispatch?.(modalActions.closeModal());    
    return [success, error];
  },
  addMaterial: async (data) => {
    const dispatch = getAppDispatch();
    dispatch?.(materialActions.setLoading(true));

    http.setJWT();

    const [success, error] = await Promisable.asPromise(
      http.post(`${url}`, data)
    );

    if (success) {
      const { material } = success.data.data;
      dispatch?.(materialActions.addMaterial(material));
    }

    dispatch?.(materialActions.setLoading(false));
    dispatch?.(modalActions.closeModal());
    return [success, error];
  },
  updateMaterial: async (data) => {
    const { _id } = data
    const dispatch = getAppDispatch();
    dispatch?.(modalActions.setLoading(true));

    http.setJWT();

    const [success, error] = await Promisable.asPromise(
      http.put(`${url}/${_id}`, data)
    );

    if (success) {
      const { material } = success.data.data;
      dispatch?.(
        materialActions.updateMaterial({
          id: material._id,
          material,
        })
      );
      dispatch?.(modalActions.closeModal());
    }

    dispatch?.(modalActions.setLoading(false));
    return [success, error];
  },
  deleteMaterial: async (_id) => {
    const dispatch = getAppDispatch();
    dispatch?.(modalActions.setLoading(true));

    http.setJWT();

    const [success, error] = await Promisable.asPromise(
      http.delete(`${url}/${_id}`)
    );

    if (success) {
      const { material } = success.data.data;
      dispatch?.(materialActions.removeMaterial({ id: _id }));
      dispatch?.(modalActions.closeModal());
    }

    dispatch?.(modalActions.setLoading(false));
    return [success, error];
  },
  deleteAllMaterials: async () => {
    const dispatch = getAppDispatch()
     dispatch?.(modalActions.setLoading(true))
    http.setJWT()

    const [success, error] = await Promisable.asPromise(http.delete(`${url}/all`))

    if (success) {
      dispatch?.(materialActions.removeAllMaterials())
    }
    dispatch?.(modalActions.setLoading(false))    
    return [success, error]
  }
};

export default MaterialService;
