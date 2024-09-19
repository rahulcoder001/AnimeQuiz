import Link from "next/link";


export function Smallcard({ name, id , members}: { name: string; id: number ; members:number }) {
  return (
    <Link href={`/animepage/${name}`}>
    <div className="flex flex-col md:flex-row playfair_display">
        <div className="relative mr-3 mt-28">
             <p className="md:absolute bottom-0 ml-3 md:ml-0 left-0 w-full h-full flex items-center  md:justify-center md:transform md:-rotate-90 text-orange-500 font-bold md:text-2xl">
                {name.toUpperCase()}
             </p>
        </div>
        <div className="md:bg-slate-700">
            <div className={`${name} md:h-60 md:w-40 h-52 w-32 relative m-3`}>
                 <div className="absolute right-0 top-0 font-bold text-3xl w-fit text-white bg-orange-500">
                     #{id}
                 </div>
            <div className="absolute bottom-0 font-bold text-xl m-2  bg-slate-500 bg-opacity-55 text-orange-400">
                  Members-{members}
            </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
 