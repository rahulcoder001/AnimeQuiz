"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
// import { MembershipAdding } from "@/helper/membership";
import Image from "next/image";
import loaderimg from '/public/Images/loader--.gif';
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";

const AnimeSelection = () => {
  // const { data: session } = useSession();
  const [animelist, setAnimelist] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get(`/api/Anime/searchAnime?filter=${filter}`);
        setAnimelist(response.data.list);
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };
  
    getList();
  }, [filter]);
  

 

  const handleMembership = async ({ animeName }: any) => {
    setLoader(true);
    // const userId = session?.user?.id;

    // if (userId && animeName) {
    //   await MembershipAdding({ userid: userId, anime: animeName });
    //   toast.success("Membership added successfully");
    //   getList();
    // } else {
    //   toast.error("User ID or Anime is not defined");
    // }
    router.push("/Membership");
    setLoader(false);
  };

  if (loader) {
    return <Image src={loaderimg} alt="loading..." />;
  }

  return (
    <div className="mt-20">
      <p className="flex px-5 sm:px-10 md:px-20 text-orange-500 text-4xl  md:text-6xl font-bold">
        CHOOSE ANIME
      </p>
      <div className="text-white flex px-5 sm:px-10 md:px-20 mt-5 items-center">
        <SearchIcon />
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search anime..."
          className="ml-3 w-60 md:w-72 p-2 text-sm font-semibold outline-none rounded-lg text-gray-500"
        />
      </div>
      <div className="p-5 sm:p-10 md:p-20">
        {animelist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {animelist.map((item, i) => (
              <div key={i} className="flex flex-col m-5 rounded-lg shadow-lg">
                <div
                  onClick={() => {
                    router.push(`/animepage/${item.Anime}`);
                  }}
                  className={`h-48 ${item.Anime} cursor-pointer relative border-2 rounded-lg shadow-lg shadow-yellow-400`}
                >
                  <div className="absolute h-10 right-0 text-bold text-4xl font-bold text-orange-500">
                    #{i + 1}
                  </div>
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-80 rounded-lg">
                    <div className="w-full flex justify-center font-bold text-orange-500 text-xl sm:text-2xl">
                      {item.Anime}
                    </div>
                    <div className="w-full font-semibold flex justify-center text-orange-500 text-lg">
                      Members - {item.Membership}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    router.push(`/Quiz/${item.Question}`);
                  }}
                  className="p-2 ml-3 m-2 font-semibold bg-slate-400 hover:bg-slate-500 bg-opacity-50 rounded-lg"
                >
                  Play Quiz
                </button>
                <button
                  onClick={() => {
                    handleMembership({ animeName: item.Anime });
                  }}
                  className="p-2 ml-3 m-2 font-semibold bg-slate-400 hover:bg-slate-500 bg-opacity-50 rounded-lg"
                >
                  Membership
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-center text-4xl">Loading....</div>
        )}
      </div>
    </div>
  );
};

export default AnimeSelection;
