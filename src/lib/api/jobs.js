import { serverFetch } from "../core/server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


// সার্ভার থেকে একটি নির্দিষ্ট কোম্পানির জব পোস্ট ফেচ করার জন্য একটি ফাংশন
export const getCompanyJObs = async (companyId, status='active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}

// সার্ভার থেকে সব জব পোস্ট ফেচ করার জন্য একটি ফাংশন
export const getJobs = async () => {
    return serverFetch('/api/jobs')
}


// সার্ভার থেকে একটি নির্দিষ্ট জব পোস্ট ফেচ করার জন্য একটি ফাংশন
export const getJobById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`)
}