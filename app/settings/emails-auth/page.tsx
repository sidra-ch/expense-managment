"use client";

import React, { useState } from "react";

export default function EmailsAuthPage() {
  const [email, setEmail] = useState("@mail.com");
  const [password, setPassword] = useState("");
  const [enable2FA, setEnable2FA] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update logic
    alert(
      `Email: ${email}\nPassword: ${password ? "Updated" : "Not Changed"}\n2FA: ${
        enable2FA ? "Enabled" : "Disabled"
      }`
    );
    setPassword(""); // clear password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Emails & Authentication</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={enable2FA}
              onChange={(e) => setEnable2FA(e.target.checked)}
              className="accent-black"
              id="2fa"
            />
            <label htmlFor="2fa" className="text-sm">
              Enable Two-Factor Authentication
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 mt-4"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
