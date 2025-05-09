import React, { useState, useEffect } from "react";
import { useEditWorkshopMutation } from "../../../features/workshop/workshopApiSlice";
import { FaTimes } from "react-icons/fa";

const WorkshopEdit = ({ closeModal, selectedWorkshop }) => {
  const [updateWorkshop, { isLoading: isUpdating }] = useEditWorkshopMutation();
  const [workshopData, setWorkshopData] = useState({
    workshop_name: "",
    workshop_description: "",
    workshop_date: "",
    workshop_starttime: "",
    workshop_endtime: "",
    workshop_amount: "",
    images: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedWorkshop) {
      setWorkshopData({
        workshop_name: selectedWorkshop.workshop_name || "",
        workshop_description: selectedWorkshop.workshop_description || "",
        workshop_date: selectedWorkshop.workshop_date || "",
        workshop_starttime: selectedWorkshop.workshop_starttime || "",
        workshop_endtime: selectedWorkshop.workshop_endtime || "",
        workshop_amount: selectedWorkshop.workshop_amount || "",
        images: [],
      });
    }
  }, [selectedWorkshop]);

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
      setError("Maximum 5 images allowed");
      e.target.value = "";
      return;
    }
    setWorkshopData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const data = new FormData();
      data.append("name", workshopData.workshop_name);
      data.append("desc", workshopData.workshop_description);
      data.append("date", workshopData.workshop_date);
      data.append("start", workshopData.workshop_starttime);
      data.append("end", workshopData.workshop_endtime);
      data.append("fee", workshopData.workshop_amount);
      data.append("workshop_id", selectedWorkshop.workshop_id);

      // Add actual image files with the correct field name
      if (workshopData.images.length > 0) {
        workshopData.images.forEach((image) => {
          data.append("img_urls", image);
        });
      }
      // Debugging: Log Data contents
      for (let pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      await updateWorkshop(data).unwrap();
      closeModal();
    } catch (err) {
      setError(err.data?.message || "Failed to update workshop");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex mt-20 items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Workshop</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workshop Title
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images (Max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB per image</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Workshop"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkshopEdit;