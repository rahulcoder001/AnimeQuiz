
import SearchIcon from '@mui/icons-material/SearchRounded';
import { AnimeSearch } from './SearchAnime';
import ClosedIcon from '@mui/icons-material/Close';
import { useState } from 'react';
export function Smallsearch(){
     const [filter, setFilter] = useState("");

  return (
    <div className='relative w-2/3 z-20'>
      <div className='w-full flex justify-between'>
        <div className='w-4/5 rounded-l-full bg-white'>
          <input
            type="text"
            className='w-full p-2 outline-none ml-5'
            placeholder='Search anime for the Quiz...'
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className='w-1/5 rounded-r-full border-black p-1 flex justify-center items-center bg-orange-500 font-bold text-white'>
          <button className='flex'>
            <SearchIcon />
            <p className='xl:ml-2 hidden xl:block'>Search</p>
          </button>
        </div>
      </div>
      <div className={`absolute top-14 left-0 w-full ${filter ? "block" : "hidden"} bg-white shadow-lg rounded-lg`}>
        <div className='flex justify-between p-2'>
          <AnimeSearch filter={filter} setfilter={setFilter} />
          <div className='ml-2 cursor-pointer text-gray-500' onClick={() => setFilter("")}>
            <ClosedIcon />
          </div>
        </div>
      </div>
    </div>
  );
}