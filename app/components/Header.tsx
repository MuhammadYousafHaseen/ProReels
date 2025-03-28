'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


function Header() {
  
   const {data:session} = useSession();

   const handleSignout = async () => {
    try {
        await signOut()
    } catch (error) {
        console.log(error);
    }
   }


  return (
    <div>
      <button onClick={handleSignout} type='button'>SignOut</button>
      {session ? (
        <div className="text-xl font-bold text-blue-500">Welcome</div>
      ) : (
        <div className="flex flex-row">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  )
}

export default Header
