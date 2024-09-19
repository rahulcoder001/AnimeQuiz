"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileComponent() {
    const router = useRouter();
    const session = useSession();
    const user: any = session.data?.user;
    const [thisuser, setThisuser] = useState<any>(null);

    useEffect(() => {
        // Define finduser inside useEffect to avoid it being a missing dependency
        async function finduser() {
            if (user && user.id) {
                try {
                    const res = await axios.post("/api/getuser", {
                        userId: user.id,
                    });
                    setThisuser(res.data.user);
                } catch (error) {
                    toast.error("Failed to fetch user data");
                }
            } else {
                toast.error("Please login to continue");
                router.push("/signin");
            }
        }

        finduser();
    }, [user, router]); // Include `router` in the dependency array

    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="h-32 w-32 shadow-yellow-500 shadow-lg overflow-hidden rounded-full">
                    <Image
                        src={user?.image || ""}
                        width={400}
                        height={400}
                        className="rounded-full w-32 h-32 object-cover"
                        priority
                        alt="user-image"
                    />
                </div>
                <p className="font-bold mt-5 text-white text-sm">{user?.name?.toUpperCase()} Profile</p>
            </div>

            <div className="flex flex-col sm:flex-row m-10">
                <div className="sm:w-1/2 m-1 bg-black bg-opacity-75 p-4">
                    <p className="font-bold text-orange-500 text-2xl pb-4">Your Information</p>
                    <div className="flex text-white">
                        <div className="w-2/5 m-1">
                            <p className="text-sm sm:text-base p-2"><PersonOutlineIcon /> Username</p>
                            <p className="text-sm sm:text-base p-2"><ContactMailIcon /> UserEmail</p>
                        </div>
                        <div className="w-2/5 m-1 font-bold">
                            <p className="text-sm sm:text-base p-2">{user?.name?.toUpperCase()}</p>
                            <p className="text-sm sm:text-base p-2">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="sm:w-1/2 m-1 text-white">
                    <div className="bg-black bg-opacity-75 p-4">
                        <p className="font-bold text-orange-500 text-2xl pb-4">Solved Questions</p>
                        <div className="overflow-auto h-60 text-sm">
                            {thisuser?.questionlist?.length > 0 ? (
                                <table className="table-auto w-full">
                                    <thead className="bg-gray-800 text-orange-500">
                                        <tr>
                                            <th className="p-2 text-left">Anime</th>
                                            <th className="p-2 text-left">No of Questions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {thisuser.questionlist.map((item: any, index: number) => (
                                            <tr key={index} className="border-t border-gray-700">
                                                <td className="p-2">{item.Anime}</td>
                                                <td className="p-2">{item.questionid.length}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">Not solved any questions yet</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 bg-black bg-opacity-75 p-4">
                        <p className="font-bold text-orange-500 text-2xl pb-4">Your Membership</p>
                        <div className="overflow-auto h-60 text-sm">
                            {thisuser?.membershiplist?.length > 0 ? (
                                <table className="table-auto w-full">
                                    <thead className="bg-gray-800 text-orange-500">
                                        <tr>
                                            <th className="p-2 text-left">Anime</th>
                                            <th className="p-2 text-left">No of Memberships</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {thisuser.membershiplist.map((item: any, index: number) => (
                                            <tr key={index} className="border-t border-gray-700">
                                                <td className="p-2">{item.Anime}</td>
                                                <td className="p-2">{item.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">No membership purchased yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
