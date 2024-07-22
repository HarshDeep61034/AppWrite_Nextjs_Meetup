"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { account, database, ID } from "@/app/appwrite";
import { useRouter } from "next/navigation";


export function SignupFormDemo(props: any) {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const register = async (e: any) => {
    e.preventDefault();
    console.log("Registering user with email:", email);
    try{
        setLoading((prev) => !prev);
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    }
    catch(e){
        console.error(e);
    }
    finally{
        setLoading((prev) => !prev);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    console.log(user);
    router.push("/dashboard");
    setLoggedInUser(user);
  };
  if(loading){
        return <div className="text-white text-3xl font-semibold text-center">Loading...</div>
  }
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to EventHub
      </h2>

      <form className="my-8">
        <div className="flex flex-col md:flex-row w-96 space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              onChange={(e) => setName(e.target.value)}
              id="firstname"
              placeholder="Tyler"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone No</Label>
          <Input onChange={(e)=>setPhone(e.target.value)} id="phone" placeholder="+1 635-489-3456" type="number" />
        </LabelInputContainer> */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <button
          onClick={(e) => register(e)}
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="button"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <p className="dark:text-white  text-black text-sm">
          Already have an account ? {" "}
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
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
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
