## prompt one: to generate the applyPage ---> JobApply form

give me  a job application form for the component below. here using next.js, hero  ui v(3.1.0), tailwindcss, gravity ui icons, lucide react icons. 
import { Button } from '@heroui/react';

i want only to get resume link and some optional information.

already i have a job and applicant information in the component :
import { Button } from '@heroui/react';

const JobApply = ({job, applicant}) => {
    return (
        <div>
            <div className="card py-10 px-6 border shadow backdrop-blur-sm mb-6">
                <h1>Apply for {job.title}</h1>
            <p>Fill out the application form below:</p>

            </div>
            
            <Button variant="primary" size="lg">
                Apply Now
            </Button>
        </div>
    );
};

export default JobApply;

To use the Form  use:
"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

export function Basic() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
}

and use the text field:
import {Input, Label, TextField} from "@heroui/react";

export function Basic() {
  return (
    <TextField className="w-full max-w-64" name="email" type="email">
      <Label>Email</Label>
      <Input placeholder="Enter your email" />
    </TextField>
  );
}

and use the textarea field:
import {TextArea} from "@heroui/react";

export function Basic() {
  return (
    <TextArea
      aria-label="Quick project update"
      className="h-32 w-96"
      placeholder="Share a quick project update..."
    />
  );
}


### prompt 2 (correction)

i want JS code not TS. 

#### prompt 3 (correction)
this form looks not realstic . to change style and position. give me real looking form for post application