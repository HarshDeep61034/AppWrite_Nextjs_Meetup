"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Client, Account } from "appwrite"; // Import Appwrite client and account
import { account } from "../appwrite";
import {
  BadmintonIcon,
  MusicNote01Icon,
  PaintBrush01Icon,
  SwimmingIcon,
} from "hugeicons-react";
import { ExpandableCardDemo } from "@/components/ExpandableCard";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="w-screen h-screen overflow-y-auto">
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    account
      .getSession("current")
      .then((response) => {
        setUser(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="flex w-full min-h-screen flex-1 overflow-y-auto">
      <div className="border-l-4 border-neutral-200">
        <div className="md:mx-96">
          <h1 className="text-4xl font-bold text-neutral-700 my-4">
            Discover Events
          </h1>
          <p className="text-sm w-full mx-1 md:w-3/4">
            Every week, we feature some of our favorite events in cities like
            New York and London. You can also check out some great calendars
            from the community.
          </p>
          <h1 className="md:text-3xl text-xl mx-2 font-medium text-neutral-700 my-4">
            Buzzing Event Groups near you
          </h1>
          <div className="w-full sm:w-3/4 transition-all duration-400 flex flex-wrap">
            <div className="flex hover:bg-neutral-100 cursor-pointer m-2 bg-neutral-200 border-neutral-300 border-2 items-center px-4 py-3 rounded-xl w-full sm:w-auto">
              <div className="p-3">
                <BadmintonIcon size={35} />
              </div>
              <div>
                <div>Badminton Events</div>
                <div>15 Events</div>
              </div>
            </div>

            <div className="flex hover:bg-neutral-100 cursor-pointer m-2 bg-neutral-200 border-neutral-300 border-2 items-center px-4 py-3 rounded-xl w-full sm:w-auto">
              <div className="p-3">
                <SwimmingIcon size={35} />
              </div>
              <div>
                <div>Swimming Events</div>
                <div>8 Events</div>
              </div>
            </div>

            <div className="flex hover:bg-neutral-100 cursor-pointer m-2 bg-neutral-200 border-neutral-300 border-2 items-center px-4 py-3 rounded-xl w-full sm:w-auto">
              <div className="p-3">
                <PaintBrush01Icon size={35} />
              </div>
              <div>
                <div>Art Events</div>
                <div>27 Events</div>
              </div>
            </div>

            <div className="flex hover:bg-neutral-100 cursor-pointer m-2 bg-neutral-200 border-neutral-300 border-2 items-center px-4 py-3 rounded-xl w-full sm:w-auto">
              <div className="p-3">
                <MusicNote01Icon size={35} />
              </div>
              <div>
                <div>Music Events</div>
                <div>20 Events</div>
              </div>
            </div>
          </div>

          <h1 className="md:text-3xl text-2xl mx-2 font-semibold text-neutral-700 my-4">
            Trending Public Events near you
          </h1>
          <div className="relative md:right-44">
          <ExpandableCardDemo />
          </div>
        </div>
      </div>
    </div>
  );
};
