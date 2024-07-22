"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { account, ID } from "@/app/appwrite";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function SignupFormDemo(props: any) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [authMethod, setAuthMethod] = useState("email");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendOTP = async (e: any) => {
    e.preventDefault();
    try {
      if (authMethod === "email") {
        console.log("Sending OTP to email:", email);
        const sessionToken = await account.createEmailToken(ID.unique(), email);
        setUserId(sessionToken.userId);
      } else if (authMethod === "phone") {
        console.log("Sending OTP to phone:", phone);
        const formattedPhone = `+${phone.replace(/[^0-9]/g, "")}`;
        const sessionToken = await account.createPhoneToken(ID.unique(), formattedPhone);
        setUserId(sessionToken.userId);
      }
    } catch (e) {
      console.error("Error sending OTP:", e);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const session = await account.createSession(userId, otp);
      await account.updateName(name);
      await account.updatePassword(password);
      router.push("/dashboard");
    } catch (e) {
      console.error("Error logging in:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-3xl font-semibold text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to EventHub
      </h2>

      <form className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="John Doe"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <div className="flex flex-col md:flex-row w-96 space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <RadioGroup defaultValue="email" onValueChange={setAuthMethod}>
            <p>Choose method for Authentication</p>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone">Phone</Label>
            </div>
          </RadioGroup>
        </div>
        {authMethod === "email" && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
        )}
        {authMethod === "phone" && (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone No</Label>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              placeholder="+1 635-489-3456"
              type="tel"
            />
          </LabelInputContainer>
        )}
        <button
          onClick={sendOTP}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="button"
        >
          Send OTP &rarr;
          <BottomGradient />
        </button>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="otp">OTP</Label>
          <Input
            onChange={(e) => setOTP(e.target.value)}
            id="otp"
            placeholder="••••••••"
            type="text"
          />
        </LabelInputContainer>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="button"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <p className="dark:text-white text-black text-sm">
          Already have an account?{" "}
          <button
            className="font-semibold py-4 text-center hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
