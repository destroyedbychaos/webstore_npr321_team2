import React from "react";
import { useSelector } from "react-redux";
import UserImage from "./components/UserImage";
import UserProfileForm from "./components/UserProfileForm";

const MyProfilePage = () => {
  const user = useSelector((store) => store.auth.user);

  if (!user) return null;

  return (
    <>
      {user && (
        <div className="d-flex gap-3 my-3 justify-content-between align-items-center container">
          <UserImage user={user} />
          <UserProfileForm user={user} />
        </div>
      )}
    </>
  );
};

export default MyProfilePage;
