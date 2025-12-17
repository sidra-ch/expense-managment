"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import AvatarUpload from "./AvatarUpload";

export default function ProfileSection() {
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);

  return (
    <section className="flex-1 bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-6">My Profile</h2>

      {/* Username */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div>
          <p className="text-sm font-medium">Sidra.Ch</p>
          <p className="text-xs text-gray-500">
            This is a display name and is not used for authentication
          </p>

          {editing ? (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 border rounded-md px-3 py-1 text-sm"
            />
          ) : (
            <p className="mt-2 text-sm text-gray-800">{username}</p>
          )}
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Pencil className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Avatar */}
      <AvatarUpload />
    </section>
  );
}
