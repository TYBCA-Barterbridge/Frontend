import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch, BiCalendar, BiTime, BiMap, BiUser } from 'react-icons/bi';
import { useGetWorkshopsQuery } from '../../features/workshop/workshopApiSlice';

export default function WorkshopRegistration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: workshops, isLoading } = useGetWorkshopsQuery();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Get unique categories for filter
  const categories = [...new Set(workshops?.map(w => w.category) || [])];

  // Filter workshops
  const filteredWorkshops = workshops?.filter(workshop => {
    const matchesSearch = workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Workshops</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search workshops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded-md"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkshops?.map(workshop => (
          <div key={workshop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={workshop.image}
              alt={workshop.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{workshop.name}</h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <BiCalendar className="mr-2" />
                  <span>{new Date(workshop.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <BiTime className="mr-2" />
                  <span>{workshop.time}</span>
                </div>
                <div className="flex items-center">
                  <BiMap className="mr-2" />
                  <span>{workshop.location}</span>
                </div>
                <div className="flex items-center">
                  <BiUser className="mr-2" />
                  <span>{workshop.instructor}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">${workshop.price}</span>
                <span className="text-sm text-gray-500">
                  {workshop.available_spots} spots left
                </span>
              </div>
              <Link
                to={`/workshop/${workshop.id}`}
                className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkshops?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No workshops found matching your criteria
        </div>
      )}
    </div>
  );
} 