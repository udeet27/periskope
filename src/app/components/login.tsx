"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAuthenticated(true);
        router.push("/chat");
      } else if (window.location.pathname === "/chat") {
        router.push("/");
      }
    };
    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        router.push("/chat");
      } else {
        setIsAuthenticated(false);
        if (window.location.pathname === "/chat") {
          router.push("/");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setMessage("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/chat`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setMessage(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setMessage("Successfully signed out!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error: any) {
      setMessage(error.message || "Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#051201]">
      <div className="shadow-xl rounded-2xl p-6 w-full max-w-sm space-y-4 bg-[#051201]">
        <div className="flex flex-col items-center gap-7">
          <a href="https://periskope.app/" target="_blank">
            <Image
              src="https://framerusercontent.com/images/ywGyuWgLKzqyB4QJ1sw5Nk1mckU.svg"
              alt="Periskope Logo"
              width={150}
              height={150}
              priority
            />
          </a>
          {!isAuthenticated ? (
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="text-sm flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-300 transition cursor-pointer"
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
              />
              {loading ? "Signing in..." : "Continue with Google"}
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Sign Out
            </button>
          )}
        </div>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes("Successfully")
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
