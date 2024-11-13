"use client";

import Link from "next/link";
import HeroButton from "./hero-button";
import { useAuth } from "../context/AuthContext";

export default function Action() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="max-w-[600px] mx-auto w-full">
        <Link href={"/dashboard"}>
          <HeroButton dark full text="Go to dashboard" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={"/dashboard"}>
        <HeroButton text="Sign Up" />
      </Link>
      <Link href={"/dashboard"}>
        <HeroButton text="Login" dark />
      </Link>
    </div>
  );
}
