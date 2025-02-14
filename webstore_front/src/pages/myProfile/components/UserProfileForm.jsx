import React, { memo, useState } from "react";
import { toast } from "react-toastify";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";

const UserProfileForm = ({ user }) => {
  const { updateUser } = useActions();

  const [formData, setFormData] = useState({
    userName: user.userName || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateUser = async () => {
    if (!formData.userName) {
      toast.error("Username is required.");
      return;
    }

    const result = await updateUser({
      id: user.id,
      userName: formData.userName,
      email: user.email,
      phoneNumber: null,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: user.role,
    });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(`Error: ${result.message}`);
    }
  };

  return (
    <div className="w-50">
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Username</span>
          <input
            type="text"
            name="userName"
            className="form-control"
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">First Name</span>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Last Name</span>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary float-end"
        onClick={handleUpdateUser}
      >
        Оновити
      </button>
    </div>
  );
};

export default memo(UserProfileForm);
