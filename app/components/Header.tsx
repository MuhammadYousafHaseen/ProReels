"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
    const router = useRouter();

  const PostVidoeoPagae =  async () => {
    const userRes = await fetch("/api/auth/user");
      if (!userRes.ok) throw new Error("Failed to fetch user data");

      const userData = await userRes.json();
      router.push(`/dashboard/${userData.userId}`);
  }

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-primary">
          ProReels
        </Link>
      </div>
      <div className="flex-none">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-gray-600 font-medium">
              Welcome, {session.user?.email || "User"}
            </span>
            <button
              onClick={handleSignout}
              className="btn btn-sm btn-error text-white"
            >
              Sign Out
            </button>
            <button
            onClick={PostVidoeoPagae}
            className="btn bt-sm btn-primary"
            >Post Video</button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
