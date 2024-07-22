"use client";

import { account } from "@/app/appwrite";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    async function logout() {
      await account.deleteSession("current");
    }
    logout();
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
}
