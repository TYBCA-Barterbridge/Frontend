import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useSearchAllMutation } from "../../features/search/searchApiSlice";
import { debounce } from 'lodash';
import { setselectedgood } from "../../features/good/goodSlice";
import { setselectedskill } from "../../features/skill/skillSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth"

const SearchResult = ({ type, name, image, onClick, item }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md"
  >
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
      <img
        src={
          type === 'Skill' 
            ? (item?.Skill_imgs?.[0]?.image_url || '/skillDefault.png')
            : type === 'Good'
            ? (item?.Good_imgs?.[0]?.img_url || '/goodDefault.png')
            : (image || 'https://via.placeholder.com/40')
        }
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-900">
        {type === 'Skill' ? item.skill_name : 
         type === 'Good' ? item.good_name : 
         type === 'User' ? item.User.username : name}
      </p>
      <p className="text-xs text-gray-500">{type}</p>
    </div>
    <div>
      {(type === "Good" || type === "Skill") && (
        <p className="text-sm font-semibold text-gray-600">
          ₹{type === "Good" ? item.good_amount : item.skill_amount}
        </p>
      )}
    </div>
  </div>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState({ goods: [], skills: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchAll] = useSearchAllMutation();
  const { username, profile } = useAuth();
  console.log(username, profile)

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search function
  const debouncedSearch = debounce(async (query) => {
    if (query.length < 1) {
      setSearchResults({ goods: [], skills: [], users: [] });
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchAll(query).unwrap();
      setSearchResults(results);
      console.log("results", results);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults({ goods: [], skills: [], users: [] });
    } finally {
      setIsSearching(false);
    }
  }, 300);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleResultClick = (type, item) => {
    setShowResults(false);
    setSearchQuery('');
    
    switch (type) {
      case 'good':
        dispatch(setselectedgood({selectedgood: item}));
        navigate(`/product`);
        break;
      case 'skill':
        dispatch(setselectedskill({selectedskill: item}));
        console.log("item", item);
        navigate(`/product`);
        break;
      case 'user':
        navigate(`/Users/${item.User.user_id}`);
        break;
      default:
        break;
    }
  };

  return (
    <nav className="flex items-center justify-between w-full px-4 md:px-8 py-4 bg-[#1B6392] text-white shadow-md sticky top-0 z-50 backdrop-blur-md">
      {/* Left Section: Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold text-white no-underline">
        BarterBridge
      </Link>

      {/* Center Section: Search Bar (Hidden when menu is open) */}
      {!isOpen && (
        <div ref={searchRef} className="relative flex-grow mx-4 md:mx-8 max-w-xs md:max-w-lg">
          <div className="flex items-center bg-white rounded-md shadow-md">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search goods, skills or @users"
              className="w-full h-10 px-4 text-sm md:text-base outline-none placeholder-gray-400 text-gray-500 rounded-l-md"
            />
            <button className="px-3 py-2 rounded-r-md hover:bg-gray-100 transition">
              <FaSearch className="text-gray-600" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {showResults && !isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {searchResults.goods?.length > 0 && (
                <div className="p-2">
                  <h3 className="text-xs font-semibold text-gray-500 px-2 mb-1">GOODS</h3>
                  {searchResults.goods.map(good => (
                    <SearchResult
                      key={good.good_id}
                      type="Good"
                      name={good.good_name}
                      image={good.image}
                      item={good}
                      onClick={() => handleResultClick('good', good)}
                    />
                  ))}
                </div>
              )}

              {searchResults.skills?.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 px-2 mb-1">SKILLS</h3>
                  {searchResults.skills.map(skill => (
                    <SearchResult
                      key={skill.skill_id}
                      type="Skill"
                      name={skill.skill_name}
                      item={skill}
                      onClick={() => handleResultClick('skill', skill)}
                    />
                  ))}
                </div>
              )}

              {searchResults.users?.length > 0 && (
                <div className="p-2 border-t border-gray-100">
                  <h3 className="text-xs font-semibold text-gray-500 px-2 mb-1">USERS</h3>
                  {searchResults.users.map(user => (
                    <SearchResult
                      key={user.User.user_id}
                      type="User"
                      name={user.User.username}
                      image={user.User.profilepic}
                      item={user}
                      onClick={() => handleResultClick('user', user)}
                    />
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {searchQuery && !isSearching && 
               !searchResults.goods?.length && 
               !searchResults.skills?.length && 
               !searchResults.users?.length && (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 p-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Right Section: Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation Icons */}
      <ul className="hidden md:flex gap-6 md:gap-12 items-center">
        <li className="flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-110">
          <Link to="/dashboard">
            <img
              src={profile ? profile : `https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF`}
              alt="Profile"
              className="w-12 h-12 rounded-full"
             />
          </Link>
          <span className="text-sm font-semibold">{username}</span>
        </li>
      </ul>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1B6392] py-6 flex flex-col items-center space-y-6 shadow-lg">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={profile ? profile : `https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF`}
              alt="Profile"
              className="w-7 h-7"
            />
            {username}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
