import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import UserService from "services/auth/user/user.service";
import { modalActions } from "@redux/slices/modal";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import ToasterService from "utils/toaster.util";

const options = [
  {
    label: "Super Admin",
    value: "superAdmin",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Editor",
    value: "editor",
  },
  {
    label: "Viewer",
    value: "viewer",
  },
  {
    label: "Guest",
    value: "guest",
  },
];
function AddUser() {
  const { editData } = useAppSelector((state) => state.modal.data);
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [cPassword, setCPassword] = useState("");
  const [view, setView] = useState(false);

  useEffect(() => {
    if (editData) {
      setData({
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        role: editData.role,
      });
    }
  }, [editData]);
  const onSubmit = async () => {
    if (data.password && data.password !== cPassword) {
      ToasterService.showError("Password not match with Confirm password");
      return;
    }
    if (editData) {
      await UserService.updateUser({
        ...data,
        _id: editData._id,
      });
    } else {
      UserService.addUser({ ...data });
    }
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="p-4">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              required
              value={data.firstName}
              onChange={(event) =>
                setData({ ...data, firstName: event.target.value })
              }
              className="form-control"
              id="firstName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={(event) =>
                setData({ ...data, lastName: event.target.value })
              }
              className="form-control"
              id="lastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={view ? "text" : "password"}
                value={data.password}
                id="password"
                className="form-control"
                onChange={(event) =>
                  setData({ ...data, password: event.target.value })
                }
                aria-label="Dollar amount (with dot and two decimal places)"
              />
              <span className="input-group-text">
                {!view ? (
                  <FaRegEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setView(true)}
                  />
                ) : (
                  <FaRegEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setView(false)}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-group">
              <input
                type={view ? "text" : "password"}
                value={cPassword}
                id="cPassword"
                className="form-control"
                onChange={(event) => setCPassword(event.target.value)}
                aria-label="Dollar amount (with dot and two decimal places)"
              />
              <span className="input-group-text">
                {!view ? (
                  <FaRegEyeSlash
                    style={{ cursor: "pointer" }}
                    onClick={() => setView(true)}
                  />
                ) : (
                  <FaRegEye
                    style={{ cursor: "pointer" }}
                    onClick={() => setView(false)}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              value={data.role}
              onChange={(event) =>
                setData({ ...data, role: event.target.value })
              }
              className="form-select"
              id="role"
              aria-label="Default select example"
            >
              <option value={""}>Select Role</option>
              {options?.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(modalActions.closeModal());
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}

export default AddUser;
