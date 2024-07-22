"use client";
import { SignupFormDemo } from "@/components/SignUpForm";

const LoginPage = () => {

  return (
    <div className="w-screen bg-black h-screen flex justify-center items-center" >
      <div className="text-black">
        <p>Not logged in</p>
      <SignupFormDemo />
      </div>
    </div>
  );
};

export default LoginPage;
