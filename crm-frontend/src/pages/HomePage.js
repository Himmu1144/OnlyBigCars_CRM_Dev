import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { Edit, Copy, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Add new state
    const [welcomeData, setWelcomeData] = useState('');
    const [leads, setLeads] = useState([]);
    const [users, setUsers] = useState([]); // Add state for users
    const [searchQuery, setSearchQuery] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [filterFormData, setFilterFormData] = useState({
        user: '',
        source: '',
        status: '',
        location: '',
        language_barrier: false
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchMessage(''); // Clear any previous messages
        try {
            const response = await axios.get(`http://localhost:8000/api/leads/search/?mobile=${searchQuery}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (response.data.leads.length === 0) {
                setSearchMessage(`No leads found for "${searchQuery}"`);
            }
            setLeads(response.data.leads);
            setSearchQuery(''); // Clear search field

        } catch (error) {
            console.error('Error searching leads:', error);
            setSearchMessage('Error occurred while searching');
        }
    };

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilterFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        setSearchMessage(''); 
        try {
            const response = await axios.post(
                'http://localhost:8000/api/leads/filter/',
                filterFormData,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            if (response.data.leads.length === 0) {
                setSearchMessage('No leads found for the selected filters');
            }
            setLeads(response.data.leads);
        } catch (error) {
            console.error('Error filtering leads:', error);
            setSearchMessage('Error occurred while filtering');
        }
    };

    const handleReset = (e) => {
        e.target.form.reset();
        setFilterFormData({
            user: '',
            source: '',
            status: '',
            location: '',
            language_barrier: false
        });
    };

    useEffect(() => {
        // Fetch welcome message and users
        axios.get('http://127.0.0.1:8000/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then(response => {
                setWelcomeData(response.data.message);
                setUsers(response.data.users); // Set users data
            })
            .catch(error => console.error('Error fetching home data:', error));
    }, [token]);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('http://localhost:8000/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                setLeads(response.data.leads);
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        fetchLeads();
    }, [token]);

    useEffect(() => {
        if (location.state?.message) {
            setAlertMessage(location.state.message);
            setShowSuccessAlert(true);
            // Clear location state
            window.history.replaceState({}, document.title);
            // Auto-dismiss after 3 seconds
            setTimeout(() => {
                setShowSuccessAlert(false);
                setAlertMessage('');
            }, 3000);
        }
    }, [location]);

    return (
        <Layout>
            {showSuccessAlert && alertMessage && (
                <Alert
                    variant="success"
                    onClose={() => setShowSuccessAlert(false)}
                    dismissible
                    className="edit-page-alert"
                    style={{ marginTop: '0.2em' }}
                >
                    <p>{alertMessage}</p>
                </Alert>
            )}
            {/* <h1 className="text-2xl font-bold mb-6">{welcomeData || 'Welcome to the Home Page!'}</h1> */}
            
            {/* New Form Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p>All Lead</p>
                <form onSubmit={handleFilterSubmit} className="space-y-4">
                    <div className="grid grid-cols-5 gap-4">
                        {/* First Row */}
                        <select
                            name="user"
                            value={filterFormData.user}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.username}>{user.username}</option>
                            ))}
                        </select>
                        <select
                            name="source"
                            value={filterFormData.source}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Source</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <select
                            name="dateTimeRange"
                            value={filterFormData.dateTimeRange}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Date Time Range</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <select
                            name="paymentStatus"
                            value={filterFormData.paymentStatus}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Payment Status</option>
                            <option value="option1">Payment Successful</option>
                            <option value="option2">Payment Pending</option>
                            <option value="option3">Payment Failed</option>
                        </select>
                        {/* Language Barrier Checkbox */}
                        <div className="flex items-center">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="language_barrier"
                                    checked={filterFormData.language_barrier}
                                    onChange={handleFilterChange}
                                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                                />
                                <span className="text-gray-700">Language Barrier</span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-4">
                        {/* Second Row */}
                        <select
                            name="status"
                            value={filterFormData.status}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Status</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <select
                            name="location"
                            value={filterFormData.location}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Location</option>
                            <option value="Gurugram">Gurugram</option> <option value="Delhi">Delhi</option> <option value="Faridabad">Faridabad</option> <option value="Kanpur">Kanpur</option> <option value="Dehradun">Dehradun</option> <option value="Chandigarh">Chandigarh</option> <option value="Bangalore">Bangalore</option> <option value="Jaipur">Jaipur</option> <option value="Lucknow">Lucknow</option> <option value="Chennai">Chennai</option> <option value="Kolkata">Kolkata</option> <option value="Mumbai">Mumbai</option> <option value="Hyderabad">Hyderabad</option> <option value="Pune">Pune</option> <option value="Ahmedabad">Ahmedabad</option>
                        </select>
                        <select
                            name="luxuryNormal"
                            value={filterFormData.luxuryNormal}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Luxury/Normal</option>
                            <option value="luxury">Luxury</option>
                            <option value="normal">Normal</option>
                        </select>
                        <select
                            name="dateCreated"
                            value={filterFormData.dateCreated}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Date Created</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        {/* Buttons in the last column */}
                        <div className="flex gap-2">
                            <button
                                type="reset"
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modified Search Section */}
            <div className="flex justify-between items-center mb-4 mt-8 px-4">
                <div className="w-24"></div> {/* Spacer for centering */}
                <div className="flex items-center justify-center flex-1">
                    <div className="relative w-96"> {/* Fixed width for search field */}
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="LeadId/Mobile/OrderId/RegNumber"
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="ml-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                        Apply
                    </button>
                </div>
                <button onClick={() => navigate('/edit')} className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300">
                    Add Lead
                </button>
            </div>

            <div className="container mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-container">
                        <thead className="bg-red-500 text-white">
                            <tr>
                                <th className="p-3 text-left">Lead Id | Type | Location</th>
                                <th className="p-3 text-left">Name | Vehicle</th>
                                <th className="p-3 text-left">Number | Source</th>
                                <th className="p-3 text-left">Order ID | Reg. Number</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">CCE | CA</th>
                                <th className="p-3 text-left">Date/Time</th>
                                <th className="p-3 text-left">Created/Modified At</th>
                                <th className="p-3 text-left">Edit/Copy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr key={`${lead.id}-${index}`} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        {lead.id}<br />
                                        {lead.type}<br />
                                        {lead.location}
                                    </td>
                                    <td className="p-3">
                                        {lead.name}<br />
                                        {lead.vehicle}
                                    </td>
                                    <td className="p-3">
                                        {lead.number}<br />
                                        {lead.source}
                                    </td>
                                    <td className="p-3">
                                        {lead.orderId}<br />
                                        {lead.regNumber}
                                    </td>
                                    <td className="p-3">{lead.status}</td>
                                    <td className="p-3">
                                        {lead.cce}<br />
                                        {lead.ca}
                                    </td>
                                    <td className="p-3">
                                        Recall Date: {lead.recallDate}<br />
                                        Arrival Date: {lead.arrivalDate}
                                    </td>
                                    <td className="p-3">
                                        {lead.createdAt}<br />
                                        {lead.modifiedAt}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <Edit size={16} className="cursor-pointer" />
                                            <Copy size={16} className="cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Add message display above table */}
                    {searchMessage && (
                        <div className="text-center py-2 text-gray-600">
                            {searchMessage}
                        </div>
                    )}
                </div>
            </div>
            <footer className="bg-gray-50">
                <p className="text-center py-4" style={{ marginTop: '2em', marginBottom: '0' }}>
                    © 2025 OnlyBigCars All Rights Reserved.
                </p>
            </footer>
        </Layout>
    );
};

export default HomePage;