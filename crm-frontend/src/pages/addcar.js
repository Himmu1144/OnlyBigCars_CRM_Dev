import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';

const AddNewCar = ({ onClose, onSubmit }) => {
  const modalRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Car data
  const carBrands = [
    "Aston Martin", "Audi", "Bentley", "BMW", "BYD", "Chevrolet", "Citroen",
    "Datsun", "Daewoo", "DC", "Ferrari", "Fiat", "Force", "Ford", "Hindustan Motors",
    "Honda", "Hummer", "Hyundai", "Isuzu", "Jaguar", "Jayem", "Jeep", "Kia",
    "Lamborghini", "Land Rover", "Lexus", "Mahindra", "Maruti Suzuki", "Maserati",
    "Mercedes", "MG", "Mini", "Mitsubishi", "Nissan", "Opel", "Photon", "Porsche",
    "Premier", "Renault", "Rolls Royce", "Skoda", "Ssangyong", "Tata", "Toyota",
    "Volkswagen", "Volvo"
  ];
  
  const carModelsByBrand = {
    "Aston Martin": ["DB9", "Rapide", "Vantage", "Vanquish"],
    "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "A8 L", "e-tron", "Q2", "Q3", "Q5", "Q7", "Q8", "R8", "RS3", "RS5", "S4", "TT"],
    "Bentley": ["Continental", "Flying Spur", "Mulsanne"],
    "BMW": ["1 Series", "2 Series", "3 Series", "3 Series GT", "5 Series", "5 Series GT", "6 Series", "6 Series GT", "7 Series", "i4", "iX", "M3", "M5", "X1", "X3", "X4", "X5", "X6", "X7", "Z4"],
    "BYD": ["e6"],
    "Chevrolet": ["Aveo", "Beat", "Captiva", "Cruze", "Enjoy", "Forester", "Optra", "Optra Magnum", "Optra SRV", "Sail", "Sail Hatchback", "Spark", "Tavera", "Trailblazer", "UVA"],
    "Citroen": ["C3", "C5 Aircross"],
    "Daewoo": ["Cielo", "Matiz", "Nexia"],
    "Datsun": ["GO", "GO Plus", "Redi Go"],
    "DC": ["Avanti"],
    "Ferrari": ["458 Italia", "458 Speciale", "488", "California", "F12 Berlinetta", "FF"],
    "Fiat": ["Abarth Punto", "Adventure", "Avventura", "Linea", "Linea Classic", "Palio D", "Palio NV", "Palio Stile", "Petra", "Punto", "Punto Evo", "Uno", "Urban Cross"],
    "Force": ["Gurkha", "One", "Trax", "Traveller 3350"],
    "Ford": ["Eco Sport", "Endeavour", "Escort", "Figo", "Figo Aspire", "Fiesta", "Fiesta Classic", "Freestyle", "Fusion", "Ikon", "Mondeo", "Mustang"],
    "Hindustan Motors": ["Ambassador"],
    "Honda": ["Accord", "Accord Hybrid", "Amaze", "Brio", "BRV", "City", "City IDTEC", "City IVTEC", "City ZX", "Civic", "CRV", "Elevate", "Jazz", "Mobilio", "WRV"],
    "Hummer": ["H2", "H3"],
    "Hyundai": ["Accent", "Accent Viva", "Alcazar", "Aura", "Creta", "Elite i20", "Elantra", "Eon", "Exter", "Getz", "Getz Prime", "Grand i10", "Grand i10 Nios", "i10", "i20", "i20 Active", "i20 N Line", "Kona", "SantaFE", "Santro", "Santro Xing", "Sonata", "Sonata Embera", "Sonata Transform", "Tucson", "Venue", "Venue N Line", "Verna", "Verna Fluidic", "Verna Transform", "Xcent"],
    "Isuzu": ["Dmax V Cross", "MU-X", "MU7"],
    "Jaguar": ["F Pace", "F Type", "I-Pace", "XE", "XF", "XJ", "XJ L", "XJR", "XK R"],
    "Jayem": ["Neo"],
    "Jeep": ["Jeep-compass", "Jeep-wrangler"],
    "Kia": ["Carens", "Carnival", "EV6", "Seltos", "Sonet"],
    "Lamborghini": ["Aventador", "Gallardo", "Huracan", "Urus"],
    "Land Rover": ["Defender", "Discovery 4", "Discovery Sport", "Freelander 2", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar", "Range Rover Vogue"],
    "Lexus": ["ES", "LC", "LS", "LX", "NX", "RX"],
    "Mahindra": ["Alturas G4", "Bolero", "Bolero Camper", "Bolero Neo", "Bolero Pickup", "E20 Plus", "Imperio", "KUV 100", "Logan", "Marazzo", "NuvoSport", "Quanto", "Reva", "Scorpio", "Scorpio Getaway", "Scorpio N", "Thar", "TUV 300", "TUV 300 Plus", "Verito", "Verito Vibe CS", "XUV 300", "XUV 500", "XUV 700", "Xylo"],
    "Maruti Suzuki": ["800", "A-Star", "Alto", "Alto 800", "Alto K10", "Baleno", "Celerio", "Ciaz", "Eeco", "Esteem", "Estilo", "Fronx", "Grand Vitara", "Gypsy", "Ignis", "Invicto", "Jimny", "Kizashi", "New Grand Vitara", "Omni", "Ritz", "S-Cross", "S-Presso", "Swift", "Swift Dzire", "SX4", "Versa", "Vitara Brezza", "WagonR", "XL6", "Zen"],
    "Maserati": ["Ghibli", "GranCabrio", "GranTurismo", "Quattroporte"],
    "Mercedes": ["A-Class", "AMG GT", "B-Class", "C-Class", "CLA Class", "CLS Class", "E-Class", "EQC", "EQS", "G63 AMGr", "GL Class", "GLA Class", "GLC", "GLE Class", "GLE43 AMG", "GLS", "ML Class", "R Class", "S-Class", "SL 500 AMG", "SLK Class", "V-Class"],
    "MG": ["Astor", "Gloster", "Hector", "Hector Plus", "ZS EV"],
    "Mini": ["Clubman", "Cooper", "Cooper SE", "Countryman"],
    "Mitsubishi": ["Cedia", "Lancer", "Montero", "Outlander", "Pajero", "Pajero Sport"],
    "Nissan": ["Evalia", "GTR", "Kicks", "Magnite", "Micra", "Micra Active", "Sunny", "Teana", "Terrano", "X-Trail"],
    "Opel": ["Astra", "Corsa"],
    "Photon": ["VIW CS2"],
    "Porsche": ["911", "Boxter", "Cayenne", "Cayman", "Macan", "Panamera", "Taycan", "Taycan Turismo"],
    "Premier": ["Rio"],
    "Renault": ["Captur", "Duster", "Fluence", "Kiger", "Koleos", "Kwid", "Lodgy", "Pulse", "Scala", "Triber"],
    "Rolls Royce": ["Ghost", "Phantom", "Wraith"],
    "Skoda": ["Fabia", "Fabia Scout", "Kodiaq", "Kushaq", "Laura", "Octavia", "Rapid", "Slavia", "Superb", "Yeti"],
    "Ssangyong": ["Rexton"],
    "Tata": ["Altroz", "Aria", "Bolt", "Harrier", "Hexa", "Indica", "Indica eV2", "Indica V2", "Indica Vista", "Indigo", "Indigo CS", "Indigo Marina", "Indigo XL", "Indigo eCS", "Manza", "Nano", "Nano Genx", "Nexon", "Punch", "Safari", "Safari Storme", "Sumo Gold", "Sumo Grande", "Sumo Grande MK II", "Sumo Spacio", "Sumo Victa", "Tiago", "Tiago NRG", "Tigor", "Venture", "Winger", "Xenon", "Zest"],
    "Toyota": ["Alphard", "Camry", "Corolla", "Corolla Altis", "Etios", "Etios Cross", "Etios Liva", "Fortuner", "Glanza", "Hilux", "Innova", "Innova Crysta", "Innova Hycross", "Land Cruiser", "Land Cruiser Prado", "Qualis", "Sera", "Urban Cruiser", "Urban Cruiser Hyryder", "Vellfire", "Yaris"],
    "Volkswagen": ["Ameo", "Beetle", "Cross Polo", "Jetta", "Passat", "Phaeton", "Polo", "T-Roc", "Taigun", "Tiguan", "Vento", "Virtus"],
    "Volvo": ["S40", "S60", "S60 Cross Country", "S80", "S90", "V40", "V40 Cross Country", "V60", "V90", "XC 40", "XC60", "XC90"]
};
  
  const [formData, setFormData] = useState({
    carBrand: '',
    carModel: '',
    fuel: '',
    year: '',
    chasisNo: '',
    regNo: '',
    variant: '[16 DUAL VTV] BASE'
  });

  const [carModels, setCarModels] = useState([]);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    if (formData.carBrand) {
      setCarModels(carModelsByBrand[formData.carBrand] || []);
    } else {
      setCarModels([]);
    }
  }, [formData.carBrand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectBrand = (brand) => {
    setFormData(prev => ({
      ...prev,
      carBrand: brand,
      carModel: ''
    }));
    setIsBrandOpen(false);
  };

  const selectModel = (model) => {
    setFormData(prev => ({
      ...prev,
      carModel: model
    }));
    setIsModelOpen(false);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.carBrand || !formData.carModel || !formData.year) {
      alert('Please fill in all required fields');
      return;
    }

    // Pass the form data to parent component
    onSubmit(formData);
    
    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ padding: '20px' }}>
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="bg-red-600 p-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
          <h2 className="text-white text-lg font-medium">Add New Car</h2>
          <button className="text-white hover:text-gray-200" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Car Brand Dropdown */}
            <div className="flex flex-col relative">
              <label className="text-sm text-gray-600 mb-1">Car Brand *</label>
              <button
                type="button"
                className="p-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white"
                onClick={() => setIsBrandOpen(!isBrandOpen)}
              >
                <span className="text-gray-700">{formData.carBrand || 'Select Car Brand'}</span>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
              {isBrandOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {carBrands.map((brand) => (
                    <button
                      key={brand}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectBrand(brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Model Dropdown */}
            <div className="flex flex-col relative">
              <label className="text-sm text-gray-600 mb-1">Car Model *</label>
              <button
                type="button"
                className={`p-3 border border-gray-300 rounded-lg flex justify-between items-center bg-white ${
                  !formData.carBrand ? 'cursor-not-allowed bg-gray-50' : ''
                }`}
                onClick={() => formData.carBrand && setIsModelOpen(!isModelOpen)}
                disabled={!formData.carBrand}
              >
                <span className="text-gray-700">
                  {formData.carModel || 'Select Car Model'}
                </span>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
              {isModelOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {carModels.map((model) => (
                    <button
                      key={model}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => selectModel(model)}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Rest of the form remains unchanged */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Fuel Type *</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Year *</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter Year (e.g., 2022)"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Chassis No.</label>
              <input
                type="text"
                name="chasisNo"
                value={formData.chasisNo}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter Chassis Number"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Reg No.</label>
              <input
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter Registration Number"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCar;