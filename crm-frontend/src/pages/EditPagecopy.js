import Layout from '../components/layout';
import GarageSelector from '../components/GaragePop.js';
import { Alert } from 'react-bootstrap';
import './editpage.css';
import React, { useState, useContext } from 'react';
import { Card, Button, Collapse, Form, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import AddNewCar from './addcar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaChevronDown, FaChevronUp, FaEdit } from 'react-icons/fa';

const EditPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const services = ['Car Service', 'AC Service & Repair','Complete Car Inspection','Denting & Painting','Detailing for Luxury Cars','Brakes & Suspension','Car Battery & Electricals','Tyre & Wheel Care','Cleaning & Grooming','Clutch & Body Parts','Insurance Services & SOS-Emergency','Windshields & Lights'];
  const [selectedService, setSelectedService] = useState('Car Service');

  const [selectedGarage, setSelectedGarage] = useState({
    name: 'OnlyBigCars-Shiv Petrolium',
    locality: 'Sec-15A Faridabad',
    distance: '2.31 K.M.',
    status: 'Open'
  });

  const handleGarageSelect = (garage) => {
    // Update selectedGarage state
    setSelectedGarage({
      name: garage.name,
      locality: garage.locality, 
      distance: garage.distance,
      status: garage.status.replace('Garage ', '')
    });
  
    // Sync with formState.workshop
    setFormState(prev => ({
      ...prev,
      workshop: {
        ...prev.workshop,
        name: garage.name,
        locality: garage.locality,
        status: garage.status.replace('Garage ', '')
      }
    }));
  
    setShowGaragePopup(false);
  };


  
  
  const [formState, setFormState] = useState({
    overview: {
      tableData: [],
      caComments: '',
      total: 0,
    },
    customerInfo: {
      mobileNumber: '',
      customerName: '',
      source: '',
      whatsappNumber: '',
      customerEmail: '',
      languageBarrier: false
    },
    location: {
      address: '',
      city: '',
      state: '',
      buildingName: '',
      flatNumber: '',
      landmark: ''
    },
    cars: [],
    selectedServices: [],
    arrivalStatus: {
      leadStatus: '',
      arrivalMode: '',
      disposition: '',
      dateTime: ''
    },
    workshop: {
      name: '',
      locality: '',
      status:'',
      ca: '',
      cce: '',
      comments: '',
      
    },
    basicInfo: {
      carType : '',
    },
  });



  const calculateTotalAmount = (tableData) => {
    return tableData.reduce((sum, row) => {
      const rowTotal = parseFloat(row.total) || 0;
      return sum + rowTotal;
    }, 0);
  };

  // Modify the existing table row total change handler
  const handleTotalChange = (index, value) => {
    const newTableData = [...formState.overview.tableData];
    newTableData[index].total = value;
    
    // Calculate new total amount
    const newTotal = calculateTotalAmount(newTableData);
    
    setFormState(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        tableData: newTableData,
        total: newTotal
      }
    }));
  };

  const addServiceToTable = (service) => {
    const newTableRow = {
      type: selectedService || 'General',
      name: service.title,
      comments: '',
      workdone: `${service.duration}, ${service.frequency}`,
      determined: false,
      qt: 1,
      total: 0
    };

    setFormState(prev => ({
      ...prev,
      overview: {
        ...prev.overview,
        tableData: [...prev.overview.tableData, newTableRow]
      }
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (section, field, value) => {
    setFormState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddCar = (newCar) => {
    setFormState(prev => ({
      ...prev,
      cars: [...prev.cars, newCar]
    }));
    setShowAddCarModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/edit-form-submit/', 
        formState,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 201) {
        navigate('/', { 
          state: { message: 'Lead added successfully!' }
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      setError(errorMessage);
      if (error.response?.status === 401) {
        // Handle unauthorized - redirect to login
        navigate('/login');
      } else {
        alert('Error submitting form: ' + errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceCards = {
    'Car Service': [
      {
        id: 1,
        title: "Comprehensive Service",
        duration: "6 Hrs Taken",
        frequency: "Every 10,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 2,
        title: "Standard Service",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 3,
        title: "Basic Service",
        duration: "2 Hrs Taken",
        frequency: "Every 3,000 km (Recommended)",
        price: "Determine"
      }
    ],
    'AC Service & Repair': [
      {
        id: 1,
        title: "Comprehensive AC Service",
        duration: "6 Hrs Taken",
        frequency: "Every 10,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 2,
        title: "Regular AC Service",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 3,
        title: "AC Blower Motor Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 4,
        title: "Cooling Coil Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 5,
        title: "Condenser Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 5,
        title: "Compressor Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 6,
        title: "Heating coil Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 7,
        title: "V-Belt Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 8,
        title: "Radiator Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 9,
        title: "Radiator Fan Motor Replacement",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      {
        id: 10,
        title: "Radiator Flush & Clean",
        duration: "4 Hrs Taken",
        frequency: "Every 5,000 km (Recommended)",
        price: "Determine"
      },
      
    ],
    
  };  

  // Modify the overview table section in the return statement to include row deletion
  const handleDeleteRow = (index) => {
    setFormState(prev => {
      const newTableData = prev.overview.tableData.filter((_, i) => i !== index);
      return {
        ...prev,
        overview: {
          ...prev.overview,
          tableData: newTableData,
          total: calculateTotalAmount(newTableData)
        }
      };
    });
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  // Get the appropriate cards based on selected service
  const getDisplayCards = () => {
    return selectedService && serviceCards[selectedService] 
      ? serviceCards[selectedService] 
      : serviceCards.default;
  };

  const [showAlert, setShowAlert] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenRight, setIsOpenRight] = useState(false); // Changed to true for default open state
  const [isOpenLeft, setIsOpenLeft] = useState(false); // Changed to true for default open state

  const [source, setSource] = useState('Checkout');
  const [customer, setCustomer] = useState('Customer');
  const [customerNumber, setCustomerNumber] = useState('6381234057');
  const [dateValue, setDateValue] = useState('')
  const [showGaragePopup, setShowGaragePopup] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  // Car Card Component
  const CarCard = ({ car, onEdit }) => (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div>
          <img
            src="https://onlybigcars.com/wp-content/uploads/2024/12/image_22.jpeg"
            alt={`${car.carBrand} ${car.carModel}`}
            className="mb-2"
          />
          <div className='flex justify-between'>
            <div>
              <div className="text-sm font-medium">{`${car.carBrand} ${car.carModel}`}</div>
              <div className="text-xs text-gray-600">{`${car.year} ${car.variant || ''}`}</div>
              <div className="text-xs text-gray-500">{car.chasisNo}</div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                onClick={() => onEdit(car)}
              >
                <FaEdit size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add this function after other state definitions
  const handleAddEmptyRow = () => {
    const emptyRow = {
      type: '',
      name: '',
      comments: '',
      workdone: '',
      determined: false,
      qt: 1,
      total: 0
    };
  
    setFormState(prev => {
      const newTableData = [...prev.overview.tableData, emptyRow];
      return {
        ...prev,
        overview: {
          ...prev.overview,
          tableData: newTableData,
          total: calculateTotalAmount(newTableData)
        }
      };
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        {/* {showAlert && (
          <Alert
            variant="primary"
            onClose={() => setShowAlert(false)}
            dismissible
            className="edit-page-alert"
            style={{ marginTop: '0.2em' }}
          >

            <p>Try to pitch for Pickup, as Pickup conversion is~50% higher then walkin.</p>
          </Alert>
        )} */}

        {/* Left Sidebar - Fixed */}

        <div className="flex h-[calc(90vh-76px)]" style={{ padding: "6px", marginBottom: "5em" }}>
          <div className="w-1/4 bg-gray-50 p-2 top-[76px] h-[calc(90vh-76px)] overflow-y-auto">
            <div className="dropdown-container">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="dark"
                className={`w-full d-flex justify-content-between align-items-center rounded-bottom-0 ${isOpen ? 'border-bottom-0' : ''}`}
              >
                Last Service
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </Button>

              <Collapse in={isOpen}>
                <div>
                  <Card className="rounded-top-0 border-top-0">
                    <Card.Body>
                      <div>
                        <Button variant="outline-dark" className="w-full text-left cce_btn">
                          CCE Comments
                        </Button>
                      </div>


                      <div>
                        <div className="mt-3">
                          <p className="mb-1">Clutch Set Replacement L 6599 Clutch Bearing Replacement M:2008</p>
                          <p className="text-muted mb-0">CCE-Gqn HqAmanjeet Kumar</p>
                          <small className="text-muted">09:52am 15-May-23</small>
                        </div>

                        <div className="mt-3">
                          <p className="mb-1">Live-assigned lead to Gqn Hq-Amanjeet Kumar</p>
                          <p className="text-muted mb-0">CCE:ML User</p>
                          <small className="text-muted">09:47am 15-May-23</small>
                        </div>


                      </div>

                    </Card.Body>
                  </Card>
                </div>
              </Collapse>
            </div>


            <div className="dropdown-container" style={{ marginTop: "15px" }}>
              <Button
                onClick={() => setIsOpenRight(!isOpenRight)}
                variant="dark"
                className={`w-full d-flex justify-content-between align-items-center rounded-bottom-0 ${isOpenRight ? 'border-bottom-0' : ''}`}
              >
                Actions Taken
                {isOpenRight ? <FaChevronUp /> : <FaChevronDown />}
              </Button>

              <Collapse in={isOpenRight}>
                <div>
                  <Card className="rounded-top-0 border-top-0">
                    <Card.Body>
                      <div>Right content</div>
                    </Card.Body>
                  </Card>
                </div>
              </Collapse>
            </div>


            <div className="dropdown-container" style={{ marginTop: "15px" }}>
              <Button
                onClick={() => setIsOpenLeft(!isOpenLeft)}
                variant="dark"
                className={`w-full d-flex justify-content-between align-items-center rounded-bottom-0 ${isOpenLeft ? 'border-bottom-0' : ''}`}
              >
                Lead Timeline
                {isOpenLeft ? <FaChevronUp /> : <FaChevronDown />}
              </Button>

              <Collapse in={isOpenLeft}>
                <div>
                  <Card className="rounded-top-0 border-top-0">
                    <Card.Body>
                      <div>Left content</div>
                    </Card.Body>
                  </Card>
                </div>
              </Collapse>
            </div>



          </div>




          {/* Middle Section - Scrollable */}


          <div className="w-3/4 p-1 overflow-y-auto h-[calc(90vh-76px)]" >



            {/* <span className="px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-md">
                          ACTIVE
                      </span>
                      <h2 className="text-xl font-bold mb-4">Main Content</h2> */}


            {/* Add dummy content to test scrolling */}
            {/* {Array(20).fill(0).map((_, i) => (
                          <div key={i} className="mb-4">
                              <h3>Section {i + 1}</h3>
                              <p>Content for section {i + 1}</p>
                          </div>
                      ))} */}


            <div className="section1" style={{
              display: 'flex', justifyContent: "start",
              flexDirection: 'row', alignItems: 'center'
            }}>
              {/* <div className="section1-left" style={{maxWidth: "50%", border:"1px solid red"}}> 
                              <div style={{background:"#dee1e6", width:'auto'}}>
                                  sadw
                              </div>
                          </div>


                          <div className="section1-right" style={{width: "50%",border:"1px solid red"}}> Right sec </div> */}

            </div>


            <div className="p-2 border border-gray-200 w-full font-sans relative">

              <div className='relative' style={{ padding: "6px", border: "6px solid #f9f9fb", borderRadius: "4px" }}>
                {/* Top Section */}
                <div className="flex justify-between">
                  {/* Order Info Box */}
                  <div className="p-3 border border-gray-200 rounded" style={{ backgroundColor: "#DEE1E6" }}>
                    <div style={{ backgroundColor: "white", border: "1px solid black", borderRadius: "4px", padding: "10px" }}>
                      <p className="text-sm m-0">Order Id:20230515359451</p>
                      <p className="text-sm my-1">Converted By: Gqn Hq Amanjeet Kumar</p>
                    </div>
                    {/* Payment Status Box */}
                    <div className="mt-3 p-3 rounded" style={{ background: "#DEE1E6" }}>
                      <p className="text-sm m-0">Payment Status: Payment Failed</p>
                      <p className="text-sm my-1">Amount Paid: 100 Rs.</p>
                    </div>
                  </div>

                  {/* Right Side Info */}
                  <div className="text-left p-2">
                    <p className="text-sm m-0">L-6381234057_9FX7U</p>
                    <p className="text-sm my-1 font-bold">HONDA JAZZ PETROL</p>
                    <p className="text-xs text-gray-500 my-1">Updated At:</p>
                    <p className="text-xs m-0">15-May-2023 10:01:18 am</p>
                    <p className="text-xs text-gray-500 my-1">Created At:</p>
                    <p className="text-xs m-0">15-May-2023 09:47:30 am</p>
                  </div>



                </div>

                <div className='flex justify-between'>
                  {/* Add Lead Button */}
                  <div className="mt-2">
                    <button type='button' className="px-3 py-1 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300" style={{ fontSize: "14px" }}>
                      Add Lead
                    </button>
                  </div>


                  {/* Dropdown Menu - positioned absolutely */}
                  <div className="mt-2">
                    <select
                      value={formState.basicInfo.carType} // Add this
                      onChange={(e) => handleInputChange('basicInfo', 'carType', e.target.value)} // Add this
                      className="p-2 border border-gray-200 rounded min-w-[120px]"
                    >
                      <option value="">Luxury/Normal</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Bottom Section */}
              <div className="mt-4 p-3 flex gap-4">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={formState.customerInfo.mobileNumber}
                    onChange={(e) => handleInputChange('customerInfo', 'mobileNumber', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Mobile Number"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={formState.customerInfo.customerName}
                    onChange={(e) => handleInputChange('customerInfo', 'customerName', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Customer Name"
                  />
                </div>

                <div className="flex-1">
                  <select
                    value={formState.customerInfo.source}
                    onChange={(e) => handleInputChange('customerInfo', 'source', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200" style={{ color: "#9ca3af" }}
                  >
                    <option value="">Source</option>
                    <option value="inbound">inbound</option>
                    <option value="outbound">outbound</option>
                    <option value="Website">Website</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Reference">Reference</option>
                    <option value="B2B">B2B</option>
                    <option value="SMS">SMS</option>
                  </select>
                </div>
              </div>

              <div className="p-3 flex gap-4">
                <div className="flex-1">
                  <input
                    type="tel"
                    value={formState.customerInfo.whatsappNumber}
                    onChange={(e) => handleInputChange('customerInfo', 'whatsappNumber', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Whatsapp Number"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="email"
                    value={formState.customerInfo.customerEmail}
                    onChange={(e) => handleInputChange('customerInfo', 'customerEmail', e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    placeholder="Customer Email"
                  />
                </div>

                <div className="flex-1">
                  <Button variant="outline-dark"
                    className="w-100 d-flex align-items-center justify-content-center">
                    Language Barrier
                  </Button>
                </div>

              </div>

              {/* Description Section */}
              <div className="m-3 mt-2 bg-gray-50 p-4 rounded">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs">
                    i
                  </div>
                  <p className="text-sm font-bold m-0">Source Description</p>
                </div>
                <p className="text-xs text-gray-600 m-0">
                  Please mention-This cal is regarding the Interest that you shown in our services/fleet the user/Mention the Name/Car model and location before start pitching
                </p>
              </div>


            </div>


            <div className="w-full p-2 rounded-lg">
              {/* Location Header */}
              <div className="text-gray-700 mb-4 mt-3" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Location</div>

              {/* Location Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  value={formState.location.address}
                  onChange={(e) => handleInputChange('location', 'address', e.target.value)}
                  className="col-span-3 md:col-span-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Address"
                />
                <select
                  value={formState.location.city}
                  onChange={(e) => handleInputChange('location', 'city', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>City</option>
                </select>
                <select
                  value={formState.location.state}
                  onChange={(e) => handleInputChange('location', 'state', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>State</option>
                </select>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  value={formState.location.buildingName}
                  onChange={(e) => handleInputChange('location', 'buildingName', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Building Name (Optional)"
                />
                <input
                  type="text"
                  value={formState.location.flatNumber}
                  onChange={(e) => handleInputChange('location', 'flatNumber', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Flat Number (Optional)"
                />
                <input
                  type="text"
                  value={formState.location.landmark}
                  onChange={(e) => handleInputChange('location', 'landmark', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Landmark (Optional)"
                />
              </div>

              {/* Add New Car Button */}
              <button 
                type='button'
                className="bg-red-600 text-white px-3 py-2 rounded-md mb-6 hover:bg-red-700" 
                style={{ fontSize: '14px', fontWeight: '500' }}
                onClick={() => setShowAddCarModal(true)}
              >
                + Add New Car
              </button>

              {/* Car Cards Container */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> */}
                {/* Car Card 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formState.cars.map((car, index) => (
            <CarCard 
              key={index} 
              car={car} 
              onEdit={() => {/* handle edit */}}
            />
          ))}
        {/* </div> */}

                {/* Car Card 2 */}
                

                {/* Car Card 3 */}
                
              </div>
            </div>

            <div className="w-full p-2 rounded-lg">
                      <div className="text-gray-700 mb-4 mt-3" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Our Services</div>
            
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}> 
                        {services.map((service, index) => (
                          <Button 
                            variant='outline-danger' 
                            key={index} 
                            outline 
                            color="danger" 
                            style={{ 
                              margin: '5px',
                              backgroundColor: selectedService === service ? '#dc3545' : 'transparent',
                              color: selectedService === service ? 'white' : '#dc3545'
                            }}
                            onClick={() => handleServiceClick(service)}
                          > 
                            {service} 
                          </Button>
                        ))} 
                      </div>
            
                      <div className="text-gray-700 mb-2 mt-3" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Our Products</div>
            
                       {/* Modify the service cards section */}
                    <div className="w-full">
                      <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide snap-x snap-mandatory">
                        {getDisplayCards().map((service) => (
                          <div
                            key={service.id}
                            className="flex-none w-[calc(33.333%-1rem)] snap-center border border-gray-200 rounded-lg p-2 bg-white hover:shadow-lg transition-shadow"
                          >
                            <div className="mb-4" style={{ padding: "15px", border: "1px solid black", borderRadius: "4px", height: "200px" }}>
                              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                              <ul className="list-none p-0 space-y-1">
                                <li className="text-gray-600 flex items-center">
                                  <span className="mr-2">-</span>
                                  {service.duration}
                                </li>
                                <li className="text-gray-600 flex items-center">
                                  <span className="mr-2">-</span>
                                  {service.frequency}
                                </li>
                              </ul>
                            </div>
            
                            <button type='button' className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4">
                              View Warranty
                            </button>
            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Price: {service.price}</span>
                              <button 
                                type="button"
                                onClick={() => addServiceToTable(service)}
                                className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700 flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    </div>

            {/* Overview section */}
            <div className="w-full p-2 rounded-lg">
              {/* <div className="text-gray-700 mb-2" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Overview</div> */}

              {/*  Write the overview section here */}
              <div className="w-full p-2 rounded-lg">
          <div className="text-gray-700 mb-2" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Overview</div>
          <div className="w-full mt-3">
            {/* Add the button here, before the table */}
            <button
              type="button"
              onClick={handleAddEmptyRow}
              className="mb-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Add New Row
            </button>
            <table className="w-full">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Name</th>
                  {/* <th className="p-3 text-left">Comments</th> */}
                  <th className="p-3 text-left">Workdone</th>
                  <th className="p-3 text-left">Determined</th>
                  {/* <th className="p-3 text-left">Qt</th> */}
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {formState.overview.tableData.map((row, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.type}
                        onChange={(e) => {
                          const newTableData = [...formState.overview.tableData];
                          newTableData[index].type = e.target.value;
                          setFormState(prev => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              tableData: newTableData
                            }
                          }));
                        }}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => {
                          const newTableData = [...formState.overview.tableData];
                          newTableData[index].name = e.target.value;
                          setFormState(prev => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              tableData: newTableData
                            }
                          }));
                        }}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.workdone}
                        onChange={(e) => {
                          const newTableData = [...formState.overview.tableData];
                          newTableData[index].workdone = e.target.value;
                          setFormState(prev => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              tableData: newTableData
                            }
                          }));
                        }}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={row.determined}
                        onChange={(e) => {
                          const newTableData = [...formState.overview.tableData];
                          newTableData[index].determined = e.target.checked;
                          setFormState(prev => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              tableData: newTableData
                            }
                          }));
                        }}
                        className="h-4 w-4"
                      />
                    </td>
                    {/* <td className="p-3">
                      <input
                        type="number"
                        value={row.qt}
                        onChange={(e) => {
                          const newTableData = [...formState.overview.tableData];
                          newTableData[index].qt = e.target.value;
                          setFormState(prev => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              tableData: newTableData
                            }
                          }));
                        }}
                        className="w-16 text-center p-1 border rounded"
                      />
                    </td> */}
                    <td className="p-3">
      <input
        type="number"
        value={row.total}
        onChange={(e) => handleTotalChange(index, e.target.value)}
        className="w-16 text-center p-1 border rounded"
      />
    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

{/* Inside the overview section in EditPageCopy.js, after the table */}
<div className="flex gap-4 mt-3">
  <div className="flex-1">
    <textarea
      value={formState.overview.caComments}
      onChange={(e) => handleInputChange('overview', 'caComments', e.target.value)}
      placeholder="CA Comments *"
      className="w-full p-3 border rounded h-20 resize-none"
    />
  </div>

  <div className="w-70 space-y-4">
    

    <div className='flex flex-row gap-3' style={{ float: "right" }}>
      <div className='flex flex-col justify-center' >
        <Button 
          variant="outline-dark" 
          className="w-full" 
          style={{ fontSize: "12px" }}
          onClick={() => {/* handle send to customer */}}
        >
          Send to Customer
        </Button>
        <Button 
          variant="outline-dark" 
          className="w-full mt-3" 
          style={{ fontSize: "12px" }}
          onClick={() => {/* handle download */}}
        >
          Download Estimate
        </Button>
      </div>

      <div className="bg-gray-50 p-4 rounded space-y-2">
      <div className="flex justify-between">
        <span>Amount:</span>
        <span>{formState.overview.total}</span>
      </div>
    </div>
    </div>
  </div>
</div>
          </div>
        </div>


            {/* Last Arrival and Garage Section */}

            <div className="w-full p-2 rounded-lg">
              <div className="text-gray-700 mb-2" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Arrival Status</div>



              {/* Location Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 mt-4">

              <select
  value={formState.arrivalStatus.leadStatus}
  onChange={(e) => handleInputChange('arrivalStatus', 'leadStatus', e.target.value)}
  className="p-2 border border-gray-300 rounded-md"
>
  <option value="">Lead Status</option>
  <option value="Assigned">Assigned</option>
  <option value="Follow Up">Follow Up</option>
  <option value="CTO">CTO</option>
  <option value="RTO">RTO</option>
  <option value="Converted">Converted</option>
  <option value="At Workshop">At Workshop</option>
  <option value="Completed">Completed</option>
  <option value="Walkin">Walkin</option>
  <option value="Pickup">Pickup</option>
  <option value="Doorstep">Doorstep</option>
</select>

<select
                    value={formState.arrivalStatus.arrivalMode}
                    onChange={(e) => handleInputChange('arrivalStatus', 'arrivalMode', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Arrival Mode</option>
                    <option value="Walkin">Walkin</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Doorstep">Doorstep</option>
                  </select>
                <select
                  value={formState.arrivalStatus.disposition}
                  onChange={(e) => handleInputChange('arrivalStatus', 'disposition', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option>Disposition (If any)</option>
                </select>
                <input
                  type="text"
                  onFocus={(e) => e.target.type = 'datetime-local'}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      e.target.type = 'text'
                    }
                  }}
                  value={formState.arrivalStatus.dateTime}
                  onChange={(e) => handleInputChange('arrivalStatus', 'dateTime', e.target.value)}
                  placeholder="Date and Time"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
              </div>


            </div>



            {/* Garage Details */}

            <div className="w-full p-2 rounded-lg">
              <div className="text-gray-700 mb-2" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Workshop Details</div>

              <div className="p-4">

                {/* Recommended Pickup Section */}
                <Card className="mb-4" style={{ border: "none" }}>
                  <Card.Body>
                    <div className="d-flex gap-3">
                      {/* Left container */}
                      <div className="w-3/4 p-4" style={{ background: "#DEE1E6", borderRadius: "4px" }}>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <FaMapMarkerAlt size={24} className="text-danger" />
                            <div>
                              <div className="fw-medium">{selectedGarage.name}</div>
                              <div className="text-muted">Locality : {selectedGarage.locality}</div>
                            </div>
                          </div>

                          <div className="text-start">
                            <div className="text-muted">Distance: {selectedGarage.distance}</div>
                            <div className="text-success">Status: {selectedGarage.status}</div>
                          </div>
                        </div>
                      </div>

                     

                      {/* Right button container - matches height automatically */}

                      
                      <div className="flex-1 d-flex" style={{ background: "#DEE1E6", borderRadius: "4px" }}>
                        <Button
                          type='button'
                          variant="outline-dark"
                          className="w-100 d-flex align-items-center justify-content-center" style={{ border: "none" }}
                          onClick={() => setShowGaragePopup(true)}
                      >
                          <FaPencilAlt size={14} className="me-1" />
                          Change Workshop
                          </Button>
                          {showGaragePopup && (
                        <GarageSelector 
                          onClose={() => setShowGaragePopup(false)} 
                          onSelectGarage={handleGarageSelect}
                        />
                      )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Dropdown Sections */}
                <Row className="mb-4">
                  <Col md={6}>
                    <div className="bg-light p-3 rounded">
                      <div className="text-muted mb-2">CA</div>
                      <Form.Select
                        value={formState.workshop.ca}
                        onChange={(e) => handleInputChange('workshop', 'ca', e.target.value)}
                        className="bg-light"
                      >
                        <option>Tarun Sharma</option>
                      </Form.Select>
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="bg-light p-3 rounded">
                      <div className="text-muted mb-2">CCE*</div>
                      <Form.Select
                        value={formState.workshop.cce}
                        onChange={(e) => handleInputChange('workshop', 'cce', e.target.value)}
                        className="bg-light"
                      >
                        <option>GGN HQ-Gulshan Kumar</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>

                {/* Comments Section */}
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    value={formState.workshop.comments}
                    onChange={(e) => handleInputChange('workshop', 'comments', e.target.value)}
                    placeholder="Enter Comments *"
                    style={{ height: '120px', resize: 'none' }}
                  />
                </Form.Group>
              </div>

            </div>


            {/* Sticky Footer */}
            <div className="fixed bottom-0 right-0  w-full border-t shadow-lg p-3 flex justify-end gap-3" style={{background:"#F3F4F6"}}>
                  <Button 
                    variant="outline-danger" 
                    type="button" 
                    onClick={() => navigate('/')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="danger" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save & Copy'}
                  </Button>
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
              )}
          </div>

        </div>
        {showAddCarModal && (
          <AddNewCar 
            onClose={() => setShowAddCarModal(false)} 
            onSubmit={handleAddCar}
          />
        )}
        </div>
      </form>
    </Layout>
  );
};

export default EditPage;