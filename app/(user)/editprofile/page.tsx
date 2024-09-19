"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import loaderimg from '../../../public/Images/loader--.gif';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [updname, setUpdname] = useState(false);
    const [profile, setProfile] = useState<File | null>(null);
    const [updpro, setUpdpro] = useState(false);
    const [profileDimensions, setProfileDimensions] = useState({ width: 144, height: 144 });
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const userr: any = session?.user;

    useEffect(() => {
        if (!userr) {
            toast.error("Please login to continue");
            router.push("/signin");
        }
    }, [userr, router]); // Include userr and router in the dependency array

    const handleProfileChange = (e: any) => {
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
        setUpdpro(true);
    };

    async function refreshSession() {
        await signIn("credentials", {
            redirect: false,
            email: userr?.email,
            password: "1"
        });
    }

    async function updateprofile() {
        if (!profile) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', profile);
            formData.append('userid', userr.id);

            const response = await axios.put('/api/updateuser/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.ok) {
                toast.success("Profile updated successfully");
                setUpdpro(false);
                refreshSession(); // Refresh session only after success
            } else {
                toast.error("Failed to update with backend");
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
        setLoading(false);
    }

    async function updatename() {
        if (!name) return; // Don't allow update if name is empty
        setLoading(true);
        try {
            const response = await axios.put("api/updateuser/name", {
                data: name,
                userid: userr.id,
            });

            if (response.data.ok) {
                toast.success("Username updated successfully");
                setUpdname(false);
                refreshSession(); // Refresh session after successful update
            } else {
                toast.error("Failed to update with backend");
            }
        } catch (error) {
            toast.error("Failed to update username");
        }
        setLoading(false);
    }

    return (
        <div className='relative text-white'>
            {/* Loader */}
            <div className={`w-full h-full ${loading ? "flex" : "hidden"} justify-center items-center absolute z-10`}>
                <div className='w-full bg-black bg-opacity-80 flex justify-center p-96'>
                    <Image src={loaderimg} alt='loading..' />
                </div>
            </div>

            {/* Profile & Username Update Form */}
            <div className={`w-full flex justify-center`}>
                <div className="mt-10 rounded-xl w-2/3 sm:w-1/2 xl:w-2/5 flex flex-col justify-center items-center bg-black bg-opacity-75">
                    <p className="underline p-10 text-2xl font-bold">Edit Your Profile</p>
                    
                    {/* Profile Image Upload */}
                    <div className="flex flex-col w-40 p-4 items-center">
                        <input
                            type="file"
                            id="avatar"
                            className="hidden"
                            onChange={handleProfileChange}
                        />
                        <label htmlFor="avatar" className="cursor-pointer">
                            <div className="rounded-full w-36 h-36 overflow-hidden">
                                <Image
                                    src={profile ? URL.createObjectURL(profile) : `${userr?.image}?${new Date().getTime()}`}
                                    alt="Avatar"
                                    width={profileDimensions.width}
                                    height={profileDimensions.height}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <p className="py-2 font-semibold text-sm mt-3 ml-5">Edit Profile Image</p>
                        </label>
                        <button
                            onClick={updateprofile}
                            className={`${!updpro ? "hidden" : "block"} border-2 text-sm p-2 font-bold rounded-lg hover:bg-orange-500`}
                        >
                            Update
                        </button>
                    </div>

                    {/* Username Update */}
                    <div className="flex w-full p-4 justify-center">
                        <label htmlFor="name" className="py-2 text-sm font-semibold cursor-pointer">Username :-</label>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your username..."
                            className={` ${!updname ? "hidden" : "block"} p-1 rounded-lg outline-none text-black font-semibold ml-3`}
                        />
                        <p className={`${updname ? "hidden" : "block"} font-bold mt-2 ml-2`}>{userr?.name?.toUpperCase()}</p>
                        <button
                            onClick={() => setUpdname(!updname)}
                            className={`${updname ? "hidden" : "block"} border-2 text-sm p-2 font-bold rounded-lg ml-3 hover:bg-orange-500`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={updatename}
                            className={`${!updname ? "hidden" : "block"} border-2 text-sm p-2 font-bold rounded-lg ml-3 hover:bg-orange-500`}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
