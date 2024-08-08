import { modalMapper } from ".";
import { Suspense } from "react";
import { modalActions } from "@redux/slices/modal";
import CircleLoader from "components/atoms/CircleLoader";
import ErrorBoundary from "components/atoms/ErrorBoundary";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";

function AppModal() {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modal.type);
  const open = useAppSelector((state) => state.modal.open);
  const size = useAppSelector((state) => state.modal.size);
  const data = useAppSelector((state) => state.modal.data);

  const closeBackdropClick = useAppSelector(
    (state) => state.modal.closeBackdropClick
  );

  const loading = useAppSelector((state) => state.modal.loading);
  return (
    <Modal
      // open={open}
      size={size}
      backdrop="static"
      keyboard={false}
      centered
      show={open}
      onHide={(_, reason) => {
        if (reason !== "backdropClick" || closeBackdropClick)
          dispatch(modalActions.closeModal());
      }}
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="app-modal-body"
        style={{
          width: "100%",
          border: "none",
          // maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <ErrorBoundary>
          <div style={{ minHeight: "123px", position: "relative" }}>
            <Modal.Header closeButton>
              <Modal.Title>{data?.heading}</Modal.Title>
            </Modal.Header>
            {loading && <CircleLoader />}

            <Suspense fallback={<CircleLoader />}>
              <div>{type && modalMapper[type]}</div>
            </Suspense>
          </div>
        </ErrorBoundary>
      </div>
    </Modal>
  );
}
export default AppModal;
