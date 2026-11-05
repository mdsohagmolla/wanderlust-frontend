import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // session ta nia asa hoyace
    const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

const user = session?.user
if(!user){
  return NextResponse.redirect(new URL('/signup', request.url))
}
console.log('sessior er user',user)




}



export const config = {
  matcher: ['/add-destination',"/my-bookings" , '/destinations/:path'],
}