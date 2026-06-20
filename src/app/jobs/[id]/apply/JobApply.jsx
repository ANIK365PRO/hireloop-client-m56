"use client";

import React from "react";
// Hero UI (v3.1.0) components
import { 
  Button, 
  Description, 
  FieldError, 
  Form, 
  Input, 
  Label, 
  TextField, 
  TextArea 
} from "@heroui/react";

// Icons
import { Check } from "@gravity-ui/icons";
import { Link2, FileText, Globe, User, Mail, Briefcase } from "lucide-react";
import { submitApplication } from "@/lib/actions/application";

const JobApply = ({ job, applicant }) => {
    // console.log(applicant)
  // Graceful fallback data for preview safety
  const jobId = job?._id ;
  const jobTitle = job?.title ;
  const companyName = job?.name ;
  const category = job?.category;
  const applicantId = applicant?.id;
  const applicantName = applicant?.name ;
  const applicantEmail = applicant?.email ;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const submissionData = {
        jobId,
        jobTitle,
        companyName,
        category,
        applicantId,
        applicantEmail,
        applicantName,
        ...data

    }
    console.log("Submitting Application Data:", submissionData);

    if(job && applicant){
        const res = await submitApplication(submissionData)
        alert(`Application submitted successfully for ${jobTitle}!`);
    }else{
        alert('somthing wrong')
    }

  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      
      {/* HEADER SECTION: Clean corporate branding summary */}
      <div className="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-md">
              {companyName}
            </span>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight mt-2">
              Apply for {jobTitle}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Review your verified account profile information and complete the deployment requirements below.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Read-only Applicant Profile Snapshot */}
        <div className="lg:col-span-1 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm sticky top-6">
          <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Applicant Profile
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Full Name</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{applicantName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-400 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{applicantEmail}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-400 italic leading-relaxed">
              Account sync active. Changes to your core profile can be modified in your Account Dashboard settings.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Sheet */}
        <div className="lg:col-span-2">
          <Form className="flex flex-col gap-6" onSubmit={onSubmit}>
            
            {/* FORM BLOCK 1: Required Documentation */}
            <div className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Required Documents</h3>
                <p className="text-xs text-zinc-400">Please host files externally and pass the validation endpoint link.</p>
              </div>

              <TextField
                isRequired
                name="resumeLink"
                type="url"
                className="w-full"
                validate={(value) => {
                  if (!value.startsWith("http://") && !value.startsWith("https://")) {
                    return "URL must begin with http:// or https://";
                  }
                  return null;
                }}
              >
                <Label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Link2 className="w-3.5 h-3.5 text-zinc-400" />
                  Resume / CV Cloud Link
                </Label>
                <Input 
                  placeholder="https://drive.google.com/file/... or dropbox.com" 
                  className="mt-1"
                  variant="bordered"
                />
                <Description className="text-zinc-400 text-xs">Ensure permissions are set to public view sharing.</Description>
                <FieldError className="text-danger text-xs font-medium mt-1" />
              </TextField>
            </div>

            {/* FORM BLOCK 2: Supplemental Information */}
            <div className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Supplemental Details</h3>
                <p className="text-xs text-zinc-400">Optional components to enhance your assessment value.</p>
              </div>

              {/* Optional Portfolio Link */}
              <TextField className="w-full" name="portfolioUrl" type="url">
                <Label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  Portfolio or Personal Website
                </Label>
                <Input 
                  placeholder="https://yourportfolio.me" 
                  className="mt-1"
                  variant="bordered"
                />
              </TextField>

              {/* Optional Cover Letter */}
              <div className="flex flex-col gap-1">
                <Label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <FileText className="w-3.5 h-3.5 text-zinc-400" />
                  Cover Letter Note
                </Label>
                <TextArea
                  name="coverLetter"
                  aria-label="Cover letter or additional notes"
                  className="w-full min-h-[140px] mt-1 text-sm"
                  placeholder="Introduce yourself briefly or highlight specific background records that make you exceptional..."
                  variant="bordered"
                />
              </div>
            </div>

            {/* ACTION SUBMIT CONTAINER */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="reset" variant="light" radius="md" className="font-medium text-zinc-500 hover:text-zinc-800">
                Clear
              </Button>
              <Button type="submit" color="primary" radius="md" size="lg" className="font-semibold shadow-md px-8">
                <Check className="w-4 h-4 mr-1" />
                Submit Application
              </Button>
            </div>

          </Form>
        </div>

      </div>
    </div>
  );
};

export default JobApply;