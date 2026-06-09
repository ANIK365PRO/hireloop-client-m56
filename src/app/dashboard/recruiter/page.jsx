 "use client" 
import DashboardStats from "@/components/dashboard/DashboardStats";
import { authClient } from "@/lib/auth-client";
import {
  File,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";


const RecruiterDashboardHomepage = () => {
    const { data: session , isPending} = authClient.useSession()

    if(isPending){
        return <div className="text-center font-bold text-2xl py-10">Loading...</div>
    }

    const user = session?.user
    console.log(user)

    const recruiterStats = [
        {
            title: "Total Job Posts",
            value: 48,
            icon: File,
        },
        {
            title: "Total Applicants",
            value: "1,284",
            icon: Persons,
        },
        {
            title: "Active Jobs",
            value: 18,
            icon: Thunderbolt,
        },
        {
            title: "Jobs Closed",
            value: 32,
            icon: CircleCheck,
        },
    ];




    return (
        <div className="p-4">
            <h1 className="text-2xl">Welcome back, {user?.name} </h1>

            <DashboardStats recruiterStats={recruiterStats}></DashboardStats>
        </div>
    );
};

export default RecruiterDashboardHomepage;