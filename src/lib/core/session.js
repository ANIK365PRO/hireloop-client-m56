import { redirect } from "next/navigation";
import { headers } from "next/headers"
import { auth } from "../auth"

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()        
    })
    return session?.user || null
}

// layout authorization for check user and user?.role
export const requireRole = async(role) =>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/signin')
    }
    if(user?.role !== role){
        redirect('/unauthorized')
    }
    return user;
}