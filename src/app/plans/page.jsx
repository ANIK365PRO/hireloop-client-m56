'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const PlansPage = () => {
    const [userType, setUserType] = useState('seekers');
    const [openFaq, setOpenFaq] = useState(null);

    const seekerPlans = [
        {
            name: 'Free',
            id: 'seeker_free',
            price: '$0',
            period: '/forever',
            description: 'Essential tools for casual job hunting and setting up your initial presence.',
            features: [
                'Browse & save up to 10 jobs',
                'Apply to up to 3 jobs per month',
                'Basic professional profile',
                'Email job alerts'
            ],
            cta: 'Get Started',
            href: '/signup',
            popular: false
        },
        {
            name: 'Pro',
            id: 'seeker_pro',
            price: '$19',
            period: '/month',
            description: 'Perfect for active job seekers looking to gain a competitive edge and track applications.',
            features: [
                'Apply to up to 30 jobs per month',
                'Unlimited saved jobs',
                'Advanced application tracking',
                'Salary & market insights'
            ],
            cta: 'Upgrade to Pro',
            href: '/checkout/pro',
            popular: true
        },
        {
            name: 'Premium',
            id: 'seeker_premium',
            price: '$39',
            period: '/month',
            description: 'Maximize your career potential with maximum exposure and complete flexibility.',
            features: [
                'Everything in Pro',
                'Unlimited job applications',
                'Profile boost to elite recruiters',
                'Early access to newly posted jobs',
                'Priority customer support'
            ],
            cta: 'Go Premium',
            href: '/checkout/premium',
            popular: false
        }
    ];

    const recruiterPlans = [
        {
            name: 'Free',
            id: 'recruiter_free',
            price: '$0',
            period: '/forever',
            description: 'Great for a company’s first year of hiring or occasional recruitment needs.',
            features: [
                'Up to 3 active job posts',
                'Basic applicant management tier',
                'Standard listing visibility'
            ],
            cta: 'Start Free Posting',
            href: '/signup?role=recruiter',
            popular: false
        },
        {
            name: 'Growth',
            id: 'recruiter_growth',
            price: '$49',
            period: '/month',
            description: 'Designed for expanding teams needing deeper candidate metrics and more live listings.',
            features: [
                'Up to 10 active job posts',
                'Full candidate applicant tracking',
                'Basic hiring & traffic analytics',
                'Dedicated email support'
            ],
            cta: 'Choose Growth',
            href: '/checkout/growth',
            popular: true
        },
        {
            name: 'Enterprise',
            id: 'recruiter_enterprise',
            price: '$149',
            period: '/month',
            description: 'For high-volume recruitment agencies and major corporate HR pipelines.',
            features: [
                'Up to 50 active job posts',
                'Advanced interactive analytics dashboard',
                'Featured job listings & top placement',
                'Team collaboration & seat permissions',
                'Custom employer branding tools',
                '24/7 Priority VIP support'
            ],
            cta: 'Go Enterprise',
            href: '/checkout/enterprise',
            popular: false
        }
    ];

    const faqs = [
        {
            question: 'Can I cancel my subscription anytime?',
            answer: 'Yes, absolutely. All our premium plans are billed on a month-to-month basis with no long-term commitments. You can cancel directly from your billing settings at any point, and your premium features will remain active until the end of your current billing cycle.'
        },
        {
            question: 'How do refunds work if I change my mind?',
            answer: 'We offer a 14-day money-back guarantee on all first-time purchases. If you are not satisfied with your upgraded tier, reach out to our support team within 14 days of subscribing for a full refund—no questions asked.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We securely process all transactions via Stripe. We accept all major global credit/debit cards (Visa, Mastercard, American Express, Discover) as well as automated local wallets like Apple Pay and Google Pay depending on your location.'
        },
        {
            question: 'Can I switch or upgrade my plan mid-month?',
            answer: 'Yes! You can upgrade or downgrade your tier instantly. If you choose to upgrade mid-cycle, your remaining balance on the previous plan will be automatically prorated and credited towards your new tier immediately.'
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const activePlans = userType === 'seekers' ? seekerPlans : recruiterPlans;

    return (
        <div className="w-full min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-400 relative overflow-hidden">
            {/* Background decorative glow elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                        Pricing Options
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight mt-5 mb-4">
                        Invest in your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">career milestone</span>
                    </h1>
                    <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                        Transparent, predictable pricing models tailored for passionate professionals exploring opportunities and fast-growing organizations building dream teams.
                    </p>
                </div>

                {/* Segmented Toggle Control */}
                <div className="flex justify-center mb-16">
                    <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-xl flex gap-1 shadow-2xl">
                        <button
                            onClick={() => setUserType('seekers')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                userType === 'seekers'
                                    ? 'bg-zinc-800 text-amber-500 shadow-md border border-zinc-700/50'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setUserType('recruiters')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                userType === 'recruiters'
                                    ? 'bg-zinc-800 text-amber-500 shadow-md border border-zinc-700/50'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v14.25M2.25 10.5h18M9 4.5h6m-6 3h6m-6 6h6m-6 3h6M11.25 21v-3.75m0-3h1.5m-1.5 6h1.5m-1.5-13.5h1.5M11.25 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5" />
                            </svg>
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Grid Deck Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
                    {activePlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 border bg-zinc-900/60 backdrop-blur-sm ${
                                plan.popular
                                    ? 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.08)] ring-1 ring-amber-500/20 md:-translate-y-2'
                                    : 'border-zinc-800 hover:border-zinc-700 shadow-xl'
                            }`}
                        >
                            {plan.popular && (
                                <span className="absolute top-0 right-6 -translate-y-1/2 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                                    Most Popular
                                </span>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-zinc-100 mb-2">{plan.name}</h3>
                                <p className="text-zinc-400 text-xs leading-relaxed min-h-[40px] mb-6">
                                    {plan.description}
                                </p>

                                <div className="flex items-baseline mb-6 border-b border-zinc-800/80 pb-6">
                                    <span className="text-4xl font-extrabold text-zinc-100 tracking-tight">{plan.price}</span>
                                    <span className="text-zinc-500 text-sm font-medium ml-1.5">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-zinc-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500 mt-0.5 mr-3 shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                    
                    `{/* payment stripe form */}
                            <form action="/api/checkout_sessions" method="POST">

                                {/* hidden data send korbo  */}
                                <input type='hidden' name='plan_id' value={plan.id}></input>

                                <section>
                                    <button 
                                        type="submit" 
                                        role="link" 
                                        className={`w-full py-6 font-semibold rounded-xl text-sm transition-all duration-200 ${
                                            plan.popular
                                                ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/10'
                                                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                        }`}>

                                        Checkout

                                    </button>
                                </section>
                            </form>`



                            {/* <Link href={plan.href} className="w-full block mt-auto">
                                <Button
                                    className={`w-full py-6 font-semibold rounded-xl text-sm transition-all duration-200 ${
                                        plan.popular
                                            ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-lg shadow-amber-500/10'
                                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/50'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </Link> */}
                        </div>
                    ))}
                </div>

                {/* FAQ Section (Accordion) */}
                <div className="max-w-4xl mx-auto border-t border-zinc-800/60 pt-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-zinc-400 text-sm mt-2">
                            Everything you need to know about plans, cancellation processes, adjustments, and safety.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="border border-zinc-800 bg-zinc-900/30 rounded-xl overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center p-5 text-left font-medium text-zinc-200 hover:text-zinc-100 transition-colors"
                                    >
                                        <span className="text-base">{faq.question}</span>
                                        <span className={`p-1 rounded-md bg-zinc-800/60 text-zinc-400 border border-zinc-700/30 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-500' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen ? 'max-h-40 border-t border-zinc-800/50' : 'max-h-0'
                                        }`}
                                    >
                                        <p className="p-5 text-sm text-zinc-400 leading-relaxed bg-zinc-900/10">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlansPage;