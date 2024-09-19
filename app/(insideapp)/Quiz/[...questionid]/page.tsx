"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import toast from "react-hot-toast";

function AnimatedText({ text }:any) {
  const words = text.split(" ");
  return (
    <motion.div className="inline-block">
      {words.map((word:string, i:number) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
}

const optionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i:number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

function Lefticon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M232,200a8,8,0,0,1-16,0,88.1,88.1,0,0,0-88-88H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,61.66L51.31,96H128A104.11,104.11,0,0,1,232,200Z"></path>
    </svg>
  );
}

function RightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H128a88.1,88.1,0,0,0-88,88,8,8,0,0,1-16,0A104.11,104.11,0,0,1,128,96h76.69L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Z"></path>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
    </svg>
  );
}

export default function QuestionComponent() {


  const session = useSession();
  const userr:any = session.data?.user;
  const pathname = usePathname() || "";
  const segments = pathname.split("/").filter(Boolean);
  const animeid = segments[segments.length - 1];
  const [id, setId] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  const scrollRef = useRef<any>(null);
  const [animename,setAnimename] = useState("");
  const [corrstatus, setcorrstatus] = useState(false);
  const [incorrstatus, setincorrstatus] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [useranimelist , setuseranimelist] = useState([]);
  const router = useRouter();

  const handleMouseDown = (e:any) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e:any) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const getlist = useCallback(async () => {
    if (!userr) {
      toast.error("Please login to continue");
      router.push("/signin");
      return;
    }

    try {
      const response = await axios.post(`/api/Anime/getuseranimelist`, {
        userId: userr.id,
        anime: animename,
      });
      setuseranimelist(response.data.question);
    } catch (error: any) {
      toast.error("Error fetching user anime list:", error);
    }
  }, [userr, animename, router]);
  

  useEffect(() => {
    async function getQuestion() {
      setLoader(true);
      const response = await axios.get(`/api/Anime/getquestion?id=${animeid}`);
      setQuestions(response.data.questionlist);
      setAnimename(response.data.anime);
      setLoader(false);
    }
    getQuestion();
  }, [animeid]);

  useEffect(() => {
    setcorrstatus(false);
    setincorrstatus(false);
  }, [id]);

  useEffect(() => {
    if (userr && userr.id) {
      getlist();
    }
  }, [userr, animename, getlist]);
  

  const scrollLeftt = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };
  function bgcolur(index:number) {
    //@ts-ignore
    if (useranimelist.includes(index)) {
      return 'bg-green-300';
    }
    return 'bg-white';
  }

  function iscorrect(index:number){
    //@ts-ignore
    if (useranimelist.includes(index)) {
      return true;
    }
    return false; 
  }
  
  async function answerd(num:number) {
    if(!userr){
      toast.error("Please login to continue");
      router.push("/signin")
      return
    }
    if (questions[id]?.answer === num) {
      setcorrstatus(true);
       await axios.put("/api/Anime/userquestion", {
        userId: userr.id,
        animename: animename,
        questionid: id
    });
    getlist();
    setId((prevId) => (prevId === questions.length - 1 ? 0 : prevId + 1));
    setcorrstatus(false);

    } else {
      setincorrstatus(true);
      setTimeout(() => setincorrstatus(false), 1500);
    }
  }

  if (loader) {
    return <div className="text-white text-7xl font-bold">Loading....</div>;
  }

  return (
    <div className="relative text-white">
      {corrstatus && (
        <motion.div
          className="absolute inset-0 flex justify-center items-center p-3 bg-green-500 rounded-lg shadow-lg"
          style={{ width: '50%', height: '50%' ,margin: '0 auto', top: '25%' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircleIcon />
          <p className="text-white font-bold text-xl">Correct Answer!</p>
        </motion.div>
      )}
      {incorrstatus && (
        <motion.div
          className="absolute inset-0 flex justify-center items-center p-3 bg-red-500 rounded-lg shadow-lg"
          style={{ width: '50%', height: '50%' , margin: '0 auto', top: '25%' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorIcon />
          <p className="text-white font-bold text-xl">Incorrect Answer!</p>
        </motion.div>
      )}

      {/* Main content */}
      <div className="m-10">
        <div className="p-5 flex">
          <div className="p-5 bg-black bg-opacity-60 rounded-lg shadow-lg shadow-yellow-500 w-full">
            <div>
              <p className="text-3xl text-white font-semibold">
                <span className=" text-lg sm:text-2xl font-bold text-orange-500 mr-5">
                  Question {id+1}.
                </span>
                <AnimatedText key={id} text={questions[id]?.Question || ""} />
                {iscorrect(id) && <span className="font-bold text-sm text-green-400 ml-5">Answered <TaskAltIcon/></span>}
              </p>
              <div className="grid grid-cols-2 p-1 text-xs md:text-xl md:p-10 mt-10">
                {[1, 2, 3, 4].map((option, index) => (
                  <motion.p
                    key={index}
                    custom={index}
                    variants={optionVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-5 playfair_display"
                    onClick={() => answerd(option)}
                  >
                    <span className="ml-1 font-semibold text-orange-500">
                      Option {option}.
                    </span>{" "}
                    <span className="hover:border-2 p-1 px-1 md:px-10 rounded-lg hover:bg-gray-400 cursor-pointer">
                      {questions[id]?.[`option${option}`]}
                    </span>
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-10 sm:p-10">
          <button onClick={scrollLeftt} className="border-2 p-2 hover:bg-orange-500 rounded-lg">
            <Lefticon />
          </button>
          <div
            ref={scrollRef}
            className="flex bg-black bg-opacity-60 shadow-lg shadow-yellow-500 rounded-lg items-center overflow-hidden space-x-7 px-3"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            style={{ cursor: isDragging ? "grabbing" : "grab" }} // Visual indication of drag
          >
            {questions.map((item:any, i:number) => (
              <div
                key={i}
                className={`${id === i ? "bg-slate-500" : bgcolur(i)} h-6 w-6 p-1 rounded-full flex justify-center items-center text-black font-bold text-xs cursor-pointer`}
                onClick={() => setId(i)}
              >
                {item.Sn}
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="border-2 p-2 hover:bg-orange-500 rounded-lg">
            <RightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
