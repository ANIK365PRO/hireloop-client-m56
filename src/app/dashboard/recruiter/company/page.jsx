import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/companies';


const CompanyPage = async () => {

    const user = await getUserSession(); // ইউজার সেশন থেকে রিক্রুটারের তথ্য পাওয়া যাচ্ছে
    // console.log('Logged in User2:', user); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে

    const recruiterCompany = await getRecruiterCompany(user.id); // রিক্রুটারের কোম্পানির তথ্য API থেকে ফেচ করা হচ্ছে
    
    console.log('Recruiter Company:', recruiterCompany); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে

    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={recruiterCompany}></CompanyProfile>

            
        </div>
    );
};

export default CompanyPage;