import React, { useState, useEffect } from 'react';
import ApartmentCard from '../components/ApartmentCard';
import { useApartments } from '../context/ApartmentsContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Apartments = () => {
  const { apartments, updateApartmentPrice } = useApartments();
  const [filter, setFilter] = useState('available');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [amenityFilter, setAmenityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleUpdatePrice = (id, newPrice) => {
    updateApartmentPrice(id, newPrice);
  };

  const minPrice = Math.min(...apartments.map(a => a.price));
  const maxPrice = Math.max(...apartments.map(a => a.price));
  const uniqueTypes = [...new Set(apartments.map(apt => apt.type))];
  const uniqueAmenities = [...new Set(apartments.flatMap(apt => apt.amenities || []))];

  const filteredApartments = apartments
    .filter((apt) => filter === 'available' ? apt.available : !apt.available)
    .filter((apt) =>
      apt.name.toLowerCase().includes(search.toLowerCase()) ||
      apt.location.toLowerCase().includes(search.toLowerCase())
    )
    .filter((apt) => typeFilter ? apt.type === typeFilter : true)
    .filter((apt) => apt.price >= priceRange[0] && apt.price <= priceRange[1])
    .filter((apt) => amenityFilter ? apt.amenities?.includes(amenityFilter) : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'location':
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);
  const paginatedApartments = filteredApartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-10 min-h-screen">

      {/* Clear LocalStorage button - shown only in development */}
      {import.meta.env.MODE === 'development' && (
        <div className="flex justify-end mb-6 px-2 sm:px-4">
          <button
            onClick={() => {
              localStorage.removeItem('apartments');
              window.location.reload();
            }}
            className="bg-red-600 hover:bg-red-700 shadow-sm px-3 sm:px-4 py-2 sm:py-2 rounded-lg w-full sm:w-auto text-white text-sm sm:text-base transition-all duration-200"
            title="Clear localStorage and reload page"
          >
            Clear LocalStorage (Dev)
          </button>
        </div>
      )}


      <h2 className="mb-6 font-bold text-emerald-700 text-2xl" data-aos="fade-down">
        {filter === 'available' ? 'Available Apartments' : 'Rented Apartments'}
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === 'available' ? 'bg-emerald-600 text-white' : 'bg-white border text-emerald-600 cursor-pointer'}`}
          onClick={() => setFilter('available')}
        >
          Available
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'rented' ? 'bg-emerald-600 text-white' : 'bg-white border text-emerald-600 cursor-pointer'}`}
          onClick={() => setFilter('rented')}
        >
          Rented
        </button>

        <input
          type="text"
          placeholder="Search by name or location"
          className="flex-1 px-4 py-2 border rounded min-w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded text-emerald-600"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded text-emerald-600"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Range Slider */}
      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Price Range</label>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-gray-600 text-sm">Up to ₦{priceRange[1].toLocaleString()}</p>
      </div>

      {/* Amenity Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {uniqueAmenities.map((tag) => (
          <button
            key={tag}
            onClick={() => setAmenityFilter(tag === amenityFilter ? '' : tag)}
            className={`px-3 py-1 text-xs rounded-full border ${tag === amenityFilter ? 'bg-emerald-600 text-emerald-600' : 'bg-white text-emerald-600'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedApartments.map((apartment, i) => (
          <div key={apartment.id} data-aos="fade-up" data-aos-delay={i * 100}>
            <ApartmentCard
              apartment={apartment}
              onUpdatePrice={handleUpdatePrice}
              isAdmin={false}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full border ${currentPage === i + 1 ? 'bg-emerald-600 text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
