import axios from "axios";


export async function MembershipAdding({ userid, anime }: { userid: string; anime: string }) {
  try {
    await axios.put("/api/membership", {
      userid,
      anime,
    });
  } catch (error) {
    console.error("Error adding membership:", error);
  }
}



