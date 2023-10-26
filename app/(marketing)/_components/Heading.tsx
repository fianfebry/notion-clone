"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const Heading = () => {
  const [buttonOnHoover, setButtonOnHoover] = React.useState(false);
  const handleButtonHover = () => {
    setButtonOnHoover(true);
  };
  const handleButtonLeaveHover = () => {
    setButtonOnHoover(false);
  };
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents and Notes, Organized. Welcome to{" "}
        <span className="underline">Jotion.</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <Button
        className="relative"
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeaveHover}
      >
        Enter Jotion
        <ArrowRight
          className={`w-4 h-4 ml-2 ${
            buttonOnHoover ? "transform translate-x-2" : ""
          }`}
        />
      </Button>
    </div>
  );
};

export default Heading;