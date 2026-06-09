
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyJObs = async (companyId, status='active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}