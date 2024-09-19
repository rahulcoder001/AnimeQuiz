"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import loaderimg from '/public/Images/loader--.gif'

export default function FeedbackPage() {
    const { data: session } = useSession();
    const email = session?.user?.email;

    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const response = await axios.post("/api/givefeedback", {
                email,
                subject,
                description,
            });

            if (response.data.ok) {
                setSuccess(true);
                setSubject("");
                setDescription("");
            } else {
                setError(true);
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Image src={loaderimg} alt='loading..' />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-white">
            <h1 className="font-bold text-4xl mb-10 tracking-wider text-center">
                We&apos;d love to hear your Feedback!
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 bg-opacity-60 p-8 shadow-lg rounded-lg xl:w-1/3 lg:w-1/2 sm:w-2/3 w-full space-y-6"
            >
                <div>
                    <label className="block font-semibold text-lg">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 mt-2 border-2 border-gray-700 rounded-lg outline-none bg-gray-900 text-white focus:border-orange-500 transition-all"
                        required
                        placeholder="Enter the subject..."
                    />
                </div>

                <div>
                    <label className="block font-semibold text-lg">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 mt-2 border-2 border-gray-700 rounded-lg outline-none bg-gray-900 text-white focus:border-orange-500 transition-all"
                        required
                        placeholder="Enter your feedback..."
                        rows={8}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-400 rounded-lg text-lg font-semibold transition-all focus:ring focus:ring-orange-300 focus:outline-none disabled:opacity-50"
                >
                    {loading ? "Sending..." : "Submit Feedback"}
                </button>
            </form>

            {success && (
                <p className="text-green-500 mt-6 text-lg">
                    Feedback sent successfully! Thank you for your input.
                </p>
            )}
            {error && (
                <p className="text-red-500 mt-6 text-lg">
                    Failed to send feedback. Please try again later.
                </p>
            )}
        </div>
    );
}
