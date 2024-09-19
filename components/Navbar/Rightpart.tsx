import SearchIcon from '@mui/icons-material/SearchRounded';
import Image from 'next/image';
import UserIcon from '@mui/icons-material/AccountCircleRounded';
import SideIcon from '@mui/icons-material/ViewSidebarRounded';
import Link from 'next/link';

interface NavbarrightProps {
  setSearch: (value: boolean) => void;
  setSidebar: (value: boolean) => void;
  setprofile: (value: boolean) => void;
  userr?: any
}

export function Navbarright({ setSearch, setSidebar, setprofile, userr }: NavbarrightProps) {
  return (
    <div className="text-white flex p-2">
      <div
        className="md:hidden px-2 hover:text-orange-500"
        onClick={() => {
          setSearch(true);
          setSidebar(false);
          setprofile(false);
        }}
      >
        <SearchIcon />
      </div>
      <div className="hidden sm:flex">
        <div className="flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg">
          <Link href={"/"}> Home </Link> 
        </div>
        <div className="flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg">
        <Link href={"/allanime"}> MemberShip </Link> 
        </div>
        <div className="flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg">
        <Link href={"/allanime"}> Quiz </Link>
        </div>
        <div className="flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg">
        <Link href={"/feedback"}> Feedback </Link>
        </div>
      </div>
      <div
        className="sm:hidden px-2 cursor-pointer hover:text-orange-500 hover:font-bold"
        onClick={() => {
          setSearch(false);
          setSidebar(true);
          setprofile(false);
        }}
      >
        <SideIcon />
      </div>
      <div
        className="flex px-2 cursor-pointer hover:text-orange-500 hover:font-bold h-7"
        onClick={() => {
          setSearch(false);
          setSidebar(false);
          setprofile(true);
        }}
      >
        {userr ? (
          <Image src={userr.image} alt="userlogo" width={30} height={75} className="rounded-full" />
        ) : (
          <UserIcon />
        )}
      </div>
      
    </div>
  );
}
