// import { change } from "redux-form";

const LocalStorage = {
  getItem: (key) => {
    let value = localStorage.getItem(key) || "";

    if (value === "undefined") value = "";
    return value ? JSON.parse(value) : value;
  },

  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  setFormValues: (form, dispatch) => {
    let values = localStorage.getItem(form) || "";

    if (!values) return;

    values = JSON.parse(values);
  },
};

export default LocalStorage;
