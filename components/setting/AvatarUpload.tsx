"use client";

import { useState } from "react";
import Image from "next/image";

export default function AvatarUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const imageSrc = image ?? "/image.jpeg"; // public folder image

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">Profile image</p>
        <p className="text-xs text-gray-500">
          Upload your own image as your avatar
        </p>
      </div>

      <label className="relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleUpload}
        />

        <Image
          src={imageSrc}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover border"
        />
      </label>
    </div>
  );
}
