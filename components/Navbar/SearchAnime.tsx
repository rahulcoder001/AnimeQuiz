"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AnimeSearch({filter , setfilter}:any) {
  const [animelist, setAnimelist] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getList() {
      try {
        const response = await axios.get(`/api/Anime/searchAnime?filter=${filter}`);
        setAnimelist(response.data.list);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    }
    getList();
  }, [filter]);

  return (
      <div className="w-full">
        {animelist.length > 0 ? (
          <div className="w-full flex flex-col cursor-pointer">
            {animelist.map((item, i) => (
               <div key={i} onClick={()=>{
                router.push(`/animepage/${item.Anime}`)
                setfilter("");
                }} className="flex w-full xl:p-3 xl:m-3 m-1">
                <div className={`${item.Anime} w-10 h-10 xl:w-20 xl:h-20 rounded-full`}></div>
                <div className="xl:mt-5 ml-1 xl:ml-5">
                 <div className="font-bold  xl:text-lg">{item.Anime}</div>
                 <div className="flex text-xs xl:text-sm">
                    <p>Members - {item.Membership}</p>
                    <p className="hover:text-orange-500 hover:underline ml-2 xl:ml-5">Play now</p>
                 </div>
                </div>
               </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center">No anime found.</div>
        )}
      </div>
  );
}
