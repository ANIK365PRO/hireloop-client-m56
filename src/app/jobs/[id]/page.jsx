import { getJobById } from "@/lib/api/jobs";

import { 
  Card, 
  Chip, 
 
} from "@heroui/react";
import ApplyButton from "./ApplyButton";
import Image from "next/image";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;

console.log(id , 'id');

  const job = await getJobById(id);
//   console.log(job, 'job');

  if (!job) {
    return (
      <div className="flex justify-center items-center h-64 text-danger">
        <p className="text-xl font-semibold">Job not found or has been removed.</p>
      </div>
    );
  }

  const deadline = new Date(job.applicationDeadline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Card className="p-4 shadow-sm border border-default-100">
        
        {/* Header Section using Compound Syntax */}
        <Card.Header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
          <div className="flex items-center gap-4">
            <Image 
              src={job.logoUrl} 
              alt={job.name} 
              width={64} 
              height={64} 
              className="w-16 h-16 text-large bg-default-50 border border-default-200" 
            />
            <div>
              <Card.Title className="text-2xl sm:text-3xl font-bold text-foreground">
                {job.title}
              </Card.Title>
              <Card.Description className="text-lg text-default-500 font-medium">
                {job.name}
              </Card.Description>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Chip color="primary" variant="flat" className="capitalize">
              {job.type}
            </Chip>
            <Chip color="secondary" variant="flat">
              {job.category}
            </Chip>
          </div>
        </Card.Header>

        

        {/* Content Section (Replaced CardBody with Card.Content) */}
        <Card.Content className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 bg-default-50 rounded-xl border border-default-100 mb-6">
            <div>
              <span className="block text-xs font-semibold text-default-400 uppercase tracking-wider">Location</span>
              <span className="text-base font-medium text-default-700">
                {job.location?.city ? `${job.location.city}, ${job.location.country}` : "Remote / Global"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-default-400 uppercase tracking-wider">Salary Range</span>
              <span className="text-base font-medium text-default-700">
                {job.salary?.min && job.salary?.max 
                  ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`
                  : "Negotiable"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-default-400 uppercase tracking-wider">Application Deadline</span>
              <span className="text-base font-semibold text-danger">
                {deadline}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold text-foreground mb-3">Job Description</h3>
            <p className="text-default-600 leading-relaxed whitespace-pre-line">
              {typeof job.description === 'object' ? job.description.full : job.description}
            </p>
          </div>
        </Card.Content>

        

        {/* Footer Section using Compound Syntax */}
        <Card.Footer className="flex justify-between items-center pt-6">
          <div className="text-xs text-default-400">
            Posted on: {new Date(job.createdAt).toLocaleDateString()}
          </div>

           {/* for link button  */}
          <ApplyButton jobId={id} />

        </Card.Footer>
      </Card>
    </main>
  );
};

export default JobDetailsPage;