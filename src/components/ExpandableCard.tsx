"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Location01Icon } from "hugeicons-react";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold  dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 mx-4 my-5 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-900 bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800  dark:text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="dark:text-neutral-400 text-white flex text-center md:text-left"
                >
                  <Location01Icon size={20} /> {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
const cards = [
    {
      description: "Toronto",
      title: "Canada's Electronic Music Experience",
      src: "https://github.com/shadcn.png",
      ctaText: "Show Details",
      ctaLink: "https://shambhalamusicfestival.com",
      content: () => {
        return (
          <p>
            Immerse yourself in a magical mix of music and art at the Shambhala
            Music Festival, held at Salmo River Ranch in British Columbia. As
            Canada's largest and longest-running electronic music festival,
            Shambhala has established itself as a paradise for electronic music
            enthusiasts. 
   
   With a diverse lineup of DJs and producers
            from around the world, the festival offers a unique opportunity to
            discover new sounds and create unforgettable memories. Shambhala is
            renowned for its vibrant community, stunning natural backdrop, and
            commitment to sustainability.
          </p>
        );
      },
    },
    {
      description: "Toronto",
      title: "NXNW Festival",
      src: "https://github.com/shadcn.png",
      ctaText: "Show Details",
      ctaLink: "https://nxnwfestival.com",
      content: () => {
        return (
          <p>
            NXNW Festival in Toronto, Ontario, is the place to be for music
            enthusiasts. Following in the footsteps of SXSW, NXNW showcases a
            diverse range of musical talent and has launched the careers of many
            acclaimed artists. 
   
   From hip-hop to indie rock, NXNW
            offers a platform for both established and up-and-coming artists.
            The city itself, known for its vibrant music venues and festivals,
            provides a perfect backdrop for an unforgettable musical experience.
            Discover why Toronto is a powerhouse in the Canadian music industry!
          </p>
        );
      },
    },
    {
      description: "Vancouver",
      title: "Taste of Country",
      src: "https://github.com/shadcn.png",
      ctaText: "Show Details",
      ctaLink: "https://calgarystampede.com",
      content: () => {
        return (
          <p>
            Calgary comes alive with the spirit of country music during the
            world-famous Calgary Stampede. This iconic event showcases the best
            of country music alongside thrilling rodeo action and western
            hospitality. 
   
   From established country stars to rising
            talents, the Calgary Stampede offers a diverse musical experience.
            Enjoy the energetic atmosphere, indulge in delicious treats, and
            stomp your boots to the rhythm of country music in the heart of
            Calgary, Alberta.
          </p>
        );
      },
    },
    {
      description: "Calgary",
      title: "A Jazz Journey",
      src: "https://github.com/shadcn.png",
      ctaText: "Show Details",
      ctaLink: "https://montrealjazzfest.com",
      content: () => {
        return (
          <p>
            The Montreal International Jazz Festival takes over the vibrant city
            of Montreal, Quebec. For a jazz enthusiast, this festival is a
            dream come true. 
   
   Showcasing a diverse range of jazz
            talents, from established legends to emerging artists, the festival
            offers something for every taste. Montreal's lively atmosphere and
            rich cultural heritage provide the perfect setting for an
            unforgettable jazz journey in the heart of Canada.
          </p>
        );
      },
    },
    {
      description: "Winnipeg",
      title: "Folk on the West Coast",
      src: "https://github.com/shadcn.png",
      ctaText: "Show Details",
      ctaLink: "https://vancouverfolkfestival.com",
      content: () => {
        return (
          <p>
            The Vancouver Folk Music Festival celebrates the best of folk music
            in a stunning West Coast setting. Held annually, the festival
            attracts folk enthusiasts from near and far. 
   
   With a
            diverse lineup of local and international artists, the festival
            offers a unique blend of traditional and contemporary folk sounds.
            Set against the backdrop of Vancouver's natural beauty, it's an
            experience that combines music and nature seamlessly.
          </p>
        );
      },
    },
  ];