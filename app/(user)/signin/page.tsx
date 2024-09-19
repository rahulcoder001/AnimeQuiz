"use client";
import lufffy from '/public/Images/signinlufy.jpg';
import goldi from '/public/Images/signingoldi.jpg';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import loaderimg from '/public/Images/loader--.gif'
import zod from 'zod'


export default function Signin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible,setvisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const emailscema = zod.string().email();
    const passwordscema = zod.string().min(5);

    return (
        <div className='relative'>
            <div className={` w-full h-full ${loading?"flex":"hidden"} justify-center items-center absolute z-10`}>
            <div className='w-full bg-black bg-opacity-80 flex justify-center p-96'>
               <Image src={loaderimg} alt='loading..' />
            </div>
          </div>
            <div className="w-full text-white -mt-14">
            {/* Updated div with overflowing images */}
            <div className="relative flex justify-between items-center h-64 bg-black bg-opacity-80 shadow-xl shadow-yellow-500 custom-shape">
                {/* Left image with overflow */}
                <div className="absolute -top-8 left-0 h-72 w-64">
                    <Image src={goldi} alt="goldi" className="h-full w-full" />
                </div>
                
                {/* Center text */}
                <div className="flex-1 text-center font-bold text-6xl sm:text-9xl z-10">
                    <Link href={"/"}><span>Anime</span><span className="text-orange-500">Quiz</span></Link>
                    
                </div>

                {/* Right image with overflow */}
                <div className="absolute -top-8 right-0 h-72 w-64">
                    <Image src={lufffy} alt="lufy" className="h-full w-full" />
                </div>
            </div>
            
            {/* Sign-in form below */}
            <div className="w-full flex justify-center">
                <div className="mt-10 rounded-xl w-2/3 sm:w-1/2 xl:w-2/5 flex flex-col justify-center items-center bg-black bg-opacity-75">
                    <p className="underline p-10 text-xl sm:text-2xl font-bold">Welcome Back!</p>
                    <div className="flex flex-col w-full p-4">
                        <label htmlFor="email" className="py-2 text-sm font-semibold cursor-pointer">Email-address</label>
                        <input
                            type="text"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email..."
                            className="p-1 rounded-lg outline-none text-black font-semibold"
                        />
                    </div>
                    <div className="flex flex-col w-full  p-4">
                        <label htmlFor="password" className="py-2 text-sm font-semibold cursor-pointer">Password</label>
                        <div className='w-full flex bg-white text-black rounded-lg'>
                        <input
                            type={visible?"password":"text"}
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password..."
                            className="p-1 rounded-lg outline-none text-black font-semibold w-11/12"
                        />
                        <div className={`ml-3 ${visible?"block":"hidden"}`} onClick={()=>{setvisible(!visible)}} ><RemoveRedEyeIcon/></div>
                        <div className={`ml-3 ${!visible?"block":"hidden"}`} onClick={()=>{setvisible(!visible)}}><VisibilityOffIcon/></div>
                        </div>
                    </div>
                    <button
                        onClick={async () => {
                            setLoading(true);
                            const er = emailscema.safeParse(email);
                            const pr = passwordscema.safeParse(password);
                            if(!er.success || !pr.success){
                                toast.error('Invalid email or password');
                                setLoading(false);
                                return;
                            }
                            const res = await signIn("credentials", {
                                redirect: false,
                                email: email,
                                password: password,
                            });
                            if (res?.ok) {
                                setLoading(false)
                                router.push('/');
                                toast.success("authorized successfully")
                            } else {
                                setLoading(false)
                                toast.error('Login failed');
                            }
                            setLoading(false)
                        }}
                        className="p-2 font-bold px-10 m-2 text-2xl rounded-xl bg-orange-500 hover:bg-orange-400"
                    >
                        Sign-in
                    </button>
                    <p className='text-xs'>Did&apos;t have an account... | <Link href={"/signup"}><span className='ml-1 text-orange-600'>Sign-up</span></Link> </p>
                    <div className="bt-10 w-full flex items-center justify-center">
                        <div className="border-2 h-0 w-2/5"></div>
                        <div className="mx-2 text-xl">or</div>
                        <div className="border-2 w-2/5"></div>
                    </div>
                    <button
                        onClick={async () => {
                            await signIn("google", { callbackUrl: '/' });
                        }}
                        className="mt-10 w-4/5  m-3 p-2 sm:p-3 text-white bg-orange-400 sm:text-xl flex items-center justify-center rounded-lg font-bold mb-10"
                    >
                        <GoogleIcon />
                        <span className="ml-3 sm:ml-5">Login via Google</span>
                    </button>
                </div>
            </div>
        </div>
           
        </div>

    );
}
