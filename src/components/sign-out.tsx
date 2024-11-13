"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import HeroButton from "./hero-button";
import Link from "next/link";

export default function SignOut() {
  const { logout, currentUser } = useAuth();
  const pathname = usePathname();

  if (!currentUser) {
    return null;
  }

  if (pathname === "/") {
    return (
      <Link href={"/dashboard"}>
        <HeroButton text="Go to dashboard"></HeroButton>
      </Link>
    );
  }
  return <HeroButton text="Logout" clickHandler={logout}></HeroButton>;
}
