"use client"
import Image from 'next/image';
import newslogo from "../../public/Images/newsside.png";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';




export function NewsComponent(){
  const router = useRouter();
   const [news , setNews] = useState<any>(null);
   useEffect(()=>{
      async function findnews(){
         const response = await axios.get("/api/news");
         setNews(response.data.news);
      }
      findnews();
   },[])

    return (
        <div className="w-full mt-20">
        <div className="flex  ml-10">
          <div className="bg-white w-2 mr-2"></div>
          <p className="font-bold text-orange-500 text-4xl">News</p>

        </div>
      <div className="w-full mt-20 h-56 flex relative newsbackground">
        
          <div className="w-1/4 h-full flex items-center justify-center absolute z-10 right-0 newsbackground">
            <Image src={newslogo} alt="Logo" className="h-full object-contain mt-7" />
          </div>
        
        
        <div className="overflow-hidden ml-1/4 h-full w-full relative">
          <div className="flex animate-scroll h-52 items-center">
            {news && news.map((item:any, index:number) => (
              <div key={index} className="flex-shrink-0 m-4 p-2 newsbackground lg:w-1/4 sm:w-1/3 w-1/2 xl:w-1/5 text-white h-full">
                <Link href={`/animepage/${item.author}`}><div className={`${item.author} w-full h-2/3`}></div></Link>
                  
                  <div>
                    <p className="font-semibold text-sm text-orange-500">{item.author}</p>
                    <p className="playfair_display text-xs md:text-base ">{item.title}</p>
                    <button onClick={()=>{router.push(`/animepage/${item.author}`)}} className=" m-1 p-1 md:p-2 text-xs rounded-lg bg-orange-500 hover:bg-orange-400">Play Now</button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    )
}