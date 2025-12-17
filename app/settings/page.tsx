import SettingsSidebar from "@/components/setting/SettingsSidebar";
import ProfileSection from "@/components/setting/ProfileSection";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Content */}
      <div className="flex px-8 py-6 gap-8">
        <SettingsSidebar />
        <ProfileSection />
      </div>
    </div>
  );
}
