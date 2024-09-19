import Link from "next/link"

interface ContainerProps {
  slide: number;
}

export function Container({ slide }: ContainerProps) {
  return (
    <div
      className="flex w-full h-96 transition-transform duration-1000   ease-in-out"
      style={{
        transform: `translateX(-${slide * 100}%)`, 
      }}
    >
      <div className=" w-full h-full flex-shrink-0 bg-gray-100 bgimagecontainer1  relative rounded-lg">
         <div className=" absolute bottom-0 flex justify-between p-2 bg-slate-800 bg-opacity-60 m-2">
             <div className="font-extrabold text-xl sm:text-2xl xl:text-4xl w-3/4  text-slate-300 ">
                Play Quiz On your Favorite  Anime
             </div>
             <div className=" flex justify-center items-center ">
               <button className="font-bold text-white p-3 px-5  rounded-2xl text-sm sm:text-lg  xl:text-xl bg-orange-600 hover:bg-orange-500 hover:px-6 hover:p-4"> <Link href={"/allanime"}>Play Now</Link> </button>
             </div>
             <div>
             </div>
         </div>
       </div>
<div className="w-full h-full flex-shrink-0 bg-gray-100 bgimagecontainer2  relative rounded-lg"> 
         <div className=" absolute bottom-0 flex justify-between p-2 bg-slate-800 bg-opacity-60 m-2">
             <div className="font-extrabold text-xl sm:text-2xl xl:text-4xl w-3/4  text-slate-300 ">
                Answer the question to increase your fan Level 
             </div>
             <div className=" flex justify-center items-center ">
               <button className="font-bold text-white p-3 px-4  rounded-2xl text-sm sm:text-lg xl:text-xl bg-orange-600 hover:bg-orange-500 hover:px-5 hover:p-4"><Link href={"/allanime"}>Answer Now</Link></button>
             </div>
             <div>
             </div>
         </div>
        </div>
<div className="w-full h-full flex-shrink-0 bg-gray-100 bgimagecontainer3 relative rounded-lg">
             <div className=" absolute bottom-0 flex justify-between p-2 bg-slate-800 bg-opacity-60 m-2">
                <div className="font-extrabold text-xl sm:text-2xl xl:text-4xl w-3/4  text-slate-300 ">
                     Buy membership to make your Anime Top
             </div>
             <div className=" flex justify-center items-center ">
               <button className="font-bold text-white p-3 px-3  rounded-2xl text-sm sm:text-lg  xl:text-xl bg-orange-600 hover:bg-orange-500 hover:px-4 hover:p-4"><Link href={"/allanime"}>Buy Membership</Link></button>
             </div>
             <div>
             </div>
         </div>
         </div>
<div className=" w-full h-full flex-shrink-0 bg-gray-100 bgimagecontainer4 relative rounded-lg">
       <div className=" absolute bottom-0 flex justify-between p-2 bg-slate-800 bg-opacity-60 m-2">
             <div className="font-extrabold text-xl sm:text-2xl xl:text-4xl w-3/4  text-slate-300 ">
                Give Feedback to add Quiz on your Favorite Anime
             </div>
             <div className=" flex justify-center items-center ">
               <button className="font-bold text-white p-3 px-3  rounded-2xl text-sm sm:text-lg  xl:text-xl bg-orange-600 hover:bg-orange-500 hover:px-4 hover:p-4"><Link href={"/feedback"}>Give FeedBack</Link></button>
             </div>
             <div>
             </div>
         </div>
     </div>
    </div>
  );
}
