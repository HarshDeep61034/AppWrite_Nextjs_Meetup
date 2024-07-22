"use client"
import { account } from "@/app/appwrite";
import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";

export default function Login(){
    useEffect(()=>{
        account.deleteSession('current');
    }, []);
    return (
        <div>
            <LoginForm />
        </div>
    );
}