"use client";

import { Fugaz_One } from "next/font/google";
import HeroButton from "./hero-button";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authentication, setAuthentication] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }

    setAuthentication(true);

    try {
      if (isRegister) {
        console.log("Signing up a user");
        await signup(email, password);
      } else {
        console.log("Logging in existing user");
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthentication(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + fugaz.className}>
        {isRegister ? "Register" : "Login"}
      </h3>

      <p>You&#39;re one step away!</p>

      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:p-3 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="email"
      ></input>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:p-3 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="password"
        type="password"
      ></input>

      <div className="max-w-[400px] w-full mx-auto">
        <HeroButton
          clickHandler={handleSubmit}
          text={authentication ? "submittion" : "submit"}
          full
        ></HeroButton>
      </div>

      <p className="text-center">
        {isRegister ? "Already have an account ? " : "Don't have an account ? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-500"
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
