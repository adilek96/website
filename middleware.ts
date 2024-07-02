import { NextRequest, NextResponse } from "next/server"
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

// export { default } from 'next-auth/middleware'

// export async function middleware(request){
//     const session = await getServerSession(authConfig);
//     console.log(request)
//     console.log(session)
//     return NextResponse.next()
// }
import { withAuth } from "next-auth/middleware"


// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
   
  
      if(token){
        return true
      } else {
       return  false
      }
    },
  },
})


export const config = { matcher: ['/profile', '/dashboard' ] }