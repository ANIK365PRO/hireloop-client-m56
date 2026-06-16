"use client";

import React, { useState, useRef } from "react";
import { ArrowUpFromLine, LocationArrow, ChevronDown } from "@gravity-ui/icons";
import { Pencil, Globe, Building2, Users, FileText, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField, Badge } from "@heroui/react";
import Image from "next/image";
import { createCompany } from "@/lib/actions/company";



export default function CompanyProfile({ recruiter, recruiterCompany}) {
 

  // ১. স্টেট ম্যানেজমেন্ট
  
  const [company, setCompany] = useState(recruiterCompany || null); // নো রেজিস্ট্রেশন ভিউ দেখতে শুরুতে null রাখা হয়েছে
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // ফর্ম ফিল্ডস স্টেট
  const [formData, setFormData] = useState({
    name: "",
    industry: "Technology",
    websiteUrl: "",
    location: "",
    employeeCount: "1-10 employees",
    logoUrl: "",
    description: "",
    status: recruiterCompany? recruiterCompany.status : "Pending", // ডিফল্ট স্ট্যাটাস
    recruiterId: recruiter?.id, // কোম্পানি রিক্রুটারের সাথে লিঙ্ক করার জন্য ইউজার আইডি রাখা হচ্ছে
  });

  const fileInputRef = useRef(null);

  // ২. imgbb-তে লোগো আপলোড হ্যান্ডলার
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const imgbbApiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; // আপনার ImgBB API Key এখানে বসাবেন

    const bodyData = new FormData();
    bodyData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: bodyData,
      });
      const data = await response.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, logoUrl: data.data.url }));
      } else {
        alert("Logo upload failed. Try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // ৩. ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCompanyData = {...formData };

    setCompany(newCompanyData); // লোকাল স্টেটে নতুন কোম্পানি ডাটা সেট করা হচ্ছে যাতে তাৎক্ষণিক ভিউ আপডেট হয়

    const payload = await createCompany(newCompanyData); // API কল করে ডাটাবেসে কোম্পানি তৈরি করা হচ্ছে
    console.log("API Response:", payload); 

    if(payload.insertedId){
      alert("Company profile created successfully!");
    } else {
      alert("Failed to create company profile. Please try again.");
    }

    setIsEditModalOpen(false);
  };

  

  // এডিট মুড ওপেন করার সময় আগের ডাটা লোড করা
  const openEditModal = () => {
    if (company) {
      setFormData({ ...company });
    }
    setIsEditModalOpen(true);
  };

  // স্ট্যাটাস ব্যাজের কালার ও আইকন ডাইনামিক করা
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return { color: "success", icon: <CheckCircle2 className="size-4" />, bg: "bg-green-50 text-green-700 border-green-200" };
      case "Rejected":
        return { color: "danger", icon: <XCircle className="size-4" />, bg: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { color: "warning", icon: <AlertCircle className="size-4" />, bg: "bg-amber-50 text-amber-700 border-amber-200" };
    }
  };

  
  return (
    <div className="min-h-screen bg-[#f4f4f5] text-[#18181b] p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-[#e4e4e7] p-8 shadow-sm ">
        
        {/* ================= CONDITION 1: NO COMPANY REGISTERED ================= */}
        {!company?._id ? (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="p-4 bg-[#f4f4f5] rounded-full text-[#71717a]">
              <Building2 className="size-12 text-[#71717a]" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">No Company Registered Yet</h2>
            <p className="text-sm text-[#71717a] max-w-md">
              To setup job posts or manage your organization features, please register your company profile first.
            </p>
            <Button 
              onPress={() => setIsEditModalOpen(true)} 
              className="mt-2 bg-[#18181b] text-white hover:bg-[#27272a] font-medium"
            >
              Register Company
            </Button>
          </div>
        ) : (
          
          /* ================= CONDITION 2: COMPANY IS REGISTERED (VIEW DETAILS) ================= */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e4e4e7] pb-6">
              <div className="flex items-center gap-4">
                {company.logoUrl ? (
                  <Image 
                    src={company.logoUrl} 
                    alt="Company Logo" 
                    className="size-16 rounded-xl object-cover bg-[#f4f4f5] border border-[#e4e4e7]"
                    width={64}
                    height={64}
                  />
                ) : (
                  <div className="size-16 rounded-xl bg-[#f4f4f5] flex items-center justify-center border border-[#e4e4e7]">
                    <Building2 className="size-8 text-[#71717a]" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
                    <span className={`flex items-center gap-1 text-xs py-1 px-2.5 font-medium border rounded-full ${getStatusBadge(company.status).bg}`}>
                      {getStatusBadge(company.status).icon}
                      {company.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#71717a]">{company.industry}</p>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                onPress={openEditModal}
                className="bg-white border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5] flex items-center gap-2"
              >
                <Pencil className="size-4" /> Edit Profile
              </Button>
            </div>

            {/* কোম্পানির অন্যান্য ডিটেইলস গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center gap-3 bg-[#fafafa] p-4 rounded-xl border border-[#e4e4e7]">
                <Globe className="size-5 text-[#71717a]" />
                <div>
                  <p className="text-[#71717a] text-xs font-medium">Website URL</p>
                  <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                    {company.websiteUrl || "Not Provided"}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#fafafa] p-4 rounded-xl border border-[#e4e4e7]">
                <LocationArrow className="size-5 text-[#71717a]" />
                <div>
                  <p className="text-[#71717a] text-xs font-medium">Location</p>
                  <p className="font-semibold text-[#27272a]">{company.location || "Not Provided"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#fafafa] p-4 rounded-xl border border-[#e4e4e7]">
                <Users className="size-5 text-[#71717a]" />
                <div>
                  <p className="text-[#71717a] text-xs font-medium">Employee Count</p>
                  <p className="font-semibold text-[#27272a]">{company.employeeCount}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#fafafa] p-4 rounded-xl border border-[#e4e4e7] md:col-span-2">
                <FileText className="size-5 text-[#71717a] mt-0.5" />
                <div>
                  <p className="text-[#71717a] text-xs font-medium">Brief Description</p>
                  <p className="font-medium mt-1 text-[#3f3f46] leading-relaxed">
                    {company.description || "No description added yet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: REGISTER / EDIT FORM ================= */}
        <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} className='max-h-[80vh] overflow-hidden'>
          <Modal.Backdrop>
            <Modal.Container placement="auto">
              <Modal.Dialog className="sm:max-w-2xl bg-white border border-[#e4e4e7] text-[#18181b]">
                <Modal.CloseTrigger className="text-[#71717a] hover:text-[#18181b]" />
                
                <Modal.Header className="border-b border-[#e4e4e7] pb-4 flex flex-row items-center gap-3">
                  <Modal.Icon className="bg-[#f4f4f5] text-[#18181b]">
                    <Building2 className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading className="text-xl font-bold">
                    {company ? "Update Company Information" : "Register Company Profile"}
                  </Modal.Heading>
                </Modal.Header>
                
                {/* ফর্ম স্ক্রল বিহেভিয়ার হ্যান্ডেল করার জন্য ওয়ান-স্টপ স্ক্রল কন্টেইনার */}
                <Modal.Body className="p-6 max-h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar">
                  <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                    <form id="companyForm" onSubmit={handleSubmit} className="flex flex-col gap-5 pr-1">
                      
                      {/* ২ কলাম গ্রিড লেআউট */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Company Name */}
                        <TextField className="w-full" name="name" type="text" variant="secondary">
                          <Label className="text-[#27272a] text-sm font-semibold mb-1.5 block">Company Name</Label>
                          <Input 
                            className="bg-white border-[#md:border-[#e4e4e7]] text-[#18181b] focus:border-[#18181b]" 
                            placeholder="e.g. Acme Corp" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </TextField>

                        {/* Industry / Category Dropdown */}
                        <div className="flex flex-col">
                          <label className="text-[#27272a] text-sm font-semibold mb-1.5">Industry / Category</label>
                          <div className="relative">
                            <select 
                              className="w-full h-10 px-3 bg-white border border-[#e4e4e7] rounded-lg text-[#18181b] appearance-none focus:outline-none focus:border-[#18181b] focus:ring-1 focus:ring-[#18181b] text-sm transition"
                              value={formData.industry}
                              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            >
                              <option value="Technology">Technology</option>
                              <option value="Design">Design</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Finance">Finance</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#71717a] pointer-events-none" />
                          </div>
                        </div>

                        {/* Website URL */}
                        <TextField className="w-full" name="websiteUrl" type="text" variant="secondary">
                          <Label className="text-[#27272a] text-sm font-semibold mb-1.5 block">Website URL</Label>
                          <div className="flex rounded-lg overflow-hidden border border-[#e4e4e7] focus-within:border-[#18181b] transition">
                            <span className="bg-[#f4f4f5] text-[#71717a] text-xs px-3 flex items-center justify-center border-r border-[#e4e4e7] select-none">
                              https://
                            </span>
                            <Input 
                              className="bg-white text-[#18181b] w-full text-sm rounded-none border-0 focus:ring-0" 
                              placeholder="www.company.com" 
                              value={formData.websiteUrl}
                              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                            />
                          </div>
                        </TextField>

                        {/* Location */}
                        <TextField className="w-full" name="location" type="text" variant="secondary">
                          <Label className="text-[#27272a] text-sm font-semibold mb-1.5 block">Location</Label>
                          <div className="relative flex items-center">
                            <LocationArrow className="absolute left-3 size-4 text-[#71717a]" />
                            <Input 
                              className="bg-white border-[#e4e4e7] text-[#18181b] pl-9 focus:border-[#18181b]" 
                              placeholder="City, Country" 
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                          </div>
                        </TextField>

                        {/* Employee Count Dropdown */}
                        <div className="flex flex-col">
                          <label className="text-[#27272a] text-sm font-semibold mb-1.5">Employee Count Range</label>
                          <div className="relative">
                            <select 
                              className="w-full h-10 px-3 bg-white border border-[#e4e4e7] rounded-lg text-[#18181b] appearance-none focus:outline-none focus:border-[#18181b] focus:ring-1 focus:ring-[#18181b] text-sm transition"
                              value={formData.employeeCount}
                              onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                            >
                              <option value="1-10 employees">1-10 employees</option>
                              <option value="11-50 employees">11-50 employees</option>
                              <option value="51-200 employees">51-200 employees</option>
                              <option value="201+ employees">201+ employees</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#71717a] pointer-events-none" />
                          </div>
                        </div>

                        {/* Company Logo Upload Field */}
                        <div className="flex flex-col">
                          <label className="text-[#27272a] text-sm font-semibold mb-1.5">Company Logo</label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            onChange={handleLogoUpload} 
                            className="hidden"
                          />
                          <div 
                            onClick={() => fileInputRef.current.click()}
                            className="flex items-center gap-4 p-2 bg-white border border-dashed border-[#a1a1aa] rounded-lg cursor-pointer hover:bg-[#f4f4f5] transition duration-200"
                          >
                            <div className="size-10 bg-[#f4f4f5] flex items-center justify-center rounded-md border border-[#e4e4e7]">
                              <ArrowUpFromLine className="size-5 text-[#71717a]" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs font-semibold text-[#18181b]">
                                {isUploading ? "Uploading..." : formData.logoUrl ? "Change logo" : "Upload image"}
                              </p>
                              <p className="text-[10px] text-[#71717a]">PNG, JPG up to 5MB</p>
                            </div>
                            {formData.logoUrl && !isUploading && (
                              <Image src={formData.logoUrl} alt="Preview" className="size-8 ml-auto rounded object-cover border border-[#e4e4e7]" width={32} height={32} />
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Brief Description */}
                      <TextField className="w-full" name="description" variant="secondary">
                        <Label className="text-[#27272a] text-sm font-semibold mb-1.5 block">Brief Description</Label>
                        <textarea 
                          rows={4}
                          className="w-full p-3 bg-white border border-[#e4e4e7] rounded-lg text-[#18181b] text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#18181b] focus:ring-1 focus:ring-[#18181b] transition resize-none"
                          placeholder="Tell us about your company's mission and culture..." 
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </TextField>

                    </form>
                  </Surface>
                </Modal.Body>

                {/* মডাল ফুটার যা স্ক্রল করার সময় নিচে ফিক্সড থাকবে */}
                <Modal.Footer className="border-t border-[#e4e4e7] pt-4">
                  <Button 
                    type="button" 
                    variant="secondary"
                    className="bg-white border border-[#e4e4e7] text-[#18181b] hover:bg-[#f4f4f5]"
                    onPress={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    form="companyForm" // Form ID-র সাথে লিঙ্ক করা যাতে বাইরে থেকেও সাবমিট কাজ করে
                    disabled={isUploading}
                    className="bg-[#18181b] text-white hover:bg-[#27272a] font-semibold"
                  >
                    {company ? "Save Changes" : "Register Profile"}
                  </Button>
                </Modal.Footer>
                
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

      </div>
    </div>
  );
}