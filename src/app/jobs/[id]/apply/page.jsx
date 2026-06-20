import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import { Button } from '@heroui/react';
import { getJobById } from '@/lib/api/jobs';
import JobApply from './JobApply';
import Link from 'next/link';
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession();

    // 1. Redirect if user is not authenticated
    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    // 2. Role Restriction View
    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
                <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
                    </p>
                    <Link
                        href="/signin" 
                        className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition text-center"
                    >
                        Switch Account
                    </Link>
                </div>
            </div>
        );
    } 
    
    // Fetch user application stats, plan & job data
    const applications = await getApplicationsByApplicant(user?.id);

    const plan = await getPlanById(user?.plan || 'seeker_free')

    const job = await getJobById(id);

    // console.log('plan1', plan)
    
    // const plan = {
    //     name: 'Free',
    //     maxApplicationsPerMonth: 3
    // };

    const hasReachedLimit = applications.length >= plan.maxApplicationsPerMonth;

    return (
        <div className="w-full min-h-[85vh] flex flex-col items-center justify-center text-white p-6">
            <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-8">
                
                {/* Header / Job Info Area */}
                <div className="border-b border-zinc-800 pb-6 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                        Application Portal
                    </span>
                    <h1 className="text-2xl font-bold text-zinc-100 mt-3">
                        Applying for: <span className="text-zinc-300 font-medium">{job?.title || "Position"}</span>
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">{job?.company || "Company Name"}</p>
                </div>

                {/* Usage Limit Tracker Widget */}
                <div className={`p-4 rounded-xl border mb-8 text-left transition ${
                    hasReachedLimit 
                        ? 'bg-rose-500/5 border-rose-500/20 text-rose-200' 
                        : 'bg-zinc-800/40 border-zinc-800 text-zinc-300'
                }`}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-semibold">Monthly Application Limit ({plan.name} Plan)</h3>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                            {applications.length} / {plan.maxApplicationsPerMonth}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800 rounded-full h-2 mb-3 overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${hasReachedLimit ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min((applications.length / plan.maxApplicationsPerMonth) * 100, 100)}%` }}
                        />
                    </div>

                    {/* Upsell text */}
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        You have used {applications.length} out of your {plan.maxApplicationsPerMonth} monthly applications.{' '}
                        {hasReachedLimit ? (
                            <span className="font-medium text-rose-400">You have reached your limit.</span>
                        ) : (
                            <span>Need more?</span>
                        )}{' '}
                        <Link href="/plans" className="text-amber-500 hover:underline inline-flex items-center gap-0.5 font-medium">
                            Upgrade your plan →
                        </Link>
                    </p>
                </div>

                {/* Conditional Rendering of the form or fallback */}
                {!hasReachedLimit ? (
                    <div className="bg-zinc-900/50 rounded-xl">
                        <JobApply job={job} applicant={user} />
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <Button disabled className="w-full bg-zinc-800 text-zinc-500 cursor-not-allowed py-6 text-base font-medium rounded-xl">
                            Application Locked (Limit Exceeded)
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyPage;




