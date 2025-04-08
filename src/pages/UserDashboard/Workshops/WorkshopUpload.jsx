import React, { useState } from 'react';
import { useCreateWorkshopMutation } from '../../../features/workshop/workshopApiSlice';
import { FaTimes } from 'react-icons/fa';
import { useCreateGroupMutation } from '../../../features/groups/groupsApiSlice';

const WorkshopUpload = ({ closeModal }) => {
  const [createWorkshop, { isLoading }] = useCreateWorkshopMutation();
  const [workshopData, setWorkshopData] = useState({
    workshop_name: '',
    workshop_description: '',
    workshop_date: '',
    workshop_starttime: '',
    workshop_endtime: '',
    workshop_amount: '',
    images: [],
  });
  const [error, setError] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [createGroup, { isLoading: isLoadingGroup }] = useCreateGroupMutation();

  const validateFields = () => {
    const { workshop_name, workshop_description, workshop_date, workshop_starttime, workshop_endtime, workshop_amount, images } = workshopData;

    if (!workshop_name.trim()) return 'Workshop title is required.';
    if (!workshop_description.trim()) return 'Workshop description is required.';
    if (workshop_description.length > 100 || workshop_description.length < 10) return 'Workshop description must be less than 100 characters and more than 10 characters.';
    if (!workshop_date) return 'Workshop date is required.';
    if (!workshop_starttime) return 'Start time is required.';
    if (!workshop_endtime) return 'End time is required.';
    if (new Date(`1970-01-01T${workshop_endtime}`) <= new Date(`1970-01-01T${workshop_starttime}`)) {
      return 'End time must be after start time.';
    }
    if (!workshop_amount || isNaN(workshop_amount) || workshop_amount <= 100) return 'Workshop amount must be a positive number and more than 100.';
    if (images.length === 0) return 'At least one image is required.';
    if (images.some((file) => file.size > 5 * 1024 * 1024)) return 'Each image must be less than 5MB.';
    
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('Maximum 5 images allowed.');
      e.target.value = '';
      return;
    }
    setError('');
    setWorkshopData((prev) => ({
      ...prev,
      images: files,
    }));

    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then((urls) => setPreviewImages(urls));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      const formData = new FormData();
      Object.keys(workshopData).forEach((key) => {
        if (key !== 'images') {
          formData.append(key, workshopData[key]);
        }
      });
      workshopData.images.forEach((image) => {
        formData.append('img_urls', image);
      });
  
      await createWorkshop(formData).unwrap();
  
      // Group creation after successful workshop creation
      const groupFormData = new FormData();
      groupFormData.append("title", workshopData.workshop_name);
      groupFormData.append("description", workshopData.workshop_description);
      groupFormData.append("profile", workshopData.images[0]); // use first image
  
      await createGroup(groupFormData).unwrap();
  
      closeModal();
    } catch (err) {
      setError(err.data?.message || 'Failed to create workshop or group.');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create Workshop</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workshop Title</label>
              <input
                type="text"
                name="workshop_name"
                value={workshopData.workshop_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="workshop_description"
                value={workshopData.workshop_description}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="workshop_date"
                  value={workshopData.workshop_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  name="workshop_starttime"
                  value={workshopData.workshop_starttime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  name="workshop_endtime"
                  value={workshopData.workshop_endtime}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                name="workshop_amount"
                value={workshopData.workshop_amount}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Images (Max 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB per image</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Workshop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkshopUpload;