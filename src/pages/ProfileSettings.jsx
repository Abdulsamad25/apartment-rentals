import React from 'react';
import { User, Mail, Lock, Save, Edit2 } from 'lucide-react';

const ProfileSettings = ({
  isEditing,
  setIsEditing,
  userProfile,
  editForm,
  setEditForm,
  handleProfileUpdate,
}) => {
  if (!userProfile) {
    return (
      <div className="py-12 text-gray-500 text-sm sm:text-base text-center">
        Loading profile settings...
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className="font-bold text-gray-800 text-xl sm:text-2xl">
          Profile Settings
        </h2>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditForm({ ...userProfile, currentPassword: '', password: '' });
            }
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm sm:text-base transition-all"
        >
          <Edit2 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleProfileUpdate();
        }}
        className="space-y-6 bg-white shadow-md p-6 sm:p-8 rounded-xl"
      >
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">
            <User className="inline mr-2 w-4 h-4" /> Full Name{' '}
            <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editForm.name || ''}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your full name"
              required
            />
          ) : (
            <p className="font-medium text-gray-900 text-base sm:text-lg">
              {userProfile.name || 'N/A'}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">
            <Mail className="inline mr-2 w-4 h-4" /> Email Address{' '}
            <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <input
              type="email"
              value={editForm.email || ''}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter your email"
              required
            />
          ) : (
            <p className="font-medium text-gray-900 text-base sm:text-lg">
              {userProfile.email || 'N/A'}
            </p>
          )}
        </div>

        {/* Current Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">
            <Lock className="inline mr-2 w-4 h-4" /> Current Password{' '}
            <span className="text-red-500">*</span>
          </label>
          {isEditing ? (
            <input
              type="password"
              value={editForm.currentPassword || ''}
              onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter current password"
              required
            />
          ) : (
            <p className="font-medium text-gray-900 text-base sm:text-lg">
              {'•'.repeat(8)}
            </p>
          )}
        </div>

        {/* New Password */}
        {isEditing && (
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              <Lock className="inline mr-2 w-4 h-4" /> New Password
            </label>
            <input
              type="password"
              value={editForm.password || ''}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Enter new password"
            />
          </div>
        )}

        {/* Buttons */}
        {isEditing && (
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg text-white transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditForm({ ...userProfile, currentPassword: '', password: '' });
              }}
              className="hover:bg-gray-50 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;
