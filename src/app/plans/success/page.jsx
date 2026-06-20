import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
// Gravity UI Icons for a high-quality production finish
import { CircleCheckFill, Envelope, ArrowLeft } from '@gravity-ui/icons';
import { createSubscription } from '@/lib/actions/subscriptions';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)');

    const {
        status,
        customer_details: { email: customerEmail },
        metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    console.log(metadata.planId)

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        const subsInfo = {
            email: customerEmail,
            planId: metadata.planId
        }


        // update the user table about the new plan
        const result = await createSubscription(subsInfo);
        console.log('subsInfo in success page', result);

        return (
            <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-center items-center p-6 select-none">
                {/* Decorative ambient glow blur background */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

                <section
                    id="success"
                    className="relative max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center overflow-hidden animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
                >
                    {/* Animated Green Checkmark Badge Container */}
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.1)]">
                        <CircleCheckFill className="w-8 h-8 text-emerald-500" />
                    </div>

                    {/* Core Status Message */}
                    <h1 className="text-2xl font-extrabold text-zinc-50 tracking-tight mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        We appreciate your business! Your account features have been provisioned and your plan is now active.
                    </p>

                    {/* Receipt Info Box Card */}
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 text-left space-y-3.5 text-xs mb-8">
                        <div className="flex items-start gap-2.5">
                            <Envelope className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                            <div>
                                <span className="block font-semibold text-zinc-400 mb-0.5">Confirmation Email</span>
                                <span className="text-zinc-200 break-all">{customerEmail}</span>
                            </div>
                        </div>

                        <div className="border-t border-zinc-800/60 pt-3 flex flex-col gap-1 text-zinc-500">
                            <span>Have billing questions or need custom configuration support?</span>
                            <a
                                href="mailto:orders@example.com"
                                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center transition"
                            >
                                orders@example.com
                            </a>
                        </div>
                    </div>

                    {/* Interactive Navigation Calls to Action */}
                    <div className="space-y-3">
                        <Link
                            href="/dashboard"
                            className="block w-full text-center text-xs font-semibold px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-950/30 transition duration-200"
                        >
                            Go to Workspace Dashboard
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 py-1 transition"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Return to Homepage
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}



// import { stripe } from '@/lib/stripe'
// import { redirect } from 'next/navigation'
// import Link from 'next/link'

// export default async function SuccessPage({ searchParams }) {
//   // ১. searchParams প্রোমিশ রেজলভ করা
//   const params = await searchParams
//   const sessionId = params.session_id

//   // ২. সেফটি চেক: সেশন আইডি না থাকলে হোমপেজে রিডাইরেক্ট
//   if (!sessionId) {
//     redirect('/')
//   }

//   try {
//     // Stripe থেকে ডেটা ফেচ করা
//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ['line_items']
//     })

//     // ৩. সেশন স্ট্যাটাস চেক
//     if (session.status === 'open') {
//       redirect('/')
//     }

//     // ৪. সেফলি কাস্টমার ইমেইল বের করা (যাতে ক্র্যাশ না করে)
//     const customerEmail = session.customer_details?.email || 'your email'

//     return (
//       <section className="min-h-[70vh] flex flex-col items-center justify-center px-4">
//         <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
          
//           {/* সাকসেস গ্রিন চেক আইকন */}
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//             </svg>
//           </div>

//           <h1 className="text-3xl font-bold text-gray-900 mb-2">পেমেন্ট সফল হয়েছে!</h1>
//           <p className="text-gray-600 mb-6">আমাদের সাথে কেনাকাটা করার জন্য আপনাকে ধন্যবাদ।</p>
          
//           {/* অর্ডার ও ইমেইল ডিটেইলস */}
//           <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-600 mb-6 border border-gray-200">
//             <p className="mb-2">
//               একটি কনফার্মেশন ইমেইল পাঠানো হয়েছে এই ঠিকানায়: <br />
//               <strong className="text-gray-900 font-medium break-all">{customerEmail}</strong>
//             </p>
//             <p>
//               যেকোনো প্রয়োজনে আমাদের মেইল করুন: {' '}
//               <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-medium">
//                 support@example.com
//               </a>
//             </p>
//           </div>

//           {/* হোমপেজ বাটন */}
//           <Link
//             href="/" 
//             className="inline-block w-full bg-gray-950 text-white font-medium py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
//           >
//             হোমপেজে ফিরে যান
//           </Link>
//         </div>
//       </section>
//     )

//   } catch (error) {
//     console.error('Stripe session retrieval error:', error)
    
//     // ৫. ইনভ্যালিড সেশন আইডি দিলে বা নেটওয়ার্ক এরর হলে এই সুন্দর এরর স্টেটটি দেখাবে
//     return (
//       <section className="min-h-[70vh] flex flex-col items-center justify-center px-4">
//         <div className="max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-2">দুঃখিত, কোনো সমস্যা হয়েছে!</h2>
//           <p className="text-gray-600 mb-4">আপনার পেমেন্ট সেশনটি ভ্যালিড নয় বা খুঁজে পাওয়া যায়নি।</p>
//           <Link href="/" className="text-blue-600 hover:underline">হোমপেজে ফিরে যান</Link>
//         </div>
//       </section>
//     )
//   }
// }