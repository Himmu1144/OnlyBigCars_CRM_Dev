import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin } from 'lucide-react';

const GarageSelector = ({ onClose, onSelectGarage }) => {
  const [modelSearchQuery, setModelSearchQuery] = useState('');

  const garages = [
    {
      name: 'Onlybigcars - Own',
      locality: 'Gomechanic- Saket',
      distance: '16.56 KM',
      status: 'Garage Open',
      contact: 'CP Contact : 7428293338',
      mobile: '8368092684'
    },
    // Duplicate entries as shown in the image
    {
      name: 'GoMechanic -Narula Windshield Traders',
      locality: 'Gomechanic- Saket',
      distance: '16.56 KM',
      status: 'Garage Open',
      contact: 'CP Contact : 7428293338',
      mobile: '9312270480'
    },
    {
      name: 'GoMechanic -Narula Windshield Traders',
      locality: 'Gomechanic- Saket',
      distance: '16.56 KM',
      status: 'Garage Open',
      contact: 'CP Contact : 7428293338',
      mobile: '9312270480'
    },
    {
      name: 'GoMechanic -Narula Windshield Traders',
      locality: 'Gomechanic- Lucknow',
      distance: '16.56 KM',
      status: 'Garage Open',
      contact: 'CP Contact : 7428293338',
      mobile: '9312270480'
    }
  ];

  const searchInputRef = useRef(null);
  
  const filteredGarages = modelSearchQuery
    ? garages.filter(garage => 
      garage.name.toLowerCase().includes(modelSearchQuery.toLowerCase()) ||
      garage.locality.toLowerCase().includes(modelSearchQuery.toLowerCase())
    )
    : garages;

  const handleSearch = (e) => {
    setModelSearchQuery(e.target.value);
  };

  const handleGarageSelect = (garage)=> {
    onSelectGarage(garage);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-8">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-white text-lg font-medium">Select Garage</h2>
          <button className="text-white hover:text-gray-200" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
        <input
          ref={searchInputRef}
          type="text"
          value={modelSearchQuery}
          onChange={handleSearch}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Type to search garages..."
        />
          
          <div className="bg-blue-50 p-2 mb-4 mt-4 rounded">
            <p className="text-gray-700">Recommended As Per Nearest Location</p>
          </div>
          
          <div className="space-y-4 mt-4">
            {filteredGarages.length > 0 ? (
              filteredGarages.map((garage, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4"
                onClick={()=> handleGarageSelect(garage)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-gray-700 font-medium mb-2">{garage.name}</h3>
                      <p className="text-sm text-gray-600">Locality : {garage.locality}</p>
                      <p className="text-sm text-gray-600">
                        Distance : {garage.distance}, Status : {garage.status}, {garage.contact}
                        Garage Mobile : {garage.mobile}
                      </p>
                    </div>
                    <button className="flex items-center text-red-600 hover:text-red-700">
                      <MapPin size={20} />
                      <span className="ml-1">DIRECTIONS</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No matching garages found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarageSelector;