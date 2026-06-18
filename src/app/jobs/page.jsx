import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters"; // Adjust path as needed
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage({ searchParams }) {
  // Await searchParams in Next.js App Router
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "all";
  const type = params?.type || "all";
  const workplace = params?.workplace || "all";

  const jobsData = (await getJobs()) || [];

  // Filter the fetched jobs on the Server side based on active URL Search Params
  const filteredJobs = jobsData.filter((job) => {
    // 1. Text Search matches Title, Company name, or Requirements
    const matchesSearch =
      !search ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.name?.toLowerCase().includes(search.toLowerCase()) ||
      job.description?.requirements?.toLowerCase().includes(search.toLowerCase());

    // 2. Category Dropdown
    const matchesCategory = category === "all" || job.category === category;

    // 3. Job Type Dropdown
    const matchesType = type === "all" || job.type === type;

    // 4. Workplace Dropdown (Remote/Hybrid vs On-site)
    let matchesWorkplace = true;
    if (workplace === "remote") matchesWorkplace = job.location?.remote === true;
    if (workplace === "onsite") matchesWorkplace = job.location?.remote === false;

    return matchesSearch && matchesCategory && matchesType && matchesWorkplace;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Optional Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Open Positions</h1>
        <p className="text-neutral-400 mt-2 text-sm">Explore our latest job opportunities.</p>
      </div>

      {/* Client Filter Inputs targeting URL Parameters */}
      <div className="max-w-7xl mx-auto px-6">
        <JobFilters />
      </div>

      {/* 3-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredJobs && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard 
              key={job._id?.$oid || job._id} 
              job={job} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-neutral-500">
            No job listings found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}