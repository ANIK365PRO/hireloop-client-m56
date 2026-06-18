import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
// import SignInPage from './../../../signin/page';
import { Button } from '@heroui/react';
import { getJobById } from '@/lib/api/jobs';
import JobApply from './JobApply';

const ApplyPage = async ({params}) => {
    const { id } = await params;
    const  user = await getUserSession();


    //user যদি লগ ইন না থাকে তাহলে সাইন ইন পেজে রিডাইরেক্ট করা হবে এবং রিডাইরেক্ট ইউআরএল এ এই অ্যাপ্লাই পেজের ইউআরএল থাকবে যাতে সাইন ইন করার পর আবার এই পেজে ফিরে আসা যায়।
    if(!user){
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    // যদি ইউজার লগ ইন থাকে কিন্তু তার রোল 'seeker' না হয়, তাহলে একটি মেসেজ দেখানো হবে এবং সাইন ইন পেজে রিডাইরেক্ট করার অপশন থাকবে যাতে সঠিক রোলের সাথে সাইন ইন করা যায়।
    if(user.role !== 'seeker'){
        return (
            <div className="text-center mt-10 max-w-7xl mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className='card py-10 px-6 border shadow backdrop-blur-sm'>Only job seekers can apply for this position. please Sign in with a job seeker account.</h1>
                
            </div>
        );
    }   
    
    // যদি ইউজার লগ ইন থাকে এবং তার রোল 'seeker' হয়, তাহলে জব এর ডিটেইলস ফেচ করা হবে এবং অ্যাপ্লাই পেজে দেখানো হবে।
    const job = await getJobById(id);




    return (
        <div className="text-center mt-10 max-w-7xl mx-auto border p-6 min-h-[60vh] flex flex-col items-center justify-center">
            
        <JobApply job={job} applicant={user} />

        </div>
    );
};

export default ApplyPage;