"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function ApplyButton({ jobId }) {
  const handleApply = () => {
    // Replace this with your actual application modal or API action
    alert(`Applying for Job ID: ${jobId}`);
  };

  return (
    
    <Link href={`/jobs/${jobId}/apply`}>
        <Button 
            size="lg" 
            radius="md" 
            className="font-semibold shadow-md rounded-sm hover:shadow-lg transition-shadow w-full sm:w-auto bg-violet-500"
            onPress={handleApply}
        >
        Apply for this job 
        </Button>
            
    </Link>

  );
}