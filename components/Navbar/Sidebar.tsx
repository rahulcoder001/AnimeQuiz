import Link from "next/link";

export function Sidebar(){
    return <div  className=' w-5/6 flex justify-between items-center'>
    <div className='flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg'><Link href={"/"}> Home </Link></div>
    <div className='flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg'><Link href={"/allanime"}> MemberShip </Link> </div>
    <div className='flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg'><Link href={"/allanime"}> Quiz </Link></div>
    <div className='flex px-2 text-sm font-semibold cursor-pointer hover:text-orange-500 hover:font-bold hover:text-lg'><Link href={"/feedback"}> Feedback </Link></div>
</div>
}