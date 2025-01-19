import Layout from '../components/layout';
import GarageSelector from '../components/GaragePop.js';
import { Alert } from 'react-bootstrap';
import './editpage.css';
import React, { useState } from 'react';
import { Card, Button, Collapse, Form, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';


import { FaChevronDown, FaChevronUp, FaEdit } from 'react-icons/fa';

const EditPage = () => {

  const services = ['Periodic Services', 'Tyres', 'Batteries', 'AC Services and Repair', 'Car Care Services', 'Denting & Painting', 'Wheel Care Services', 'Brake Services', 'Glass Work', 'Light & Fitments', 'Overhauls', 'Others', 'Boosters', 'Warranty', 'Insurance', 'Clutch & Body Parts', 'SOS Services', 'Car Inspections'];

  // Dummy data to match the image
  const tableData = [
    {
      type: 'S',
      name: 'Wheel Alignment',
      comments: '',
      workdone: 'Alignment',
      determined: false,
      qt: '04',
      total: '04'
    },
    {
      type: 'S',
      name: 'Wheel Balancing',
      comments: '',
      workdone: 'Balancing',
      determined: false,
      qt: '04',
      total: '04'
    },
    {
      type: 'S',
      name: 'Bridgestone Ecopia EP150 Tyre',
      comments: '',
      workdone: 'Replaced',
      determined: false,
      qt: '04',
      total: '04'
    }
  ];



  const carServices = [
    {
      id: 1,
      title: "Car Inspection/Diagnostics",
      duration: "4 Hrs Taken",
      frequency: "Every 1 Month (Recommended)",
      price: "Determine"
    },
    {
      id: 2,
      title: "Engine Oil Change",
      duration: "2 Hrs Taken",
      frequency: "Every 3 Months (Recommended)",
      price: "Determine"
    },
    {
      id: 3,
      title: "Brake Service",
      duration: "3 Hrs Taken",
      frequency: "Every 6 Months (Recommended)",
      price: "Determine"
    },
    {
      id: 4,
      title: "Wheel Alignment",
      duration: "1 Hr Taken",
      frequency: "Every 3 Months (Recommended)",
      price: "Determine"
    },
    {
      id: 5,
      title: "AC Service",
      duration: "5 Hrs Taken",
      frequency: "Every 6 Months (Recommended)",
      price: "Determine"
    },
    {
      id: 6,
      title: "Battery Check",
      duration: "1 Hr Taken",
      frequency: "Every 2 Months (Recommended)",
      price: "Determine"
    }
  ];

  const [showAlert, setShowAlert] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenRight, setIsOpenRight] = useState(false); // Changed to true for default open state
  const [isOpenLeft, setIsOpenLeft] = useState(false); // Changed to true for default open state

  const [source, setSource] = useState('Checkout');
  const [customer, setCustomer] = useState('Customer');
  const [customerNumber, setCustomerNumber] = useState('6381234057');
  const [dateValue, setDateValue] = useState('')
  const [showGaragePopup, setShowGaragePopup] = useState(false);

  return (
    <Layout>
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

      <div className="flex h-[calc(90vh-76px)]" style={{ padding: "6px", marginBottom:"5em" }}>
        <div className="w-1/4 bg-gray-50 p-2top-[76px] h-[calc(90vh-76px)] overflow-y-auto">
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
              className={`w-full d-flex justify-content-between align-items-center rounded-bottom-0 ${isOpenLeft ? 'border-bottom-0' : ''}`}>
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
                  <button className="px-3 py-1 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300" style={{ fontSize: "14px" }}>
                    Add Lead
                  </button>
                </div>


                {/* Dropdown Menu - positioned absolutely */}
                <div className="mt-2">
                  <select className="p-2 border border-gray-200 rounded min-w-[120px]">
                    <option value="luxury">Luxury/Normal</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Bottom Section */}
            <div className="mt-4 p-3 flex gap-4">
              <div className="flex-1">
                <input
                  type="tel"
                  // value={}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Mobile Number"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  // value={} 
                  onChange={(e) => setCustomerNumber(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Customer Name"
                />
              </div>

              <div className="flex-1">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200" style={{ color: "#9ca3af" }}
                >
                  <option value="">Source</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
              </div>
            </div>

            <div className="p-3 flex gap-4">
              <div className="flex-1">
                <input
                  type="tel"
                  // value={}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="Whatsapp Number"
                />
              </div>

              <div className="flex-1">
                <input
                  type="email"
                  // value={} 
                  onChange={(e) => setCustomerNumber(e.target.value)}
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
                placeholder="Address"
                className="col-span-3 md:col-span-1 p-2 border border-gray-300 rounded-md"
              />
              <select className="p-2 border border-gray-300 rounded-md">
                <option>City</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>State</option>
              </select>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Building Name (Optional)"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Flat Number (Optional)"
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Landmark (Optional)"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Add New Car Button */}
            <button className="bg-red-600 text-white px-3 py-2 rounded-md mb-6 hover:bg-red-700" style={{ fontSize: '14px', fontWeight: '500' }}>
              + Add New Car
            </button>

            {/* Car Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Car Card 1 */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <img
                      src="https://onlybigcars.com/wp-content/uploads/2024/12/image_22.jpeg"
                      alt="Hyundai Creta Petrol"
                      className="mb-2"
                    />
                    <div className='flex justify-between'>
                      <div>
                        <div className="text-sm font-medium">Hyundai Creta Petrol</div>
                        <div className="text-xs text-gray-600">2022 [16 DUAL VTV] BASE</div>
                        <div className="text-xs text-gray-500">HC8Z7TJ64P96</div>
                      </div>


                      {/* Edit Button */}
                      <div className="flex justify-end mt-2">
                        <button
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          onClick={() => {/* handle click */ }}
                        >
                          <FaEdit size={16} />
                        </button>
                      </div>
                    </div>

                  </div>


                </div>
              </div>

              {/* Car Card 2 */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <img
                      src="https://onlybigcars.com/wp-content/uploads/2024/12/image_22.jpeg"
                      alt="Hyundai Creta Petrol"
                      className="mb-2"
                    />
                    <div className='flex justify-between'>
                      <div>
                        <div className="text-sm font-medium">Hyundai Creta Petrol</div>
                        <div className="text-xs text-gray-600">2022 [16 DUAL VTV] BASE</div>
                        <div className="text-xs text-gray-500">HC8Z7TJ64P96</div>
                      </div>


                      {/* Edit Button */}
                      <div className="flex justify-end mt-2">
                        <button
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          onClick={() => {/* handle click */ }}
                        >
                          <FaEdit size={16} />
                        </button>
                      </div>
                    </div>

                  </div>


                </div>
              </div>

              {/* Car Card 3 */}
              <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <img
                      src="https://onlybigcars.com/wp-content/uploads/2024/12/image_22.jpeg"
                      alt="Hyundai Creta Petrol"
                      className="mb-2"
                    />
                    <div className='flex justify-between'>
                      <div>
                        <div className="text-sm font-medium">Hyundai Creta Petrol</div>
                        <div className="text-xs text-gray-600">2022 [16 DUAL VTV] BASE</div>
                        <div className="text-xs text-gray-500">HC8Z7TJ64P96</div>
                      </div>


                      {/* Edit Button */}
                      <div className="flex justify-end mt-2">
                        <button
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          onClick={() => {/* handle click */ }}
                        >
                          <FaEdit size={16} />
                        </button>
                      </div>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-2 rounded-lg">
            <div className="text-gray-700 mb-4 mt-3" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Our Services</div>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}> {services.map((service, index) => (<Button variant='outline-danger' key={index} outline color="danger" style={{ margin: '5px' }}> {service} </Button>))} </div>

            <div className="text-gray-700 mb-2 mt-3" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Our Products</div>


            {/* // Replace existing card with grid of cards */}
            <div className="w-full">
              <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide snap-x snap-mandatory">
                {carServices.map((service) => (
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

                    <button className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4">
                      View Warranty
                    </button>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price: {service.price}</span>
                      <button className="bg-gray-800 text-white w-8 h-8 rounded-full hover:bg-gray-700">
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
            <div className="text-gray-700 mb-2" style={{ padding: "15px", borderRadius: "5px", background: "#F2F2F2" }}>Overview</div>

            {/*  Write the overview section here */}
            <div className="w-full mt-3">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-500 text-white">
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Comments</th>
                    <th className="p-3 text-left">Workdone</th>
                    <th className="p-3 text-left">Determined</th>
                    <th className="p-3 text-left">Qt</th>
                    <th className="p-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className="bg-gray-50">
                      <td className="p-3">{row.type}</td>
                      <td className="p-3">{row.name}</td>
                      <td className="p-3">{row.comments}</td>
                      <td className="p-3">{row.workdone}</td>
                      <td className="p-3">
                        <input
                          type="checkbox"

                          className="h-4 w-4"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          defaultValue={row.qt}
                          className="w-16 text-center"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          defaultValue={row.total}
                          className="w-16 text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


              <div className="flex gap-4 mt-3">
                <div className="flex-1">
                  <textarea
                    placeholder="CA Comments *"
                    className="w-full p-3 border rounded h-48 resize-none"
                  />
                </div>

                <div className="w-70 space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm font-medium mb-2">Estimate Remarks</div>
                    <div className="text-sm text-gray-600">
                      Wheel Alignment L299 Wheel Balancing L399 Bridgestone
                      <div style={{ color: "red" }}>
                        ecopia EP150 Tyre Tyre Size:155/80R13/79H4180
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row gap-3' style={{ float: "right" }}>

                    <div className='flex flex-col justify-center' >
                      <Button variant="outline-dark" className="w-full" style={{ fontSize: "12px" }}>
                        Send to Customer
                      </Button>
                      <Button variant="outline-dark" className="w-full mt-3" style={{ fontSize: "12px" }}>
                        Download Estimate
                      </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded space-y-2">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span>17418</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slot Surcharge/Rebate:</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Money Applied:</span>
                        <span>0</span>
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

              <select className="p-2 border border-gray-300 rounded-md">
                <option>Lead Status</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-md">
                <option>Arrival Mode</option>
              </select>
              <select className="p-2 border border-gray-300 rounded-md">
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
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
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
                            <div className="fw-medium">OnlyBigCars-Shiv Petrolium</div>
                            <div className="text-muted">Locality : Sec-15A Faridabad</div>
                          </div>
                        </div>

                        <div className="text-start">
                          <div className="text-muted">Distance: 2.31 K.M.</div>
                          <div className="text-success">Status: Open</div>
                        </div>
                      </div>
                    </div>

                    {/* Right button container - matches height automatically */}
                    <div className="flex-1 d-flex" style={{ background: "#DEE1E6", borderRadius: "4px" }}>
                      <Button
                        variant="outline-dark"
                        className="w-100 d-flex align-items-center justify-content-center" style={{ border: "none" }}
                        onClick={() => setShowGaragePopup(true)}
                    >
                        <FaPencilAlt size={14} className="me-1" />
                        Change Workshop
                        </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Dropdown Sections */}
              <Row className="mb-4">
                <Col md={6}>
                  <div className="bg-light p-3 rounded">
                    <div className="text-muted mb-2">CA</div>
                    <Form.Select className="bg-light">
                      <option>Tarun Sharma</option>
                    </Form.Select>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="bg-light p-3 rounded">
                    <div className="text-muted mb-2">CCE*</div>
                    <Form.Select className="bg-light">
                      <option>GGN HQ-Gulshan Kumar</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>

              {/* Comments Section */}
              <Form.Group>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Comments *"
                  style={{ height: '120px', resize: 'none' }}
                />
              </Form.Group>
            </div>

          </div>


          {/* Sticky Footer */}
          <div className="fixed bottom-0 right-0  w-full border-t shadow-lg p-3 flex justify-end gap-3" style={{background:"#F3F4F6"}}>
                <Button variant="outline-danger" style={{fontSize:"13px"}}>Cancel</Button>
                <Button variant="danger" style={{fontSize:"13px", marginRight:"10px"}}>Save & Copy</Button>
            </div>

        </div>

      </div>
      {showGaragePopup && <GarageSelector onClose={() => setShowGaragePopup(false)} />}
    </Layout>
  );
};

export default EditPage;
