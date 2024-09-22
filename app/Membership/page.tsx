"use client";
import Image from "next/image";
import upi from "/public/Images/UPI.jpg";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import loaderimg from '/public/Images/loader--.gif';

export default function MembershipPage() {
  const session = useSession();
  const userr: any = session.data?.user;
  const router = useRouter();
  const [transactionList, setTransactionList] = useState([]);
  const [anime, setAnime] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const getTransactionList = useCallback(async () => {
    if (userr) {
      try {
        const response = await axios.get(`/api/membership?id=${userr.id}`);
        setTransactionList(response.data.trasactionlist);
      } catch (error) {
        console.error("Error fetching transaction list", error);
      }
    } else {
      console.error("Error fetching transaction list");
    }
  }, [userr, router]); // Add dependencies here

  useEffect(() => {
    getTransactionList();
  }, [getTransactionList]); // Add getTransactionList to the dependency array

  async function buyMembership() {
    setLoading(true);
    if (!userr) {
      toast.error("Please login to continue");
      setLoading(false);
      router.push("/signin");
      return;
    }

    if (!anime || !transactionId) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    await axios.post("/api/membership", {
      user: userr.id,
      Anime: anime,
      TransactionId: transactionId,
      comment,
    });

    toast.success("Membership purchased successfully");
    setLoading(false);
    getTransactionList(); // Refresh transaction list
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Image src={loaderimg} alt="loading.." />
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col md:flex-row gap-10 playfair_display">
      <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Why No Payment Gateway?</h2>
        <p className="mb-2">
          Unfortunately, my app is not registered as a business with the government, 
          which prevents me from using official payment gateways like Razorpay or PayPal.
        </p>
        <p className="mb-4">
          While I could use sandbox or dummy gateways, I prefer a more real-world experience for users. 
          For now, you can make payments directly through UPI.
        </p>
        <p className="font-bold">Pay ₹50 on UPI ID: <span className="text-yellow-400">21012003rs@oksbi</span></p>
        <p className="mb-4">Or scan the QR code below:</p>
        <Image alt="upi" src={upi} width={500} height={500} className="mx-auto h-60 w-56" />
      </div>

      <div className="md:w-1/2 bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Submit Your Transaction</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            buyMembership();
          }}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Anime Name"
              value={anime}
              onChange={(e) => setAnime(e.target.value)}
              className="w-full p-4 rounded bg-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-4 rounded bg-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Any Comment (Optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 rounded bg-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2">
              After payment, I will update your membership status soon.
            </p>
            <p className="text-sm">
              You can also buy multiple memberships by paying in multiples of ₹50.
              Any other queries? You can leave a comment.
            </p>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 w-full py-2 rounded-lg font-semibold"
          >
            Submit Transaction
          </button>
        </form>
      </div>

      <div className="mt-6 md:mt-0 md:w-full bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
        {Array.isArray(transactionList) && transactionList.length > 0 ? (
          <ul className="space-y-4">
            {transactionList.map((transaction: any, idx: number) => (
              <li
                key={idx}
                className={`p-4 rounded-lg shadow-md ${
                  transaction.Status === "Processing"
                    ? "bg-yellow-400"
                    : transaction.Status === "Success"
                    ? "bg-green-500"
                    : transaction.Status === "Failed"
                    ? "bg-red-500"
                    : "bg-yellow-400" 
                }`}
              >
                <p><strong>Anime:</strong> {transaction.Anime}</p>
                <p><strong>Transaction ID:</strong> {transaction.TransactionId}</p>
                <p><strong>Status:</strong> {transaction.Status || "Processing"}</p>
                {transaction.comment && <p><strong>Comment:</strong> {transaction.comment}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No previous transactions found.</p>
        )}
      </div>
    </div>
  );
}
