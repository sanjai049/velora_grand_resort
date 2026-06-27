import React, { useState, useEffect } from 'react';
import { 
  Search, LogOut, Calendar, Download, Eye, CheckCircle, 
  XCircle, Edit, FileText, Mail, Filter, ChevronDown, 
  ChevronLeft, ChevronRight, LayoutGrid, List, MoreVertical,
  DollarSign, Users, Home, TrendingUp, Trash2
} from 'lucide-react';

import { Booking } from '../data';
import { VeloraLogo } from '../App';

export default function AdminDashboard({ bookings, setBookings, onLogout }: { bookings: Booking[], setBookings: React.Dispatch<React.SetStateAction<Booking[]>>, onLogout: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [roomFilter, setRoomFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState('checkIn');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = {
    totalBookings: bookings.length,
    revenue: bookings.reduce((acc, curr) => curr.paymentStatus === 'Paid' ? acc + curr.totalAmount : acc, 0),
    pending: bookings.filter(b => b.status === 'Pending').length,
    occupied: bookings.filter(b => b.status === 'Confirmed' && new Date(b.checkIn) <= new Date() && new Date(b.checkOut) >= new Date()).length
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleStatusChange = (id: string, newStatus: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed') => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Booking ${id} status updated to ${newStatus}`);
    setSelectedBooking(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
      showToast(`Booking ${id} deleted successfully.`);
      setSelectedBooking(null);
    }
  };

  // Filter & Sort Logic
  let filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    const matchesPayment = paymentFilter === 'All' || booking.paymentStatus === paymentFilter;
    const matchesRoom = roomFilter === 'All' || booking.roomCategory === roomFilter;
    const matchesDate = (!dateRange.start || new Date(booking.checkIn) >= new Date(dateRange.start)) &&
                        (!dateRange.end || new Date(booking.checkIn) <= new Date(dateRange.end));

    return matchesSearch && matchesStatus && matchesPayment && matchesRoom && matchesDate;
  });

  filteredBookings = filteredBookings.sort((a, b) => {
    let aVal: any = a.checkIn;
    let bVal: any = b.checkIn;

    if (sortBy === 'bookingDate') {
      aVal = a.bookingDate;
      bVal = b.bookingDate;
    } else if (sortBy === 'amount') {
      aVal = a.totalAmount;
      bVal = b.totalAmount;
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentItems = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Refunded': return 'bg-gray-100 text-gray-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportCSV = () => {
    showToast('Exporting to CSV...');
    // Mock export logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 text-brand-dark flex items-center justify-center">
                <VeloraLogo className="w-full h-full" />
              </div>
              <h1 className="text-xl font-serif font-semibold text-gray-900 hidden sm:block">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Online
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium px-3 py-2 rounded-md hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalBookings}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">₹{stats.revenue.toLocaleString('en-IN')}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pending}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Occupied Rooms</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.occupied}</h3>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:max-w-md relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by ID, Name, Room..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-tan focus:border-brand-tan outline-none text-sm"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-sm border border-gray-300 px-3 py-2 rounded-lg text-gray-600 bg-white shrink-0">
                <Calendar className="w-4 h-4" />
                <input 
                  type="date" 
                  value={dateRange.start} 
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})} 
                  className="outline-none bg-transparent"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="date" 
                  value={dateRange.end} 
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})} 
                  className="outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center bg-gray-100 p-1 rounded-lg shrink-0">
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              <button onClick={handleExportCSV} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 shrink-0">
                <Download className="w-4 h-4" />
                <span className="hidden sm:block">Export</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Filter className="w-4 h-4" /> Filters:
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-tan outline-none bg-white"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
            <select 
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-tan outline-none bg-white"
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
            <select 
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-tan outline-none bg-white"
            >
              <option value="All">All Rooms</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Ocean Villa">Ocean Villa</option>
              <option value="Premium Villa">Premium Villa</option>
            </select>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-tan outline-none bg-white"
              >
                <option value="checkIn">Check-in Date</option>
                <option value="bookingDate">Booking Date</option>
                <option value="amount">Amount</option>
              </select>
              <button 
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
              >
                {sortOrder === 'asc' ? <span className="text-xs font-bold font-mono block transform rotate-180">↑</span> : <span className="text-xs font-bold font-mono block">↓</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Guest Info</th>
                    <th className="px-6 py-4">Room Details</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentItems.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-brand-dark">{booking.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{booking.guestName}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{booking.guests.adults}A, {booking.guests.children}C</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{booking.roomCategory}</div>
                        <div className="text-gray-500 text-xs mt-0.5">Room {booking.roomNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{new Date(booking.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - {new Date(booking.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{booking.nights} Nights</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">₹{booking.totalAmount.toLocaleString('en-IN')}</div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => {
                              setSelectedBooking(booking);
                            }}
                            className="text-brand-tan hover:text-[#8b6d4d] font-medium text-sm inline-flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            <span className="hidden lg:inline">View</span>
                          </button>
                          <button 
                            onClick={() => showToast('Edit booking functionality coming soon!')}
                            className="text-blue-500 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden lg:inline">Edit</span>
                          </button>
                          <button 
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden lg:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No bookings found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBookings.length)} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1.5 border border-gray-300 rounded text-sm outline-none bg-white mr-2"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm px-2 text-gray-600">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentItems.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono font-bold text-gray-500 mb-1 block">{booking.id}</span>
                      <h3 className="font-bold text-lg text-gray-900">{booking.guestName}</h3>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="p-5 flex-1 grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                    <div>
                      <span className="text-gray-500 block text-xs mb-0.5">Dates</span>
                      <div className="font-medium">{new Date(booking.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                      <div className="text-gray-400 text-xs">{booking.nights} Nights</div>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs mb-0.5">Room</span>
                      <div className="font-medium">{booking.roomCategory}</div>
                      <div className="text-gray-400 text-xs">Room {booking.roomNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs mb-0.5">Guests</span>
                      <div className="font-medium">{booking.guests.adults} Adults, {booking.guests.children} Children</div>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs mb-0.5">Total Amount</span>
                      <div className="font-medium text-brand-dark">₹{booking.totalAmount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => showToast('Edit booking functionality coming soon!')}
                        className="text-blue-500 hover:text-blue-700 p-1.5 rounded-md hover:bg-blue-50 transition-colors border border-transparent shadow-sm"
                        title="Edit Booking"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors border border-transparent shadow-sm"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        className="text-brand-tan hover:text-[#8b6d4d] font-medium text-sm inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination for Grid View */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="text-sm text-gray-600">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBookings.length)} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} entries
              </div>
              <div className="flex items-center gap-2">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="px-2 py-1.5 border border-gray-300 rounded text-sm outline-none bg-white mr-2"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm px-2 text-gray-600">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal / Slide-over for Booking Details */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setSelectedBooking(null)}></div>
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900">Booking Details</h2>
                <p className="text-sm text-gray-500 font-mono mt-1">{selectedBooking.id}</p>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Guest Details */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Guest Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Name</span>
                    <span className="font-medium text-gray-900">{selectedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Email</span>
                    <span className="font-medium text-gray-900">{selectedBooking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Phone</span>
                    <span className="font-medium text-gray-900">{selectedBooking.phone}</span>
                  </div>
                </div>
              </section>

              {/* Stay Details */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <Home className="w-4 h-4" /> Stay Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Room</span>
                    <span className="font-medium text-gray-900">{selectedBooking.roomCategory} (No. {selectedBooking.roomNumber})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Check-in</span>
                    <span className="font-medium text-gray-900">{new Date(selectedBooking.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Check-out</span>
                    <span className="font-medium text-gray-900">{new Date(selectedBooking.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Duration</span>
                    <span className="font-medium text-gray-900">{selectedBooking.nights} Nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Guests</span>
                    <span className="font-medium text-gray-900">{selectedBooking.guests.adults} Adults, {selectedBooking.guests.children} Children</span>
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Payment Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total Amount</span>
                    <span className="font-bold text-lg text-gray-900">₹{selectedBooking.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Payment Status</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                </div>
              </section>

              {/* Notes */}
              {selectedBooking.notes && (
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Special Requests / Notes</h3>
                  <p className="bg-yellow-50 text-yellow-800 p-4 rounded-xl text-sm italic border border-yellow-100">
                    "{selectedBooking.notes}"
                  </p>
                </section>
              )}
            </div>

            {/* Action Buttons Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-3">
              {selectedBooking.status === 'Pending' && (
                <button 
                  onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')}
                  className="col-span-2 bg-brand-dark hover:bg-black text-brand-tan px-4 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm Booking
                </button>
              )}
              {selectedBooking.status === 'Confirmed' && (
                <button 
                  onClick={() => handleStatusChange(selectedBooking.id, 'Completed')}
                  className="col-span-2 bg-brand-dark hover:bg-black text-brand-tan px-4 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Mark Completed
                </button>
              )}
              {selectedBooking.status !== 'Cancelled' && selectedBooking.status !== 'Completed' && (
                <button 
                  onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')}
                  className="col-span-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Cancel Booking
                </button>
              )}
              
              <button 
                onClick={() => showToast('Edit booking functionality coming soon!')}
                className="col-span-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                <Edit className="w-4 h-4" /> Edit Booking Details
              </button>
              
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <FileText className="w-4 h-4" /> Invoice
              </button>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm">
                <Mail className="w-4 h-4" /> Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl font-medium text-sm flex items-center gap-3 animate-fade-in-up">
          <CheckCircle className="w-5 h-5 text-green-400" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}
