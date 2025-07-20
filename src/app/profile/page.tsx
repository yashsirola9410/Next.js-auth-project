"use client";
import axios from "axios";


import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage(){
    const router = useRouter();


    const logout = async ()=>{
        try {
            await axios.get('api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                toast.error(error.message);
            } else {
                console.log(String(error));
                toast.error("An unexpected error occurred");
            }
        }
    }
    return (
        <div className = "flex flex-col items-center justify-center min-h-screen py-2">
             <h1>Profile</h1>
             <hr/>
             <p className="text-4xl">Profile page </p>
             <hr/>
             <button
             className = "bg-blue-600 text-white p-3 rounded-1xl"
             onClick={logout}
             >
                Logout
             </button>
        </div>
    )
}