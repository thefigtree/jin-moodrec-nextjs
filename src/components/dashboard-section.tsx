"use client";

import { Fugaz_One } from "next/font/google";
import HeroCalendar from "./hero-calendar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import SignIn from "./sign-in";
import Loading from "./loading";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function DashboardSection() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {}

  async function handleMood(mood) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      // 현재 상태 업데이트
      setData(newData);
      // 전역 상태 업데이트
      setUserDataObj(newData);
      // 데이터베이스 업데이트
      const docRef = doc(db, "user", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("데이터를 불러오지 못했습니다.");
    }
  }

  const statues = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "$%^&*": "🤪",
    Sad: "🥲",
    Existing: "😶",
    Good: "😆",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!currentUser) {
    return <SignIn></SignIn>;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-indigo-50 text-indigo-500">
        {Object.keys(statues).map((status, index) => {
          return (
            <div key={index} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm">
                {status.replaceAll("_", "")}
              </p>
              <p className={"text-base sm:text-lg " + fugaz.className}>
                {statues[status]}
              </p>
            </div>
          );
        })}
      </div>

      <h4
        className={
          "text-4xl sm:text-5xl md:text-6xl text-center " + fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today ?
      </h4>

      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleMood(currentMoodValue);
              }}
              className={
                "p-4 px-5 rounded-2xl pupleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center flex-1 "
              }
              key={moodIndex}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">{moods[mood]}</p>
              <p
                className={
                  "text-indigo-500 text-xs sm:text-sm md:text-base " +
                  fugaz.className
                }
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>

      <HeroCalendar data={data} handleMood={handleMood}></HeroCalendar>
    </div>
  );
}
