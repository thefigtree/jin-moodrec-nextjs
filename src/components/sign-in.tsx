import { Fugaz_One } from "next/font/google";
import HeroButton from "./hero-button";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function SignIn() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        Login / Register
      </h3>

      <p>You&#39;re one step away!</p>

      <input
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:p-3 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="email"
      ></input>
      <input
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:p-3 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="password"
        type="password"
      ></input>

      <div className="max-w-[400px] w-full mx-auto">
        <HeroButton text="submit" full></HeroButton>
      </div>

      <p className="text-center">
        Don&#39;t have an account ?{" "}
        <span className="text-indigo-500">Sign Up</span>
      </p>
    </div>
  );
}
