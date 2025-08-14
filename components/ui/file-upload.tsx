"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

import { Upload, X, Image as ImageIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import { api } from "@/lib/api";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  className?: string;
}

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type for images
    if (accept === "image/*" && !file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview URL for the selected file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Simulate upload delay
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post<{ url: string }>("/image", formData);
      const url = res.data.url;
      onChange(url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    onChange("");
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const renderImage = () => {
    if (previewUrl) {
      return (
        <Image
          src={previewUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg border"
          onError={() => setPreviewUrl(null)}
          width={600}
          height={600}
        />
      );
    } else {
      return (
        <div className="w-full h-48 object-cover rounded-lg border flex flex-col items-center justify-center">
          <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Seret dan lepas gambar di sini
          </p>
        </div>
      );
    }
  };

  const renderFile = () => {
    if (previewUrl) {
      return (
        <div className="w-full h-48 object-cover rounded-lg border flex flex-col items-center justify-center">
          <FileIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">File {previewUrl} terupload</p>
        </div>
      );
    } else {
      return (
        <div className="w-full h-48 object-cover rounded-lg border flex flex-col items-center justify-center">
          <FileIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Seret dan lepas file di sini</p>
        </div>
      );
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange({
        target: {
          files: [file],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div
          className="relative w-full"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {accept === "image/*" ? renderImage() : renderFile()}
          {previewUrl && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemoveFile}
              className="absolute top-2 right-2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {isUploading ? "Uploading..." : "Pilih File"}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Instructions */}
      <div className="text-xs text-gray-500">
        {accept === "image/*" ? (
          <p>• Format yang didukung: JPG, PNG, GIF, WebP</p>
        ) : (
          <p>• Format yang didukung: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX</p>
        )}
        <p>• Ukuran maksimal: 5MB</p>
      </div>
    </div>
  );
}
