"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [now, setNow] = useState(new Date());
  const [colonVisible, setColonVisible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeInterval = setInterval(() => setNow(new Date()), 60000);
    const colonInterval = setInterval(() => {
      setColonVisible((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(colonInterval);
    };
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const separator = colonVisible ? ":" : " ";
  const period = hours >= 12 ? "PM" : "AM";
  const time = `Surat, India ${displayHour}${separator}${minutes.toString().padStart(2, "0")} ${period}`;

  function getTimeIcon() {
    if (hours >= 6 && hours < 12) {
      return "/icons_extra/morning-icon.svg";
    } else if (hours >= 12 && hours < 18) {
      return "/icons_extra/afternoon-icon.svg";
    } else {
      return "/icons_extra/night-icon.svg";
    }
  }

  const timeOfDay =
    hours >= 12 && hours < 18
      ? "Afternoon"
      : hours >= 6 && hours < 12
        ? "Morning"
        : "Night";

  return (
    <footer className="pt-4 pb-2">
      <hr className="h-px border-0 bg-title" />
      <div className="flex items-center justify-between pt-3">
        <span className="text-xs text-body">
          &copy; {new Date().getFullYear()} Prarthan Agarwal
        </span>
        <div
          className="flex items-center gap-2"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div style={{ opacity: 1, transform: "none" }}>
            <Image
              alt={`${timeOfDay} Icon`}
              width={12}
              height={13}
              src={getTimeIcon()}
            />
          </div>
          <span
            className="text-xs text-body transition duration-150"
            style={{ opacity: 1 }}
          >
            {time}
          </span>
        </div>
      </div>
    </footer>
  );
}
