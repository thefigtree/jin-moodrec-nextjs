import { Fugaz_One } from "next/font/google";
import HeroButton from "./hero-button";
import HeroCalendar from "./hero-calendar";
import Link from "next/link";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function HeroSection() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-text-6xl md:text-7xl text-center " + fugaz.className
        }
      >
        <span className="textGradient">Mood Rec</span>
        <span>
          는 <span className="textGradient">매일</span> 나의 기분을 기록하는
          것을 도와 줍니다 !
        </span>
      </h1>

      <span className=" text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
        <span className="font-semibold">매일</span> 나의 기분을 기록해 보세요.
      </span>

      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Link href={"/dashboard"}>
          <HeroButton text="Sign Up"></HeroButton>
        </Link>

        <Link href={"/dashboard"}>
          <HeroButton text="Login" dark></HeroButton>
        </Link>
      </div>

      <HeroCalendar demo></HeroCalendar>
    </div>
  );
}
