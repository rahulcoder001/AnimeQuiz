"use client";
import lufffy from '/public/Images/signinlufy.jpg';
import goldi from '/public/Images/signingoldi.jpg';
import Image from 'next/image';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import defaultLogo from '/public/upload/default.jpg';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import loaderimg from '/public/Images/loader--.gif';
import zod from 'zod';

export function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [conpassword, setConPassword] = useState("");
    const [profile, setProfile] = useState(null);
    const [profileDimensions, setProfileDimensions] = useState({ width: 144, height: 144 });
    const [visible,setvisible] = useState(true);
    const [convisible,setConvisible] = useState(true);
    const session  = useSession();
    const [verfy,setVerify] = useState(false);
    const [otp,setOtp] = useState("");
    const [myotp,setMyotp] = useState("");
    const [loading, setLoading] = useState(false);
    const emailscema = zod.string().email();
    const passwordscema = zod.string().min(5);

    const handleProfileChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile(file);  
            const img = new window.Image();
            img.onload = () => {
                setProfileDimensions({ width: img.width, height: img.height });
            };
            img.src = imageUrl;
        }
    };
    function generateFourDigitNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    async function handleSignup() {
        setLoading(true);

        if(otp!=myotp){
            toast.error("OTP does not match");
            setLoading(false);
            return;
        }
        toast.success("otp matched")
        const formData = new FormData();
        formData.append('Username', name);
        formData.append('email', email);
        formData.append('password', password);
        if (profile) {
            formData.append('avatar', profile);
        }
    
        try {
            const response = await axios.post("/api/adduser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.ok) {
                toast.success(response.data.message);
                const res = await signIn("credentials", {
                    redirect: false,
                    email: email,
                    password: password,
                });
    
                if (res?.ok) {
                    setLoading(false);
                    router.push('/');
                    toast.success("Autenticated sucssefully")
                } else {
                    setLoading(false);
                    toast.error("authentication failed");
                }
                
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error("Error signing up");
        }
        setLoading(false);
    }

    async function sendotp() {
        setLoading(true);

        if (!email || !name || !password) {
            toast.error("Please fill all the fields.");
            setLoading(false);
            return;
        }
        const er = emailscema.safeParse(email);
                            const pr = passwordscema.safeParse(password);
                            if(!er.success || !pr.success){
                                toast.error('Invalid email or password');
                                setLoading(false);
                                return;
                            }
        if (password != conpassword) {
            toast.error("Passwords do not match.");
            setLoading(false);
            return;
        }

        const newotp = generateFourDigitNumber().toString();
        setMyotp(newotp);

        const response = await axios.post("/api/sendmail",{
            email:email,
            otp:newotp,
            subject: "verify"
        })

        if(response.data.ok){
            toast.success("OTP sent successfully");
            setVerify(true);
            setLoading(false);
        }
        else{
            toast.error("Failed to send OTP try again or enter valid email");
            setLoading(false);
        }
        setLoading(false);
    }

    

    return (
       <div className='relative'>
        <div className={` w-full h-full ${loading?"flex":"hidden"} justify-center items-center absolute z-10`}>
            <div className='w-full bg-black bg-opacity-80 flex justify-center p-96'>
               <Image src={loaderimg} alt='loading..' />
            </div>
          </div>
          <div className="w-full text-white -mt-14 ">
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
            <div className={` ${verfy?"block":"hidden"} w-full flex justify-center`}>
                <div className="mt-10 rounded-xl w-2/3 sm:w-1/2 xl:w-2/5 flex flex-col justify-center items-center bg-black bg-opacity-75">
                    <p className="underline p-10 text-2xl font-bold">Verify Your Email!</p>
                    <div className="flex flex-col w-full p-4">
                        <label htmlFor="otp" className="py-2 text-sm font-semibold cursor-pointer">OTP</label>
                        <input
                            type="number"
                            id="otp"
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="O T P"
                            className="p-1 rounded-lg outline-none text-black font-semibold"
                        />
                    </div>
                    <button
                        onClick={handleSignup}
                        className="p-2 font-bold px-10 text-2xl m-2 rounded-xl bg-orange-500 hover:bg-orange-400"
                        
                    >
                        Verify
                    </button>
                    <p className='text-xs'></p>
                    <p className='text-xs mb-20'>Didn&apos;t Recive OTP | cheack-spam-mail |<button onClick={sendotp}><span className='ml-1 text-orange-600'>Re-send</span></button> </p>
                </div>
            </div>
            <div className={` ${!verfy?"block":"hidden"} w-full flex justify-center`}>
                <div className="mt-10 rounded-xl w-2/3 sm:w-1/2 xl:w-2/5 flex flex-col justify-center items-center bg-black bg-opacity-75">
                    <p className="underline p-10 text-2xl font-bold">Welcome</p>
                    <div className="flex flex-col w-40 p-4 items-center">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="avatar"
                            className="hidden"
                            onChange={handleProfileChange}
                        />
                        {/* Image with label triggering the file input */}
                        <label htmlFor="avatar" className="cursor-pointer">
                            <div className="rounded-full w-36 h-36 overflow-hidden">
                                <Image
                                    src={profile ? URL.createObjectURL(profile) : defaultLogo}
                                    alt="Avatar"
                                    width={profileDimensions.width} 
                                    height={profileDimensions.height} 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="py-2 text-sm font-semibold mt-3">Choose Profile Image</p>
                        </label>
                    </div>
                    <div className="flex flex-col w-full p-4">
                        <label htmlFor="name" className="py-2 text-sm font-semibold cursor-pointer">Username</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your email..."
                            className="p-1 rounded-lg outline-none text-black font-semibold"
                        />
                    </div>
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
                    <div className="flex flex-col w-full  p-4">
                        <label htmlFor="password" className="py-2 text-sm font-semibold cursor-pointer">Confirm Password</label>
                        <div className='w-full flex bg-white text-black rounded-lg'>
                        <input
                            type={convisible?"password":"text"}
                            id="password"
                            onChange={(e) => setConPassword(e.target.value)}
                            placeholder="Enter your password..."
                            className="p-1 rounded-lg outline-none text-black font-semibold w-11/12"
                        />
                        <div className={`ml-3 ${convisible?"block":"hidden"}`} onClick={()=>{setConvisible(!convisible)}}><RemoveRedEyeIcon/></div>
                        <div className={`ml-3 ${!convisible?"block":"hidden"}`} onClick={()=>{setConvisible(!convisible)}}><VisibilityOffIcon/></div>
                        </div>
                    </div>
                    <button
                        onClick={sendotp}
                        className="p-2 font-bold px-10 text-2xl m-2 rounded-xl bg-orange-500 hover:bg-orange-400"
                        
                    >
                        Sign-up
                    </button>
                    <p className='text-xs'>Already have an account | <Link href={"/signin"}><span className='ml-1 text-orange-600'>Sign-in</span></Link> </p>
                    <div className="bt-10 w-full flex items-center justify-center">
                        <div className="border-2 h-0 w-2/5"></div>
                        <div className="mx-2 text-xl">or</div>
                        <div className="border-2 w-2/5"></div>
                    </div>
                    <button
                        onClick={async () => {
                            await signIn("google", { callbackUrl: '/' });
                            toast.success("successfully signup with google");
                        }}
                        className="mt-10 w-4/5 m-3 p-2 sm:p-3 text-white bg-orange-400 sm:text-xl flex items-center justify-center rounded-lg font-bold mb-10"
                    >
                        <GoogleIcon />
                        <span className=" ml-3 sm:ml-5">Login via Google</span>
                    </button>
                </div>
            </div>
        </div>
          </div>
       
    );
}
