"use client"
import axios from "axios";
import { Smallcard } from "./SmallAnimecard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MembershipAdding } from "@/helper/membership";
import toast from "react-hot-toast";
import Image from "next/image";
import loaderimg from '/public/Images/loader--.gif'

  function Sideicon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
      </svg>
    );
  }

export function TopAnime(){
  const [animelist,setAnimelist] = useState([]);
  const router = useRouter();
  const session = useSession();
  const [loder , setLododer] = useState(false);
  const userr = session.data?.user;
  async function getList (){
    const response = await axios.get("/api/Anime/getanimelist");
    setAnimelist(response.data.list);
  } 

  async function Membership({animeName}:any) {
    setLododer(true);
    // const userId = userr?.id;  
    
    // if (userId && animeName) {
    //   await MembershipAdding({ userid: userId, anime: animeName });
    //   toast.success("membership added successfully")
    //   getList();
    // } else {
    //   toast.error("User ID or Anime is not defined");
    // }
    router.push("/Membership")
    setLododer(false);
  }

  useEffect(()=>{
    getList();
  },[]);

  if (animelist.length === 0) {
    return <div>Loading...</div>;
  }

  if(loder){
    return <Image src={loaderimg} alt='loading..' />
  }


    return (
        <div className="w-full mt-20">
        <div className="flex text-3xl text-orange-500 xl:mx-36 m-3 lg:mx-20 md:mx-14 sm:mx-10 font-bold">
          <div className=" w-2 mr-3 bg-white"></div>
          TOP ANNIME
        </div>
        <div className="w-full border-white grid grid-cols-2 md:grid-cols-3 gap-4">
          {animelist.slice(1, 7).map((item:any, i) => (
            <div key={i} className="text-white sm:m-5 m-3 flex xl:mx-36 md:mx-10 lg:mx-20 flex-col">
              {/* @ts-ignore */}
              <Smallcard name={item.Anime} id={(i+2)} members={item.Membership} />
              <button onClick={()=>{router.push(`/Quiz/${item.Question}`)}} className="p-2 w-32 md:w-40 ml-3  m-2 font-semibold bg-slate-400 hover:bg-slate-500 bg-opacity-50 rounded-lg">Play Quiz</button>
              <button onClick={()=>{Membership({animeName:item.Anime})}}className="p-2 w-32 md:w-40 ml-3  m-2 font-semibold bg-slate-400 hover:bg-slate-500 bg-opacity-50 rounded-lg">Membership</button>
            </div>
          ))}
          <button onClick={()=>{router.push("/allanime")}} className="xl:mx-36 lg:mx-20 md:mx-14 sm:mx-10 m-3 bg-orange-600 p-2 text-white font-bold w-36 text-xl underline flex justify-center items-center mb-10">See All <Sideicon/></button>
        </div>
      </div>
    )
}