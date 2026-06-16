"use client";

import { useState } from "react";
import {
  Input,
  Label,
  TextField,
  TextArea,
  Button,
  Spinner,
  Switch,
  Select,
  ListBox,
  Form,
  toast,
} from "@heroui/react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Wifi,
  FileText,
  Building2,
  CheckCircle,
} from "lucide-react";

import { createPost } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";




export default function PostJobForm({ company }) {
  // console.log('recruiter company info in PostJobForm', company)

  const [loading, setLoading] = useState(false);
  const [isRemote, setIsRemote] = useState(false);

  // const company = {
  //   id: "company_123",
  //   name: "Tech Solutions Ltd",
  //   status: "approved",
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FIXED: Company approval check before allowing job posting

    // if (company.status !== "approved") {
    //   alert("Company not approved yet!");
    //   return;
    // }

    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const jobData = {
        title: formData.get("title"),
        category: formData.get("category"),
        type: formData.get("type"),
        salary: {
          min: Number(formData.get("salaryMin")),
          max: Number(formData.get("salaryMax")),
          currency: formData.get("currency"),
        },
        location: {
          city: isRemote ? null : formData.get("city"),
          country: isRemote ? null : formData.get("country"),
          remote: isRemote,
        },
        applicationDeadline: formData.get("applicationDeadline"),
        description: {
          responsibilities: formData.get("responsibilities"),
          requirements: formData.get("requirements"),
          benefits: formData.get("benefits"),
        },
        
      };
      console.log("JOB DATA:", jobData);

      
      //// await fetch("/api/jobs", { method: "POST", body: JSON.stringify(jobData) });

      const payload = {
        ...jobData,
        companyId: company._id, // কোম্পানির আইডি জব ডেটার সাথে যুক্ত করা হচ্ছে
        name: company.name,  // কোম্পানির নাম জব ডেটার সাথে যুক্ত করা হচ্ছে
        logoUrl: company.logoUrl, // কোম্পানির লোগো ইউআরএল জব ডেটার সাথে যুক্ত করা হচ্ছে
        status: "active",
        // createdAt: new Date(),   // সার্ভার সাইডে তৈরি করা হবে, ক্লায়েন্ট থেকে পাঠানোর দরকার নেই
      };
      console.log('Payload for createPost:', payload)
      
      const response = await createPost(payload)
      console.log('response from createPost:', response)
      
      if(response.insertedId){
        alert("Job posted successfully!")

        e.target.reset();
        setIsRemote(false);
        redirect("/dashboard/recruiter/jobs")
        
      }
      
      
    } catch (err) {
      console.error(err);
      // alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  
  };

  const card = "rounded-2xl border border-gray-200 bg-white shadow-sm p-6 space-y-5";
  const sectionTitle = "text-base font-semibold text-gray-800 flex items-center gap-2 pb-1";
  const fieldLabel = "block text-sm font-medium text-gray-700 mb-1.5";
  const readonlyInput =
    "w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-[11px] text-sm text-gray-400 cursor-not-allowed outline-none select-none";

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 py-10 md:px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-blue-500">
            Recruiter Dashboard
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Post a New Job
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Fill in the details below and publish your listing instantly.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="space-y-5" >

          {/* ── JOB INFORMATION ── */}
          <div className={card}>
            <h2 className={sectionTitle}>
              <Briefcase size={16} className="text-blue-500" />
              Job Information
            </h2>

            {/* Job Title */}
            <TextField name="title" isRequired className="w-full">
              <Label>Job Title</Label>
              <Input placeholder="e.g. Senior Frontend Developer" />
            </TextField>

            {/* Category + Type */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                name="category"
                placeholder="Select category"
                isRequired
                className="w-full"
              >
                <Label>Job Category</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Software" textValue="Software Development">
                      Software Development
                    </ListBox.Item>
                    <ListBox.Item id="Design" textValue="Design">
                      Design
                    </ListBox.Item>
                    <ListBox.Item id="Marketing" textValue="Marketing">
                      Marketing
                    </ListBox.Item>
                    <ListBox.Item id="Sales" textValue="Sales">
                      Sales
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <Select
                name="type"
                placeholder="Select type"
                isRequired
                className="w-full"
              >
                <Label>Job Type</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="full-time" textValue="Full-time">Full-time</ListBox.Item>
                    <ListBox.Item id="part-time" textValue="Part-time">Part-time</ListBox.Item>
                    <ListBox.Item id="contract" textValue="Contract">Contract</ListBox.Item>
                    <ListBox.Item id="internship" textValue="Internship">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Salary */}
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField name="salaryMin" isRequired className="w-full">
                <Label>Min Salary</Label>
                <div className="relative">
                  <DollarSign
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                  />
                  <Input type="number" placeholder="3000" className="pl-8" />
                </div>
              </TextField>

              <TextField name="salaryMax" isRequired className="w-full">
                <Label>Max Salary</Label>
                <div className="relative">
                  <DollarSign
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                  />
                  <Input type="number" placeholder="8000" className="pl-8" />
                </div>
              </TextField>

              <Select
                name="currency"
                defaultSelectedKey="USD"
                className="w-full"
              >
                <Label>Currency</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="USD" textValue="USD">USD</ListBox.Item>
                    <ListBox.Item id="BDT" textValue="BDT">BDT</ListBox.Item>
                    <ListBox.Item id="EUR" textValue="EUR">EUR</ListBox.Item>
                    <ListBox.Item id="GBP" textValue="GBP">GBP</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* ✅ FIXED Remote Toggle — onChange receives boolean in v3 */}
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Wifi
                  size={15}
                  className={isRemote ? "text-blue-500" : "text-gray-400"}
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">Remote Job</p>
                  <p className="text-[11px] text-gray-400">
                    {isRemote
                      ? "Location fields hidden"
                      : "Toggle to mark as fully remote"}
                  </p>
                </div>
              </div>
              <Switch
                isSelected={isRemote}
                onChange={setIsRemote}
                aria-label="Remote Job"
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>

            {/* Location */}
            {!isRemote && (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField name="city" className="w-full">
                  <Label>City</Label>
                  <div className="relative">
                    <MapPin
                      size={13}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                    />
                    <Input placeholder="e.g. Dhaka" className="pl-8" />
                  </div>
                </TextField>

                <TextField name="country" className="w-full">
                  <Label>Country</Label>
                  <Input placeholder="e.g. Bangladesh" />
                </TextField>
              </div>
            )}

            {/* Deadline */}
            <TextField name="applicationDeadline" isRequired className="w-full">
              <Label>Application Deadline</Label>
              <div className="relative">
                <Calendar
                  size={13}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
                <Input type="date" className="pl-8" />
              </div>
            </TextField>
          </div>



          {/* ── JOB DESCRIPTION ── */}
          <div className={card}>
            <h2 className={sectionTitle}>
              <FileText size={16} className="text-blue-500" />
              Job Description
            </h2>

            <TextField name="responsibilities" isRequired className="w-full">
              <Label>Responsibilities</Label>
              <TextArea
                rows={5}
                placeholder="List the main responsibilities, one per line..."
              />
            </TextField>

            <TextField name="requirements" isRequired className="w-full">
              <Label>Requirements</Label>
              <TextArea
                rows={5}
                placeholder="List required skills and experience, one per line..."
              />
            </TextField>

            <TextField name="benefits" className="w-full">
              <Label>
                Benefits{" "}
                <span className="text-gray-400 font-normal text-xs">(optional)</span>
              </Label>
              <TextArea
                rows={4}
                placeholder="e.g. Health insurance, remote work, stock options..."
              />
            </TextField>
          </div>



          {/* ── COMPANY ──
              ✅ FIXED: plain native <input readOnly> — no HeroUI wrapper.
              Avoids ALL prop-leaking issues (isReadOnly, isDisabled leaking to DOM). */}
          <div className={card}>
            <h2 className={sectionTitle}>
              <Building2 size={16} className="text-blue-500" />
              Company
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={fieldLabel}>Company Name</label>
                <input
                  value={company.name}
                  readOnly
                  tabIndex={-1}
                  className={readonlyInput}
                />
              </div>

              <div>
                <label className={fieldLabel}>Status</label>
                <div className="relative">
                  <input
                    value={company.status}
                    readOnly
                    tabIndex={-1}
                    className={`${readonlyInput} pr-10 capitalize`}
                  />
                  {company.status === "approved" && (
                    <CheckCircle
                      size={15}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                  )}
                </div>
              </div>
            </div>


           {/* ✅ FIXED: Company approval warning message (uncomment to show) */}

            {/* {company.status !== "approved" && (
              <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                Your company must be approved before posting jobs.
              </p>
            )} */}


          </div>



          {/* ── SUBMIT ── */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-gray-400">
              Fields marked <span className="text-red-500">*</span> are required
            </p>
            <Button
              type="submit"
              // isDisabled={company.status !== "approved" || loading}
              className="rounded-xl bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-40 transition-colors flex items-center gap-2"
            >
              {loading && <Spinner size="sm" />}
              {loading ? "Publishing…" : "Publish Job"}
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}