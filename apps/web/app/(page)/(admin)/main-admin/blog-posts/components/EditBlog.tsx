"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@chakra-ui/react";
import FileUpload from "../../properties/components/UploadFile";
import { MdArrowBackIosNew } from "react-icons/md";

export default function EditBlog() {
  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState<string[]>([""]); // initialize with one content block
  const [editMode, setEditMode] = useState(false);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleAddContentBlock = () => {
    setContentBlocks([...contentBlocks, ""]);
  };

  const handleContentChange = (index: number, value: string) => {
    const updatedContent = [...contentBlocks];
    updatedContent[index] = value;
    setContentBlocks(updatedContent);
  };

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <div className="flex border-b border-gray-200 pb-2 items-center text-sm justify-between mb-8">
          <div className="flex items-center font-medium gap-1">
            <span className="text-[#858C95]">Admin</span>
            <span className="text-[#116114]">/</span>
            <span className="font-medium text-[#116114]">Add</span>
            <span className="font-medium text-[#116114]">
              / Edit blog posts
            </span>
          </div>
          <Button
            variant="ghost"
            className="text-[#323539] text-sm font-semibold"
          >
            Save as draft
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-medium text-[#323539]">
              Blog Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#E5E5E7] border border-[#116114]"
            />
          </div>
          <div className="flex w-fit mx-auto justify-center">
            <FileUpload
              label="Upload cover images"
              accept="image/*"
              multiple={true}
              id="property-images"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="content"
                className="text-sm font-medium text-gray-700"
              >
                Content
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600"
                onClick={handleAddContentBlock}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Content
              </Button>
            </div>

            {contentBlocks.map((block, index) => (
              <Textarea
                key={index}
                value={block}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="min-h-[200px] !bg-[#E5E5E7] mt-2"
                placeholder={`Content block #${index + 1}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="author"
                className="text-sm font-medium text-gray-700"
              >
                Author
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-[#E5E5E7]"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Date
              </Label>
              <Input
                id="date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#E5E5E7]"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={handleAddContentBlock}
              className="text-gray-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add more
            </Button>
          </div>
        </div>
        <div className="flex justify-between pt-6 items-center pb-4">
          <button className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded">
            Publish
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
          >
            <MdArrowBackIosNew />
            Back to page
          </button>
        </div>
      </div>
    </div>
  );
}
