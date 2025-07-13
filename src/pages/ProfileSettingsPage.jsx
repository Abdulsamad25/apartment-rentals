import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import ProfileSettings from '../pages/ProfileSettings';
import {
  updateEmail,
  updatePassword,
  updateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const ProfileSettingsPage = () => {
  const { user, userProfile, loading } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',          
    currentPassword: '',  
  });

  useEffect(() => {
    if (userProfile) {
      setEditForm({
        name: userProfile.name || '',
        email: userProfile.email || '',
        password: '',
        currentPassword: '', 
      });
    }
  }, [userProfile]);

const handleProfileUpdate = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error('No user is logged in');
      return;
    }

    if (!editForm.currentPassword) {
      toast.error('Please enter your current password to proceed');
      return;
    }

    if (!editForm.name && !editForm.email && !editForm.password) {
      toast.error('No changes made to update');
      return;
    }

    //Declare updates array at the top
    const updates = [];

    //Reauthenticate
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      editForm.currentPassword
    );
    await reauthenticateWithCredential(currentUser, credential);

    //Update display name
    if (editForm.name && editForm.name !== currentUser.displayName) {
      updates.push(updateProfile(currentUser, { displayName: editForm.name }));
    }

    //Update email
    if (editForm.email && editForm.email !== currentUser.email) {
      updates.push(updateEmail(currentUser, editForm.email));
    }

    //Update password
    if (editForm.password && editForm.password.length >= 6) {
      updates.push(updatePassword(currentUser, editForm.password));
    }

    //Update Firestore document
    const userRef = doc(db, 'users', currentUser.uid);
    updates.push(updateDoc(userRef, {
      name: editForm.name,
      email: editForm.email
    }));

    // Wait for all updates to complete
    await Promise.all(updates);

    toast.success('Profile updated successfully!');
    setIsEditing(false);
  } catch (error) {
    console.error('Profile update failed:', error);
    toast.error(error.message || 'Failed to update profile');
  }
};

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto p-6 max-w-3xl">
      <ProfileSettings
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userProfile={userProfile}
        editForm={editForm}
        setEditForm={setEditForm}
        handleProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfileSettingsPage;
