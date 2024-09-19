"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Person2SharpIcon from '@mui/icons-material/Person2Sharp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface Profileprops {
    setprofile: (value: boolean) => void;
    userr?: any
  }

export function Profile({setprofile ,  userr}: Profileprops){
  const router = useRouter();
    const [totalquestion, setTotalquestion] = useState<any>(0);

  

    async function finduser() {
      if(userr.id){
        const res = await axios.post("/api/getuser", {
            userId: userr.id,
        });
        setTotalquestion(res.data.totalQuestions);
      }
  }
  finduser();

    

    function leveloffan(num:number){
      if(num<10){
        return "Beginner";
      }
      else if(num>=10 && num<50){
        return "Average"
      }
      else if(num>=50 && num<100){
        return "GOOD"
      }
      else if(num>=100 && num<150){
        return "Knowledgeble"
      }
      else if(num>=150 && num<200){
        return "Great knowledgeble"
      }
      else if(num>=200 && num<200){
        return "Master"
      }
      else if(num>=300 && num<500){
        return "GOAT"
      }
      else{
        return "GOD"
      }
    }

    return <div className="w-full">
             <div  className='w-full flex justify-between items-center'>
    {userr?
    <div className="flex items-center justify-center w-full">
      <div className="m-3 w-full">
        <div className="flex w-full items-center justify-center flex-col border-b-2">
        
  <Image 
    src={userr.image} 
    alt="userlogo" 
    width={80} 
    height={100} 
    className=" w-20 h-20 rounded-full" 
  />

        <p className="p-2">{userr.name}</p>
        </div>
         <div className="p-2 border-b-2">
           <p onClick={()=>{
            setprofile(false);
            router.push("/Profile");
            }} className="cursor-pointer hover:text-orange-500 hover:underline flex items-center m-2"> <span className="mr-3"><Person2SharpIcon/></span>  Your Profile</p>
           <p onClick={()=>{
            setprofile(false);
            router.push("/editprofile");
            }} className="cursor-pointer hover:text-orange-500 hover:underline flex items-center m-2"> <span className="mr-3"><BorderColorIcon/></span>   Edit Your Profile</p>
           <p className="m-2"> <span className="mr-3"><QuizIcon/></span> Solved Question <span className="text-orange-500">{totalquestion}</span></p>
           <p className="m-2"> <span className="mr-3"><StarIcon/></span>Anime-Lover <span className="text-orange-500">{leveloffan(totalquestion)}</span></p>
         </div>
         <button onClick={()=>{
          signOut();
          router.push("/");
          }} className=" w-full p-2 mt-5 font-bold rounded-lg bg-orange-500">Logout</button>
         
      </div>
    </div>
    
    :
    <div className='flex flex-col p-2 justify-between w-full '>
     <div className='font-semibold text-sm'>You should login to see your account</div>
     <div>
     <button onClick={()=>{setprofile(false)}} className='px-4 p-1 rounded-xl bg-orange-500 text-white mt-10'><Link href={"/signin"} >Login</Link></button>
     </div>
    </div>
    }
</div>
    </div>

}