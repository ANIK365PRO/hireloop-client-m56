"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Magnifier } from "@gravity-ui/icons";
import { TextField, Label, InputGroup, Select, ListBox } from "@heroui/react";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize your filter states based on current URL values, fallback to default configurations
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [workplace, setWorkplace] = useState(searchParams.get("workplace") || "all");

  // Push new state parameters to the browser URL string on state updates
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (search) params.set("search", search);
    if (category !== "all") params.set("category", category);
    if (type !== "all") params.set("type", type);
    if (workplace !== "all") params.set("workplace", workplace);

    // Build query endpoint URL route
    const query = params.toString();
    router.push(query ? `?${query}` : window.location.pathname, { scroll: false });
  }, [search, category, type, workplace, router]);

  return (
    <div className="w-full mb-8 p-6 bg-[#121212] border border-neutral-800 rounded-2xl flex flex-wrap gap-4 items-end text-white">
      
      {/* 1. Text Search Input */}
      <TextField 
        className="flex-1 min-w-[200px]" 
        name="search"
        value={search}
        onChange={(value) => setSearch(value)}
      >
        <Label className="text-neutral-400 text-xs font-medium mb-1.5 block">Search Jobs</Label>
        <InputGroup className="bg-[#1c1c1e] border border-neutral-800 rounded-xl focus-within:border-neutral-600 transition-colors h-11">
          <InputGroup.Prefix className="pl-3 flex items-center justify-center">
            <Magnifier className="size-4 text-neutral-500" />
          </InputGroup.Prefix>
          <InputGroup.Input 
            className="w-full bg-transparent text-white placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none" 
            placeholder="Title, company, skills..." 
          />
        </InputGroup>
      </TextField>

      {/* 2. Category Dropdown */}
      <Select 
        className="min-w-[200px]" 
        placeholder="All Categories"
        selectedKey={category}
        onSelectionChange={(key) => setCategory(key)}
      >
        <Label className="text-neutral-400 text-xs font-medium mb-1.5 block">Category</Label>
        <Select.Trigger className="w-full bg-[#1c1c1e] border border-neutral-800 rounded-xl text-sm h-11 px-3 text-neutral-200 flex items-center justify-between hover:border-neutral-700 transition-colors">
          <Select.Value />
          <Select.Indicator className="text-neutral-500 text-xs" />
        </Select.Trigger>
        <Select.Popover className="bg-[#1c1c1e] border border-neutral-800 rounded-xl shadow-xl overflow-hidden text-sm text-neutral-200 min-w-[200px]">
          <ListBox>
            <ListBox.Item id="all" textValue="All Categories" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              All Categories
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="Cloud" textValue="Cloud" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Cloud
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="Web" textValue="Web" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Web
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="Design" textValue="Design" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Design
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* 3. Job Type Dropdown */}
      <Select 
        className="min-w-[180px]" 
        placeholder="All Types"
        selectedKey={type}
        onSelectionChange={(key) => setType(key)}
      >
        <Label className="text-neutral-400 text-xs font-medium mb-1.5 block">Job Type</Label>
        <Select.Trigger className="w-full bg-[#1c1c1e] border border-neutral-800 rounded-xl text-sm h-11 px-3 text-neutral-200 flex items-center justify-between hover:border-neutral-700 transition-colors">
          <Select.Value />
          <Select.Indicator className="text-neutral-500 text-xs" />
        </Select.Trigger>
        <Select.Popover className="bg-[#1c1c1e] border border-neutral-800 rounded-xl shadow-xl overflow-hidden text-sm text-neutral-200 min-w-[180px]">
          <ListBox>
            <ListBox.Item id="all" textValue="All Types" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              All Types
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="full-time" textValue="Full-time" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Full-time
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="part-time" textValue="Part-time" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Part-time
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

      {/* 4. Workplace Arrangement Dropdown */}
      <Select 
        className="w-[180px]" 
        placeholder="All Arrangements"
        selectedKey={workplace}
        onSelectionChange={(key) => setWorkplace(key)}
      >
        <Label className="text-neutral-400 text-xs font-medium mb-1.5 block">Workplace</Label>
        <Select.Trigger className="w-full bg-[#1c1c1e] border border-neutral-800 rounded-xl text-sm h-11 px-3 text-neutral-200 flex items-center justify-between hover:border-neutral-700 transition-colors">
          <Select.Value />
          <Select.Indicator className="text-neutral-500 text-xs" />
        </Select.Trigger>
        <Select.Popover className="bg-[#1c1c1e] border border-neutral-800 rounded-xl shadow-xl overflow-hidden text-sm text-neutral-200 min-w-[180px]">
          <ListBox>
            <ListBox.Item id="all" textValue="All Arrangements" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              All Arrangements
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="remote" textValue="Remote / Hybrid" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              Remote / Hybrid
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="onsite" textValue="On-site" className="px-3 py-2 hover:bg-neutral-800 cursor-pointer flex justify-between items-center">
              On-site
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>

    </div>
  );
}