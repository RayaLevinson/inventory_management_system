import { lazy } from "react";

const ConfirmationModal = lazy(() => import("./ConfirmationModal"));
const ViewModules = lazy(() => import("./ViewModules"));
const AddUser = lazy(() => import("./AddUser"));
const History = lazy(() => import("./History"));

export { default } from "./AppModal";

export const modalMapper = {
  CONFIRMATION_FORM: <ConfirmationModal />,
  VIEW_MODULES: <ViewModules />,
  ADD_USER: <AddUser />,
  HISTORY: <History />,
};
