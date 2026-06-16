import { getLoggedInRecruiterCompany } from "@/lib/api/companies";
import PostJobForm from "./PostJobForm";


const PostJobPage = async() => {
    
    const company = await getLoggedInRecruiterCompany();
    // console.log('Logged in Recruiter Company:', company); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে

    return (
        <div>

            <PostJobForm company={company}></PostJobForm>
            
        </div>
    );
};

export default PostJobPage;