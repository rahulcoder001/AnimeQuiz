import Image from 'next/image';
import lufy from "../public/Images/logo.png"
import Link from "next/link";
import twiter from "../public/Images/twiter.webp"
import linkdin from "../public/Images/linkdin.webp"
import narutologo from "../public/Images/narutologo.gif"


export function Footer(){
     return (
        <div className="w-full mt-20 bg-black text-white bg-opacity-70 flex justify-between">
            <div className="h-full">
                 <Image src={lufy} alt="logo" className=" hidden md:block h-80" />
           </div>
           <div className="w-full md:w-1/2 flex items-center justify-center p-5 md:p-2">
                <div className="playfair_display text-sm">
                     <p className="font-bold text-orange-500 text-2xl p-2 ">Important Links</p>
                     <p className="p-2">If you dont find your favorite anime then <Link className="text-orange-500 font-semibold underline" href={"/feedback"}>Give FeedBack</Link> to add your anime</p>
                     <p className="p-2">If your favorite anime are not at top then <Link className="text-orange-500 font-semibold underline" href={"/allanime"}>Take Membership</Link> to  make at top your anime</p>
                     <p className="p-2">One member can buy multiple Memberships of same animme or different Anime </p>
                     <div className="p-2 flex items-center"> 
                          <div>Follow me at </div>
                              <div className="text-orange-500 flex">
                                  <Image src={twiter} alt="twiter" width={50} height={50} className="bg-white p-2 ml-3 rounded-full" />
                                  <Image src={linkdin} alt="linkdin" width={50} height={50} className="bg-white p-2 ml-3 rounded-full" />
                              </div> 
                         </div>
                     <p className="mt-5">© 2024 Rahul Singh. All rights reserved.</p>
                </div>
           </div>
           <div className="h-full">
                 <Image src={narutologo} alt="logo" className="hidden md:block h-80 p-3" />
          </div>
       </div>
     )
}