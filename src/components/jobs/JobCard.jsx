import React from "react";
import { Card, Link } from "@heroui/react";
import { 
  Pin, 
  Briefcase, 
  CircleDollar, 
  Calendar 
} from "@gravity-ui/icons";
import Image from "next/image";

export default function JobCard({ job }) {
    // console.log('Job data in JobCard:', job) // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে
  // Destructure with safety fallbacks to avoid crashes if data is missing
  const {
    title = "Job Title",
    type = "Full-time",
    salary = { min: 0, max: 0, currency: "USD" },
    location = { city: "Remote", country: "", remote: true },
    applicationDeadline = "",
    description = { responsibilities: "" },
    name = "Company Name",
    logoUrl = "",
    status = "active"
  } = job || {};

  // Format salary to a readable string (e.g., $130k–$200k)
  const formatSalary = (val) => {
    return val >= 1000 ? `${val / 1000}k` : val;
  };

  // Format date safely
  const formattedDeadline = applicationDeadline 
    ? new Date(applicationDeadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <Card className=" bg-[#121212] border border-neutral-800 text-white p-6 rounded-3xl shadow-xl flex flex-col gap-5">
      
      {/* Company Header Info */}
      <div className="flex items-center gap-3">
        {logoUrl ? (
          <Image 
            src={logoUrl} 
            alt={`${name} logo`} 
            className="w-12 h-12 object-contain rounded-xl bg-neutral-900 p-1.5 border border-neutral-800"
            width={40}
            height={40}
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-neutral-400">
            {name.charAt(0)}
          </div>
        )}
        <span className="text-neutral-400 font-medium text-sm">{name}</span>
      </div>

      {/* Main Content */}
      <Card.Header className="p-0 flex flex-col items-start gap-2">
        <Card.Title className="text-2xl font-bold tracking-tight text-neutral-100">
          {title}
        </Card.Title>
        <Card.Description className="text-neutral-400 text-sm leading-relaxed mt-1">
          {description.responsibilities}
        </Card.Description>
      </Card.Header>

      {/* Metadata Badges */}
      <div className="flex flex-wrap gap-2 text-xs font-medium text-neutral-300">
        {/* Location Badge */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-neutral-800">
          <Pin className="text-[#e2a8ff] size-3.5" />
          <span>{`${location.city}, ${location.country}`}</span>
        </div>

        {/* Type / Work Arrangement Badge */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-neutral-800 capitalize">
          <Briefcase className="text-[#e2a8ff] size-3.5" />
          <span>{location.remote ? "Hybrid / Remote" : type}</span>
        </div>

        {/* Salary Badge */}
        <div className="flex items-center gap-1.5 bg-[#1c1c1e] px-3 py-1.5 rounded-full border border-neutral-800">
          <CircleDollar className="text-[#e2a8ff] size-3.5" />
          <span>
            {salary.currency === "USD" ? "$" : ""}
            {formatSalary(salary.min)}–{salary.currency === "USD" ? "$" : ""}
            {formatSalary(salary.max)}/year
          </span>
        </div>
      </div>

      {/* Deadline Info */}
      {applicationDeadline && (
        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
          <Calendar className="size-3.5" />
          <span>Deadline: {formattedDeadline}</span>
        </div>
      )}

      {/* Footer / Apply Link */}
      <Card.Footer className="p-0 mt-2 flex justify-between items-center">
        <Link
          aria-label={`Apply Now for ${title} at ${name}`}
          href={`/jobs/${job?._id}`} // Replace with your routing logic
          className="text-white hover:text-neutral-300 font-medium flex items-center gap-2 transition-colors text-sm group"
        >
          Apply Now
          <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-1 text-violet-500">
            →
          </span>
        </Link>
        
        {status && (
          <span className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
            {status}
          </span>
        )}
      </Card.Footer>
    </Card>
  );
}