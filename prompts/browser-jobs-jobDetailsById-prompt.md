## prompt one: to generate the jobDetails page

I have this data: i want to display job details in a page , where i have the data loaded and this page will habe a apply now button. 

_id
6a316af26e84880d6c285378
title
"DevOps Engineer"
category
"Cloud"
type
"full-time"

salary
Object

location
Object
applicationDeadline
"2026-09-08"

description
Object
companyId
"6a3117572504d306c39c0807"
name
"Google"
logoUrl
"https://i.ibb.co.com/R4vM1dtB/google.png"
status
"active"
createdAt
"2026-06-16T10:14:00.000Z"

current state of the component that loads the data below:
import { getJobById } from "@/lib/api/jobs";


const JobDetailsPage = async ({params}) => {
    const { id } = await params;
    
    const job = await getJobById(id);
    
    // console.log('Job ID from params:', id); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে
    // console.log('Job data in JobDetailsPage:', job); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে
    return (
        <div>
            <h2>Job Details page {id}</h2>
           
        </div>
    );
};

export default JobDetailsPage;