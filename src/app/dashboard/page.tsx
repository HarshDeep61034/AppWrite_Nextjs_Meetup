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
import { account } from "../appwrite";
import {
  BadmintonIcon,
  MusicNote01Icon,
  PaintBrush01Icon,
  SwimmingIcon,
} from "hugeicons-react";

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

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

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

  const cities = [
    {
      name: "Bengaluru",
      events: 13,
      imageSrc:
        "https://cms-article.forbesindia.com/media/images/2024/Apr/img_233381_benagalurustartups.jpg",
    },
    {
      name: "Dubai",
      events: 6,
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Museum_of_Future_-_Dubai.jpg/220px-Museum_of_Future_-_Dubai.jpg",
    },
    {
      name: "Kuala Lumpur",
      events: 18,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_d_-yt0Dn-gLsN-oi_WHpQExp5uT2lMFELQ&s",
    },
    {
      name: "Melbourne",
      events: 4,
      imageSrc:
        "https://cdn.encoreglobal.com/wp-content/uploads/sites/5/2022/07/25111910/Event-Production-Melbourne-Encore-1024x683.jpg",
    },
    {
      name: "Mumbai",
      events: 6,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGjk1vg_apzeIr2bkpAI3VsfTjpAgwEQLDQ&s",
    },
    {
      name: "Singapore",
      events: 15,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfJdw-m315JfIOOx0c36BwnwDRk-FWv7qzw&s",
    },
    {
      name: "Sydney",
      events: 9,
      imageSrc:
        "https://cdn.britannica.com/71/188471-050-CF188A6B/Sydney-Opera-House-Port-Jackson.jpg",
    },
    {
      name: "Taipei",
      events: 6,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgz0HJu09-sH-082ftYhj0mxR-SXcKNMdfg&s",
    },
    {
      name: "Ho Chi Minh City",
      events: 4,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJmKW5SedFo_RehwzCEKjj0vymy-eG7iIjQ&s",
    },
    {
      name: "Hong Kong",
      events: 4,
      imageSrc:
        "https://cdn.britannica.com/44/94544-050-3195E0BF/Hong-Kong-skyline-Convention-and-Exhibition-Center.jpg",
    },
    {
      name: "Seoul",
      events: 3,
      imageSrc: "https://static.toiimg.com/photo/111258550.cms",
    },
    {
      name: "Tokyo",
      events: 18,
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3R7ytCTFGE7xS2_l7PoHTyS2MuO2QAVs63g&s",
    },
  ];

  return (
    <div className="flex w-full min-h-screen flex-1 overflow-y-auto font-sans bg-gray-50">
      <div className="container mx-auto p-4">
        <div className="md:mx-16 lg:mx-32">
          <h1 className="text-4xl font-bold text-neutral-700 my-6 text-center">
            Discover Events
          </h1>
          <p className="text-sm w-full mx-1 md:w-3/4 md:mx-auto text-center mb-6">
            Every week, we feature some of our favorite events in cities like
            New York and London. You can also check out some great calendars
            from the community.
          </p>
          <h2 className="md:text-3xl text-xl mx-2 font-medium text-neutral-700 my-6 text-center">
            Featured Cities
          </h2>
          <CityList cities={cities} />

          <h2 className="md:text-3xl text-xl mx-2 font-medium text-neutral-700 my-6 text-center">
            Buzzing Event Groups near you
          </h2>
          <div className="w-full sm:w-3/4 transition-all duration-400 flex flex-wrap justify-center mx-auto">
            <EventGroup
              title="Badminton Events"
              icon={<BadmintonIcon size={35} />}
              events={15}
            />
            <EventGroup
              title="Swimming Events"
              icon={<SwimmingIcon size={35} />}
              events={8}
            />
            <EventGroup
              title="Art Events"
              icon={<PaintBrush01Icon size={35} />}
              events={27}
            />
            <EventGroup
              title="Music Events"
              icon={<MusicNote01Icon size={35} />}
              events={20}
            />
          </div>

          <h2 className="md:text-3xl text-xl mx-2 font-medium text-neutral-700 my-6 text-center">
            Trending Public Events near you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            <Card
              title="Art Exhibition"
              description="Explore the vibrant world of contemporary art."
              icon={<PaintBrush01Icon size={35} />}
              eventsCount={5}
            />
            <Card
              title="Live Music Concert"
              description="Enjoy a night of live music performances."
              icon={<MusicNote01Icon size={35} />}
              eventsCount={12}
            />
            <Card
              title="Swimming Competition"
              description="Join the local swimming competition."
              icon={<SwimmingIcon size={35} />}
              eventsCount={3}
            />
            <Card
              title="Badminton Tournament"
              description="Compete in the annual badminton tournament."
              icon={<BadmintonIcon size={35} />}
              eventsCount={7}
            />
            <Card
              title="Cooking Class"
              description="Learn to cook delicious vegetarian dishes."
              icon={<IconSettings size={35} />}
              eventsCount={10}
            />
            <Card
              title="Tech Meetup"
              description="Network with tech enthusiasts and professionals."
              icon={<IconUserBolt size={35} />}
              eventsCount={9}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CityList = ({ cities }: any) => {
  return (
    <div className="flex flex-wrap justify-center">
      {cities.map((city: any, index: number) => (
        <div
          key={index}
          className="flex items-center w-64 m-2 bg-white border-neutral-300 border-2 p-4 rounded-lg shadow-md transition-all hover:shadow-lg"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden mr-4">
            <img
              src={city.imageSrc}
              alt={city.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-semibold">{city.name}</div>
            <div className="text-sm text-gray-600 mt-2">{city.events} Events</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EventGroup = ({ title, icon, events }: any) => {
  return (
    <div className="flex hover:bg-neutral-100 cursor-pointer m-2 bg-white border-neutral-300 border-2 items-center px-4 py-3 rounded-xl w-full sm:w-auto shadow-md transition-all hover:shadow-lg">
      <div className="p-3">{icon}</div>
      <div className="ml-2">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm text-gray-600">{events} Events</div>
      </div>
    </div>
  );
};

const Card = ({ title, description, icon, eventsCount }: any) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-xl">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">{eventsCount} Events</div>
        <button className="bg-blue-500 text-white py-1 px-3 rounded-md">
          View
        </button>
      </div>
    </div>
  );
};
