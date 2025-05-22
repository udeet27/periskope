"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { BsChatDotsFill } from "react-icons/bs";
import { TbRefreshDot } from "react-icons/tb";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { RiExpandUpDownLine } from "react-icons/ri";
import { MdInstallDesktop } from "react-icons/md";
import { BiSolidBellOff } from "react-icons/bi";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoSparklesSharp } from "react-icons/io5";

export default function TopBar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateUserInfo = async (session: any) => {
      const firstName =
        session.user.user_metadata?.full_name?.split(" ")[0] ||
        session.user.user_metadata?.name?.split(" ")[0] ||
        session.user.email?.split("@")[0] ||
        "User";

      const avatarUrl =
        session.user.user_metadata?.avatar_url ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(firstName);

      setFirstName(firstName);
      setAvatarUrl(avatarUrl);

      try {
        const { error } = await supabase.from("users").upsert(
          {
            id: session.user.id,
            name:  session.user.user_metadata.full_name,
            email: session.user.email,
            profile_picture_url: avatarUrl,
            last_signed_in: session.user.last_sign_in_at,
            created_at: session.user.created_at, // Optional if DB handles this
          },
          {
            onConflict: "id",
          }
        );

        if (error) throw error;
      } catch (error: any) {
        console.error("Error updating user:", error.message);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        updateUserInfo(session);
      }
    });

    // Optional: if you want immediate session check too
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // router.push("/"); // Uncomment if needed
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const [showSignOutPopup, setShowSignOutPopup] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setShowSignOutPopup(true);
    } catch (error: any) {
      setMessage(error.message || "Failed to sign out");
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  return (
    // The main container for the TopBar, now spans the full width of its parent flex-col
    <div className="font-sans w-full bg-white shadow-sm">
      <div className="flex justify-between items-center py-2 px-4">
        {" "}
        {/* Added px-4 for padding */}
        <div className="flex items-center gap-2">
          {" "}
          {/* Removed mx-4 mr-50 */}
          <BsChatDotsFill size={13} className="text-gray-400" />
          <span className="text-gray-400 font-bold text-xs">chats</span>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-7 h-7 rounded-full border border-gray-300 shadow-sm ml-2"
            />
          )}
          <h1 className="text-xs font-semibold text-gray-800">
            Welcome,
            <span className="text-green-700"> {firstName}!</span>
          </h1>
        </div>
        {/* New wrapper div to group the buttons and the Sign Out button, and push them to the right */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2">
            {" "}
            {/* Buttons from line 105 to 128 */}
            <button className="flex items-center gap-1 px-3 py-1 font-medium bg-white shadow-sm rounded-md text-gray-800 hover:bg-gray-50 transition cursor-pointer">
              <TbRefreshDot size={14} />
              <span className="text-xs">Refresh</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 font-medium bg-white shadow-sm rounded-md text-gray-800 hover:bg-gray-50 transition cursor-pointer">
              <IoMdHelpCircleOutline size={14} />
              <span className="text-xs">Help</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 font-medium bg-white shadow-sm rounded-md text-gray-800 hover:bg-gray-50 transition cursor-pointer">
              <GoDotFill size={14} color="#EBBE05" />
              <span className="text-xs">5 / 6 phones</span>
              <RiExpandUpDownLine size={14} className="text-gray-500" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-white shadow-sm rounded-md text-gray-800 hover:bg-gray-50 transition cursor-pointer">
              <MdInstallDesktop size={14} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-white shadow-sm rounded-md text-gray-600 hover:bg-gray-50 transition cursor-pointer">
              <BiSolidBellOff size={14} />
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-white shadow-sm rounded-md text-gray-400 hover:bg-gray-50 transition cursor-pointer">
              <IoSparklesSharp size={13} color="#EBBE05" />
              <TfiMenuAlt size={15} />
            </button>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-2 py-1 text-xs text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
      {showSignOutPopup && (
        <div className="fixed inset-0 bg-[#FDFAF8] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FDFAF8] p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              You have been successfully signed out.
            </h2>
            <button
              onClick={goToHome}
              className="px-4 py-2 text-sm bg-green-700 hover:bg-green-800 text-[#FDFAF8] rounded-lg shadow transition-all cursor-pointer"
            >
              Go back home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
