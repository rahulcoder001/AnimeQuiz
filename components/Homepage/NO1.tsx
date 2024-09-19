"use client";
import { useEffect, useState } from "react";
import { Animecard } from "./Animecard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { MembershipAdding } from "@/helper/membership";
import Image from "next/image";
import loaderimg from '/public/Images/loader--.gif'

export function NOone() {
  const [animelist, setAnimelist] = useState<any[]>([]); // Adjust the type according to your data
  const router = useRouter();
  const session = useSession();
  const [loder , setLododer] = useState(false);
  const userr = session.data?.user;
  async function getList() {
    try {
      const response = await axios.get("/api/Anime/getanimelist");
      setAnimelist(response.data.list);
    } catch (error) {
      console.error("Error fetching anime list:", error);
      // Optionally handle errors
    }
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
  useEffect(() => {
    getList();
  }, []);

  if (animelist.length === 0) {
    // Render a loading state or placeholder
    return <div>Loading...</div>;
  }
  if(loder){
    return <Image src={loaderimg} alt='loading..' />
  }
  return (
    <div className="w-full mt-20">
      <div className="text-white mx-10 mt-10 text-4xl font-extrabold flex">
        <div className="w-2 bg-orange-600 mr-3"></div>
        AT TOP 1
      </div>
      <div className="flex sm:flex-row flex-col items-center">
        <div className="sm:w-2/3 w-full m-5 p-4">
          <Animecard clasname={animelist[0].Anime} />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white">
            {animelist[0].Anime} #1
            <div className="bg-orange-500 shadow-md h-3"></div>
          </div>
          <p className="font-bold text-xl md:text-2xl text-white p-2 mt-10">No of Members, {animelist[0].Membership}</p>
          <button onClick={()=>{router.push(`/Quiz/${animelist[0].Question}`)}} className="font-semibold text-sm md:text-xl w-3/5 text-white bg-orange-500 bg-opacity-90 m-4 p-2 rounded-lg hover:bg-orange-400">Play Quiz</button>
          <button onClick={()=>{Membership({animeName:animelist[0].Anime})}} className="font-semibold text-sm md:text-xl w-3/5 text-white bg-orange-500 bg-opacity-90 m-4 p-2 rounded-lg hover:bg-orange-400">Membership ₹50</button>
        </div>
      </div>
    </div>
  );
}
