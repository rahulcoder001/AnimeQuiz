"use client";

import { MembershipAdding } from '@/helper/membership';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const AnimePage = () => {
  const { data: session, status } = useSession();
  const userr: any = session?.user;
  const pathname = usePathname() || "";
  const segments = pathname.split('/').filter(Boolean);
  const animeid = segments[segments.length - 1];
  const [loader, setLoader] = useState(true);
  const [anime, setAnime] = useState<any>(null);
  const [totalQuestion, setTotalQuestion] = useState<any>(0);
  const [solvedQuestion, setSolvedQuestion] = useState<any>(0);
  const router = useRouter();

  const getAnime = useCallback(async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/api/Anime/findanime?id=${animeid}`);
      setAnime(response.data.anime[0]);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoader(false);
    }
  }, [animeid]);

  const getQuestion = useCallback(async () => {
    if (anime) {
      try {
        const response = await axios.get(`/api/Anime/getquestion?id=${anime.Question}`);
        setTotalQuestion(response.data.length);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
  }, [anime]);

  const findUser = useCallback(async () => {
    if (userr?.id) {
      try {
        const res = await axios.post("/api/getuser", {
          userId: userr.id,
        });
        setSolvedQuestion(res.data.totalQuestions);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [userr]);

  const getList = useCallback(async () => {
    if (!userr || !userr.id || !anime) {
      toast.error("User or Anime data is not available");
      return;
    }

    try {
      const response = await axios.post(`/api/Anime/getuseranimelist`, {
        userId: userr.id,
        anime: anime.Anime,
      });
      setSolvedQuestion(response.data.question.length);
    } catch (error) {
      toast.error("Error fetching user anime list");
      console.error("Error fetching user anime list:", error);
    }
  }, [userr, anime]);

  useEffect(() => {
    getAnime();
  }, [getAnime]);

  useEffect(() => {
    if (anime) {
      getQuestion();
      if (userr?.id) {
        findUser();
        getList();
      }
    }
  }, [anime, userr?.id, getQuestion, findUser, getList]);

  const handleMembership = async () => {
    setLoader(true);
    // const userId = userr?.id;
    // const animeName = anime?.Anime;

    // if (userId && animeName) {
    //   await MembershipAdding({ userid: userId, anime: animeName });
    //   getAnime();
    //   toast.success("Membership added successfully");
    // } else {
    //   toast.error("User ID or Anime is not defined");
    // }
    router.push("/Membership");
    setLoader(false);
  };

  if (status === 'loading' || loader) {
    return (
      <div className='text-7xl text-white'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='text-white mt-20'>
      <div className='flex sm:flex-row flex-col items-center sm:items-start'>
        <div className='w-1/2 sm:w-1/4 flex justify-center flex-col items-center'>
          <div className={` ${anime?.Anime} sm:w-3/5 w-full h-64 sm:p-5 rounded-lg`}></div>
          <p className='text-2xl font-bold text-orange-500 mt-5'>Members - {anime?.Membership}</p>
        </div>
        <div className='sm:mt-0 mt-10 sm:w-3/4 '>
          <div className='px-3 sm:px-10'>
            <p className='font-extrabold text-5xl sm:text-7xl mb-5 flex justify-center sm:justify-normal'>{anime?.Anime}</p>
            <div className='flex justify-center sm:justify-normal'>
              <span className='font-bold text-xs mt-5 border-2 p-1'>Total Questions - {totalQuestion}</span>
              <span className='font-bold text-xs mt-5 border-2 ml-2 sm:ml-5 p-1 text-orange-500'>Solved Questions - {solvedQuestion}</span>
            </div>
            <div className='mt-5 flex justify-center sm:justify-normal'>
              <button onClick={() => { router.push(`/Quiz/${anime?.Question}`) }} className='border-2 p-2 rounded-lg font-bold hover:bg-orange-500 hover:border-none'>Start Quiz</button>
              <button onClick={handleMembership} className='border-2 p-2 ml-5 rounded-lg font-bold hover:bg-orange-500 hover:border-none'>Membership</button>
            </div>
            <p className='mt-28 sm:w-3/5 playfair_display'>{anime?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
