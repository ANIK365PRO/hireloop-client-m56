## prompt one: to generate job card 

    for my next.js(using JS not TS) project . I want to create a job card component (using hero ui, gravity ui, lucied react icons). .

Here is the data , i want to show the importent information in the card ( including company name, logo and other information: you can pic from the data below) and link to apply:

{

  "_id": {

    "$oid": "6a316af26e84880d6c285378"

  },

  "title": "DevOps Engineer",

  "category": "Cloud",

  "type": "full-time",

  "salary": {

    "min": 130000,

    "max": 200000,

    "currency": "USD"

  },

  "location": {

    "city": "Mountain View",

    "country": "USA",

    "remote": true

  },

  "applicationDeadline": "2026-09-08",

  "description": {

    "responsibilities": "Manage cloud infrastructure and deployment pipelines.",

    "requirements": "Kubernetes, Docker, Terraform experience.",

    "benefits": "Free meals, stock grants, hybrid flexibility."

  },

  "companyId": "6a3117572504d306c39c0807",

  "name": "Google",

  "logoUrl": "https://i.ibb.co.com/R4vM1dtB/google.png",

  "status": "active",

  "createdAt": "2026-06-16T10:14:00.000Z"

}



for visualization ues the attached image:

and for the card component elements use the hero ui latest version card structrue like below: import {CircleDollar} from "@gravity-ui/icons";

import {Card, Link} from "@heroui/react";



export function Default() {

  return (

    <Card className="w-[400px]">

      <CircleDollar aria-label="Dollar sign icon" className="text-primary size-6" role="img" />

      <Card.Header>

        <Card.Title>Become an Acme Creator!</Card.Title>

        <Card.Description>

          Visit the Acme Creator Hub to sign up today and start earning credits from your fans and

          followers.

        </Card.Description>

      </Card.Header>

      <Card.Footer>

        <Link

          aria-label="Go to Acme Creator Hub (opens in new tab)"

          href="https://heroui.com"

          rel="noopener noreferrer"

          target="_blank"

        >

          Creator Hub

          <Link.Icon aria-hidden="true" />

        </Link>

      </Card.Footer>

    </Card>

  );

} 

### prompt 2 (correction)
give me component code . and i well feed the data as a prop

### prompt 3: for page 3 column grid  and no job fond
in the page make it 3 column grid layout and i have data in the jobs variable. use it to loop throw



#### -------------------------------

### prompt 4: for jobs Search & Filter  

Now i want to job search and filter option. Give me a component where i can search and also filter by some importent filed of the job. job data is below:

{

  "_id": {

    "$oid": "6a316af26e84880d6c285378"

  },

  "title": "DevOps Engineer",

  "category": "Cloud",

  "type": "full-time",

  "salary": {

    "min": 130000,

    "max": 200000,

    "currency": "USD"

  },

  "location": {

    "city": "Mountain View",

    "country": "USA",

    "remote": true

  },

  "applicationDeadline": "2026-09-08",

  "description": {

    "responsibilities": "Manage cloud infrastructure and deployment pipelines.",

    "requirements": "Kubernetes, Docker, Terraform experience.",

    "benefits": "Free meals, stock grants, hybrid flexibility."

  },

  "companyId": "6a3117572504d306c39c0807",

  "name": "Google",

  "logoUrl": "https://i.ibb.co.com/R4vM1dtB/google.png",

  "status": "active",

  "createdAt": "2026-06-16T10:14:00.000Z"

}



for select : use the component structure or hero ui below:

import {Label, ListBox, Select} from "@heroui/react";



export function Default() {

  return (

    <Select className="w-[256px]" placeholder="Select one">

      <Label>State</Label>

      <Select.Trigger>

        <Select.Value />

        <Select.Indicator />

      </Select.Trigger>

      <Select.Popover>

        <ListBox>

          <ListBox.Item id="florida" textValue="Florida">

            Florida

            <ListBox.ItemIndicator />

          </ListBox.Item>

          <ListBox.Item id="delaware" textValue="Delaware">

            Delaware

            <ListBox.ItemIndicator />

          </ListBox.Item>

          <ListBox.Item id="california" textValue="California">

            California

            <ListBox.ItemIndicator />

          </ListBox.Item>

          <ListBox.Item id="texas" textValue="Texas">

            Texas

            <ListBox.ItemIndicator />

          </ListBox.Item>

          <ListBox.Item id="new-york" textValue="New York">

            New York

            <ListBox.ItemIndicator />

          </ListBox.Item>

          <ListBox.Item id="washington" textValue="Washington">

            Washington

            <ListBox.ItemIndicator />

          </ListBox.Item>

        </ListBox>

      </Select.Popover>

    </Select>

  );

}



for input group: use the code structure below:

"use client";



import {Envelope} from "@gravity-ui/icons";

import {InputGroup, Label, TextField} from "@heroui/react";



export function Default() {

  return (

    <TextField className="w-full max-w-[280px]" name="email">

      <Label>Email address</Label>

      <InputGroup>

        <InputGroup.Prefix>

          <Envelope className="size-4 text-muted" />

        </InputGroup.Prefix>

        <InputGroup.Input className="w-full max-w-[280px]" placeholder="name@email.com" />

      </InputGroup>

    </TextField>

  );

} 


#### prompt 5: for jobs Search & Filer (parent component Correction)
this is a current jobs page : and it is a server component . so give me update version of integration as well as jobFilters component :
import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";


export default async function JobsPage() {

    const jobsData =  await getJobs() || [];
    // console.log('Fetched Jobs:', jobData.length); // ডিবাগিং এর জন্য কনসোলে লগ করা হচ্ছে

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Optional Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-100">Open Positions</h1>
        <p className="text-neutral-400 mt-2 text-sm">Explore our latest job opportunities.</p>
      </div>

      {/* 3-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {jobsData && jobsData.length > 0 ? (
          jobsData.map((job) => (
            <JobCard 
              key={job._id} 
              job={job} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-neutral-500">
            No job listings found.
          </div>
        )}
      </div>
    </div>
  );
}

