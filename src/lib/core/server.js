
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


// সার্ভার সাইডে ডেটা ফেচ করার জন্য একটি হেল্পার ফাংশন

export const serverFetch = async(path) =>{  
    const res = await fetch(`${baseUrl}${path}`)
    return res.json()
 }



 // সার্ভার সাইডে ডেটা মিউটেশন করার জন্য একটি হেল্পার ফাংশন

export const serverMutation = async(path, data) =>{
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res.json()
 }