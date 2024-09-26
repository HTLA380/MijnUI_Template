"use client";

import React, { useEffect, useState } from "react";

import { formatDate } from "date-fns";
import { CURRENT_USER } from "~/_constants/NAVBAR_DATA";

const Greeting = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setTimeOfDay("morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("evening");
    }
  }, [currentTime]);

  const formattedTime = formatDate(currentTime, "h:mm a");

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
        {formattedTime}
      </h1>
      <p className="text-lg font-medium sm:text-xl md:text-2xl">
        Good {timeOfDay},{" "}
        <span className="font-inherit text-primary">{CURRENT_USER.name}</span>
      </p>
    </div>
  );
};

export default Greeting;
