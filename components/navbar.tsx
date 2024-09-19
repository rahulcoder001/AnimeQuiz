"use client"
import { useState } from 'react';
import ClosedIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';
import { Navbarlogo } from './Navbar/Logo';
import { Navbarsearch } from './Navbar/Search';
import { Navbarright } from './Navbar/Rightpart';
import { Smallsearch } from './Navbar/Mobilesearch';
import { Sidebar } from './Navbar/Sidebar';
import { Profile } from './Navbar/Profile';


export function NavBar() {
    const session = useSession();
    const [search , setSearch] = useState(false);
    const [sidebar , setSidebar] = useState(false);
    const [profile , setprofile] = useState(false);
    const userr = session.data?.user||'';
    return (
        <div className='lato_init'>
           <div className="w-full h-14 flex items-center lato_init justify-between p-2">
            <Navbarlogo/> 
            <Navbarsearch/>
            <Navbarright setSearch={setSearch} setprofile={setprofile} setSidebar={setSidebar} userr={userr} />
            </div>
            <div className={`${search?"flex":"hidden"} absolute w-full justify-center h-14 bg-gray-500 bg-opacity-30 p-2`}>
                 <div className='flex items-center w-1/5 text-white' onClick={()=>{setSearch(false); setSidebar(false); setprofile(false)}}  > <ClosedIcon /></div>
                 <Smallsearch/>
            </div>
            <div className={`${profile?"flex flex-col":"hidden"} w-1/2 sm:w-1/3 lg:w-1/4 justify-center z-10 absolute bg-black text-white bg-opacity-90 right-0 p-1`}>
            <div className='flex items-center w-1/6 text-white' onClick={()=>{setSearch(false); setSidebar(false); setprofile(false)}}  > <ClosedIcon /></div>
                <Profile setprofile={setprofile} userr={userr} />
            </div>
            <div className={`${sidebar?"flex flex-col":"hidden"} absolute w-full justify-center h-14 bg-black text-white font-semibold bg-opacity-80 p-2`}>
                 <div className='flex items-center w-1/6 text-white' onClick={()=>{setSearch(false); setSidebar(false); setprofile(false)}}  > <ClosedIcon /></div>
                 <Sidebar/>
            </div>
        </div>
        
    );
}
