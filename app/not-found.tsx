"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const ErrorNotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h1 className="text-xl font-medium">Oops! Page Not Found</h1>
      <h2 className="text-xl font-medium">
        The page you&rsquo;re looking for isn&rsquo;t here. Let&rsquo;s get you
        back on track
      </h2>

      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default ErrorNotFound;
