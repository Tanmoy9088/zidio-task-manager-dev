import TextBox from "./Textbox";
import Button from "./Button";
import React from "react";
import { navigate, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen bg-blue-100 flex justify-center items-center ">
      <div className="h-96 w-[400px] bg-white flex items-center rounded-md">
        <form className="w-full flex justify-center flex-col gap-10">
          {/* <TextBox placeholder="Old password"
           className="w-full rounded-full" /> */}
          <TextBox  placeholder="New password" className="w-full rounded-full" />
          <TextBox  placeholder="Re-type new password" className="w-full rounded-full" />
          <Button
            label="Update Password"
            className="w-full h-10 bg-blue-700 text-white rounded-full mt-20"
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
