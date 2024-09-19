import Link from "next/link";

export function Animecard({clasname}:{clasname:string}) {
    return (
      <Link href={`/animepage/${clasname}`}>
      <div className="flex items-center h-96 w-full relative">
        <div className={`${clasname} rounded-lg w-full h-full relative`}>
          <div className="absolute bottom-0 w-5/6 m-5 bg-slate-700 bg-opacity-60 p-4">
            <button className="p-3 bg-orange-500 text-white rounded-lg">
              Explore Now
            </button>
          </div>
        </div>
      </div>
      </Link>
    );
  }
  