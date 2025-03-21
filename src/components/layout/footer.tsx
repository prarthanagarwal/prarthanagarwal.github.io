import { useEffect, useState } from "react";
import Image from "next/image";

export default function Footer() {
  const [time, setTime] = useState("");
  const [hour, setHour] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    // Set initial values
    updateTime();
    setIsVisible(true);

    // Update the time every minute and blink the colon
    const timeInterval = setInterval(updateTime, 60000);
    const colonInterval = setInterval(() => {
      setColonVisible(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(colonInterval);
    };
  }, []);

  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    setHour(hours);

    const timeString = `Surat, India ${hours > 12 ? hours - 12 : hours}${colonVisible ? ':' : ' '}${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    setTime(timeString);
  }

  function getTimeIcon() {
    if (hour >= 6 && hour < 12) {
      return "/morning-icon.svg";
    } else if (hour >= 12 && hour < 18) {
      return "/afternoon-icon.svg";
    } else {
      return "/night-icon.svg";
    }
  }

  return (
    <footer className="pt-8">
      <hr className="h-px border-0 bg-title" />
      <div className="mx-1 flex items-center justify-between pt-4 md:mx-3">
        <span className="text-xs text-body">© 2024 Prarthan Agarwal</span>
        <div
          className="flex items-center gap-2"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div style={{ opacity: 1, transform: "none" }}>
            <Image
              alt={`${hour >= 12 && hour < 18 ? 'Afternoon' : hour >= 6 && hour < 12 ? 'Morning' : 'Night'} Icon`}
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
