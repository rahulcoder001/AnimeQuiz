import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Images/logo.png"

export  function  Navbarlogo(){
    return <Link href={"/"} >
    <div className="flex items-center">
         <div>
              <Image src={logo} alt="Logo" width={50} height={50} />
         </div>
         <div className='flex lato_init font-bold md:text-2xl'>
              <p className='text-white'>Anime</p>
              <p className='text-orange-500'>Quiz</p>
         </div>
    </div>
</Link> 
}