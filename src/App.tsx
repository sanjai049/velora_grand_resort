import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Facebook, Instagram, Menu, Plus, Minus, MapPin, Flower2, User, Leaf, ArrowRight, Users, Square, Utensils, Waves, Camera, Star, Quote, Mail, Phone, X, ArrowUp, Lock, Check, CheckCircle } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import { Booking, INITIAL_BOOKINGS } from './data';

export const VeloraLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="mountain-cutout">
        <rect width="100" height="100" fill="white" />
        <path d="M 0 100 L 0 71 L 16 71 L 24 62 L 27 66 L 35 54 L 43 64 L 51 40 L 55 48 L 57 45 L 63 56 L 69 48 L 76 60 L 80 56 L 84 71 L 100 71 L 100 100 Z" fill="black" />
      </mask>
    </defs>
    <g mask="url(#mountain-cutout)">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M 18 35 L 40 35 L 56 75 L 34 75 Z" fill="currentColor" />
      <path d="M 82 35 L 60 35 L 44 75 L 66 75 Z" fill="currentColor" />
    </g>
    <path d="M 16 71 L 24 62 L 27 66 L 35 54 L 43 64 L 51 40 L 55 48 L 57 45 L 63 56 L 69 48 L 76 60 L 80 56 L 84 71" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const SectionContainer = ({ children, className = "", bgClass = "bg-white" }: { children: React.ReactNode, className?: string, bgClass?: string }) => (
  <div className={`w-[95%] lg:w-[calc(100%-80px)] max-w-[1600px] mx-auto rounded-[24px] p-10 lg:p-[60px] my-8 lg:my-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${bgClass} ${className}`}>
    {children}
  </div>
);

const Navbar = ({ onNavigateToAdmin }: { onNavigateToAdmin: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50 flex items-center justify-between px-6 py-8 lg:px-16 w-full">
        <div onClick={() => window.location.reload()} className="flex items-center gap-3 text-white cursor-pointer group">
          <VeloraLogo className="h-10 w-10 text-white" />
          <span className="font-serif text-2xl font-medium tracking-wide">Velora Grand</span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-white text-[13px] font-bold tracking-widest uppercase">
          <a href="#home" className="hover:text-teal-300 transition-colors">Home</a>
          <a href="#about" className="hover:text-teal-300 transition-colors">About Us</a>
          <a href="#rooms" className="hover:text-teal-300 transition-colors">Rooms & Suites</a>
          <a href="#experiences" className="hover:text-teal-300 transition-colors">Experiences</a>
          <a href="#gallery" className="hover:text-teal-300 transition-colors">Gallery</a>
        </div>

        <div className="hidden md:flex items-center gap-5 text-white">
          <button className="hover:text-teal-300 transition-transform hover:scale-110 active:scale-95"><Search className="w-4 h-4" strokeWidth={2.5} /></button>
          <div className="w-px h-4 bg-white/30 mx-2" />
          <button className="hover:text-teal-300 transition-transform hover:scale-110 active:scale-95"><Facebook className="w-4 h-4" strokeWidth={2.5} /></button>
          <button className="hover:text-teal-300 transition-transform hover:scale-110 active:scale-95"><Instagram className="w-4 h-4" strokeWidth={2.5} /></button>
          <div className="w-px h-4 bg-white/30 mx-2" />
          <button 
            onClick={onNavigateToAdmin}
            className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-brand-dark transition-colors text-xs font-bold tracking-wider uppercase"
          >
            <User className="w-4 h-4" />
            Admin
          </button>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white backdrop-blur-md bg-black/10 p-2 rounded-full border border-white/20 active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#1A2623] text-white pt-24 px-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-serif font-medium tracking-wide items-center justify-center h-full">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-tan transition-colors">Home</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-tan transition-colors">About Us</a>
              <a href="#rooms" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-tan transition-colors">Rooms & Suites</a>
              <a href="#experiences" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-tan transition-colors">Experiences</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-tan transition-colors">Gallery</a>
              
              <div className="flex items-center gap-6 mt-8">
                <button className="hover:text-brand-tan transition-colors"><Search className="w-6 h-6" /></button>
                <div className="w-px h-6 bg-white/30" />
                <button className="hover:text-brand-tan transition-colors"><Facebook className="w-6 h-6" /></button>
                <button className="hover:text-brand-tan transition-colors"><Instagram className="w-6 h-6" /></button>
                <button className="hover:text-brand-tan transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SearchBar = ({ adults, setAdults, childrenCount, setChildrenCount, checkIn, setCheckIn, checkOut, setCheckOut }: { adults: number, setAdults: (val: number) => void, childrenCount: number, setChildrenCount: (val: number) => void, checkIn: string, setCheckIn: (val: string) => void, checkOut: string, setCheckOut: (val: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'checkIn' | 'checkOut' | 'guests' | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Today's date for minimum date constraint
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div ref={searchRef} className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] p-2 relative flex w-full z-30 ring-1 ring-black/5">
        {/* Search Bar Container with Event Delegation */}
        <div 
          className="flex flex-col md:flex-row items-stretch md:items-center w-full divide-y md:divide-y-0 md:divide-x divide-gray-100"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            const searchItem = target.closest('.search-item') as HTMLElement;
            if (searchItem) {
              const action = searchItem.dataset.action as 'checkIn' | 'checkOut' | 'guests';
              if (action) {
                setActiveTab(action);
                
                // For date inputs, we can also try to programmatically open the date picker if supported
                if (action === 'checkIn' || action === 'checkOut') {
                   const input = searchItem.querySelector('input[type="date"]') as HTMLInputElement;
                   if (input) {
                     if (document.activeElement !== input) {
                       input.focus();
                     }
                     if ('showPicker' in HTMLInputElement.prototype) {
                        try {
                           // @ts-ignore
                           input.showPicker();
                        } catch (err) {}
                     }
                   }
                }
              }
            }
          }}
        >
        
        {/* Check In Section */}
        <div 
          data-action="checkIn"
          className="search-item relative flex-1 cursor-pointer group hover:bg-gray-50 rounded-[1.5rem] md:rounded-l-[1.5rem] md:rounded-r-none transition-colors"
        >
          <div className="flex flex-col items-start text-left px-6 py-3 h-full pointer-events-none">
            <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider mb-0.5 group-hover:text-teal-600 transition-colors">Check In</span>
            <input 
              type="date" 
              min={minDate}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-[15px] font-medium bg-transparent outline-none truncate text-gray-800 placeholder-gray-400 group-hover:placeholder-gray-600 w-full text-left pointer-events-auto cursor-pointer" 
            />
          </div>
        </div>
        
        {/* Check Out Section */}
        <div 
          data-action="checkOut"
          className="search-item relative flex-1 cursor-pointer group hover:bg-gray-50 md:rounded-none transition-colors"
        >
          <div className="flex flex-col items-start text-left px-6 py-3 h-full pointer-events-none">
            <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider mb-0.5 group-hover:text-teal-600 transition-colors">Check Out</span>
            <input 
              type="date"
              min={checkIn || minDate}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-[15px] font-medium bg-transparent outline-none truncate text-gray-800 placeholder-gray-400 group-hover:placeholder-gray-600 w-full text-left pointer-events-auto cursor-pointer" 
            />
          </div>
        </div>
        
        {/* Guests Section */}
        <div className="relative flex-[1.2]">
          <div 
            data-action="guests"
            className="search-item flex items-center pl-6 pr-2 py-2 cursor-pointer h-full justify-between group hover:bg-gray-50 rounded-[1.5rem] md:rounded-l-none md:rounded-r-[1.5rem] transition-colors"
          >
            <div className="flex flex-col items-start text-left py-1 pointer-events-none">
               <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider mb-0.5 group-hover:text-teal-600 transition-colors">Guests</span>
               <span className="text-[15px] font-medium text-gray-400 group-hover:text-gray-800 transition-colors truncate">
                 {adults + childrenCount > 0 ? `${adults} Adult${adults !== 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} ${childrenCount === 1 ? 'Child' : 'Children'}` : ''}` : "Add guests"}
               </span>
            </div>
            <a 
              href="#rooms"
              onClick={(e) => e.stopPropagation()} 
              className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 active:scale-95 transition-all duration-200 text-white px-8 py-3.5 rounded-full ml-4 shadow-lg shadow-teal-500/30 flex items-center justify-center font-bold text-sm uppercase tracking-wider whitespace-nowrap z-10 pointer-events-auto"
            >
              Book Now
            </a>
          </div>
          
          {activeTab === 'guests' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full right-0 mb-4 w-[320px] bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 selection:bg-teal-100"
            >
               <div className="space-y-6 mb-6">
                 <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                   <div className="flex flex-col">
                     <span className="font-bold text-gray-800">Adults</span>
                     <span className="text-sm text-gray-400">Ages 13 or above</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <button 
                       onClick={() => setAdults(Math.max(1, adults - 1))} 
                       disabled={adults <= 1}
                       className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <span className="w-6 text-center font-medium text-gray-800 tabular-nums">{adults}</span>
                     <button 
                       onClick={() => setAdults(adults + 1)} 
                       className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                     >
                       <Plus className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-between pb-2">
                   <div className="flex flex-col">
                     <span className="font-bold text-gray-800">Children</span>
                     <span className="text-sm text-gray-400">Ages 2-12</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <button 
                       onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))} 
                       disabled={childrenCount <= 0}
                       className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <span className="w-6 text-center font-medium text-gray-800 tabular-nums">{childrenCount}</span>
                     <button 
                       onClick={() => setChildrenCount(childrenCount + 1)} 
                       className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                     >
                       <Plus className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
               </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-brand-tan/90 hover:bg-brand-tan text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function HotelApp({ onNavigateToAdmin, onAddBooking }: { onNavigateToAdmin: () => void, onAddBooking: (booking: Booking) => void }) {
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
  const nights = checkIn && checkOut && timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 1;

  const handlePay = (room: any, totalPrice: number) => {
    if (!checkIn || !checkOut) {
      showToast('Please select check-in and check-out dates first.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newBooking: Booking = {
      id: `BKG-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      guestName: 'Guest User',
      email: 'guest@example.com',
      phone: '+91 0000000000',
      roomCategory: room.title,
      roomNumber: `${Math.floor(Math.random() * 900) + 100}`,
      checkIn: checkIn,
      checkOut: checkOut,
      bookingDate: new Date().toISOString().split('T')[0],
      nights,
      guests: { adults, children: childrenCount },
      totalAmount: totalPrice,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      notes: ''
    };

    onAddBooking(newBooking);
    showToast('Booking successfully added and paid!');
  };

  return (
    <div id="hero" className="min-h-screen relative overflow-x-hidden font-sans text-white bg-black flex flex-col selection:bg-teal-200">
      <ScrollToTop />
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1920&q=80"
          alt="Night Beach Bar"
          className="w-full h-full object-cover object-center transform scale-105 opacity-100"
        />
        {/* Soft elegant overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      </div>

      <Navbar onNavigateToAdmin={onNavigateToAdmin} />

      <main id="home" className="relative z-10 flex flex-col items-start px-6 lg:px-16 w-full max-w-[1600px] mx-auto overflow-x-hidden">
        
        {/* Top Side: Typography & Search (Hero Section) */}
        <div className="w-full min-h-[calc(100vh-120px)] flex flex-col z-20 pb-8">
          <div className="flex-1 flex flex-col items-start justify-center w-full lg:w-[80%] pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-[2px] bg-teal-400 rounded-full" />
              <span className="text-teal-300 font-extrabold uppercase tracking-[0.25em] text-[12px] md:text-[13px] drop-shadow-sm">
                Resort Website
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-[44px] md:text-6xl lg:text-[80px] xl:text-[96px] font-black text-white leading-[1.0] lg:leading-[1.0] mb-6 lg:mb-8 uppercase tracking-[-0.03em]"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
            >
              Never stop<br />exploring<br />the world.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/90 max-w-[500px] lg:max-w-[600px] text-[15px] md:text-lg leading-relaxed font-medium drop-shadow-md"
            >
              Discover breathtaking destinations, curated adventures, and exquisite properties designed to transform your journey into an unforgettable memory.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-[700px] lg:max-w-[800px] self-center mt-12 mb-4"
          >
             <SearchBar 
               adults={adults} setAdults={setAdults} 
               childrenCount={childrenCount} setChildrenCount={setChildrenCount} 
               checkIn={checkIn} setCheckIn={setCheckIn}
               checkOut={checkOut} setCheckOut={setCheckOut}
             />
          </motion.div>
        </div>
      </main>

      <section id="about" className="w-full relative z-20">
        <SectionContainer bgClass="bg-[#FCFAF6]" className="flex flex-col xl:flex-row gap-16 xl:gap-24 items-center">
          
          <div className="w-full xl:w-1/2">
            <div className="w-full rounded-2xl overflow-hidden shadow-xl relative" style={{ aspectRatio: '16/10' }}>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" alt="Resort Room" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full xl:w-1/2 flex flex-col items-start">
            <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4">About Velora Grand</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-brand-dark leading-[1.1] mb-6">
              Your Sanctuary<br />Of Serenity
            </h2>
            
            <div className="flex items-center gap-2 mb-8">
               <div className="w-2 h-2 rounded-full border border-brand-tan" />
               <div className="w-16 h-px bg-brand-tan/50" />
            </div>

            <p className="text-gray-600 text-[15px] md:text-lg leading-relaxed mb-12 max-w-[600px]">
              At Velora Grand, we believe every moment should be extraordinary. From our elegant accommodations to our world-class services, we create the perfect setting for unforgettable memories.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              
              <div className="flex flex-col items-start sm:pr-4 pt-4 sm:pt-0">
                <Flower2 className="w-7 h-7 text-brand-tan mb-4" strokeWidth={1.5} />
                <h5 className="font-bold text-brand-dark mb-2 text-[14px]">Exquisite Locations</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Stunning destinations that take your breath away.
                </p>
              </div>

              <div className="flex flex-col items-start sm:px-6 pt-4 sm:pt-0">
                <User className="w-7 h-7 text-brand-tan mb-4" strokeWidth={1.5} />
                <h5 className="font-bold text-brand-dark mb-2 text-[14px]">Exceptional Hospitality</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Personalized service that exceeds expectations.
                </p>
              </div>

              <div className="flex flex-col items-start sm:pl-6 pt-4 sm:pt-0">
                <Leaf className="w-7 h-7 text-brand-tan mb-4" strokeWidth={1.5} />
                <h5 className="font-bold text-brand-dark mb-2 text-[14px]">Unwind & Reconnect</h5>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Relax, rejuvenate, and create timeless memories.
                </p>
              </div>

            </div>

          </div>

        </SectionContainer>
      </section>

      {/* Rooms & Suites Section */}
      <section id="rooms" className="w-full relative z-20">
        <SectionContainer bgClass="bg-white" className="flex flex-col items-center">
          <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4 text-center">Rooms & Suites</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-dark mb-16 text-center">Stay in Comfort & Elegance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mb-12">
            {[
              { title: "Ocean View Suite", desc: "Wake up to stunning ocean views and gentle sea breeze.", size: "45 m²", basePrice: 1445, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800" },
              { title: "Private Pool Villa", desc: "Indulge in privacy with your own infinity pool.", size: "90 m²", basePrice: 1645, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800" },
              { title: "Deluxe Garden Suite", desc: "Surrounded by lush greenery for a refreshing escape.", size: "50 m²", basePrice: 1859, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800" },
              { title: "Family Suite", desc: "Spacious and comfortable for the whole family.", size: "75 m²", basePrice: 2135, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800" }
            ].map((room, i) => {
              const totalPrice = (nights * adults * room.basePrice) + (nights * childrenCount * (room.basePrice / 2));
              return (
              <div key={i} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-brand-dark mb-2">{room.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 h-10">{room.desc}</p>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div 
                      className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer hover:text-brand-tan transition-colors"
                      onClick={() => {
                        const el = document.getElementById(`guest-text-${i}`);
                        if (el) {
                          if (el.innerText.includes('Guest')) {
                            el.innerText = `${adults} Adult${adults !== 1 ? 's' : ''}${childrenCount > 0 ? `, ${childrenCount} Child${childrenCount !== 1 ? 'ren' : ''}` : ''}`;
                          } else {
                            el.innerText = `${adults + childrenCount} Guests`;
                          }
                        }
                      }}
                    >
                      <Users className="w-4 h-4" />
                      <span id={`guest-text-${i}`}>{adults + childrenCount} Guests</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Square className="w-4 h-4" />
                      <span>{room.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-brand-tan">₹{totalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-gray-500 text-sm"> / {nights} night{nights !== 1 ? 's' : ''}</span>
                    </div>
                    <button 
                      onClick={() => handlePay(room, totalPrice)}
                      className="px-6 py-2 bg-brand-tan hover:bg-[#A88764] text-white text-xs font-bold tracking-wider uppercase rounded transition-colors"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>


        </SectionContainer>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="w-full relative z-20">
        <SectionContainer bgClass="bg-[#FCFAF6]" className="flex flex-col items-center">
          <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4 text-center">Experiences</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-dark mb-16 text-center">Curated Experiences Just For You</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full">
            {[
              { icon: Flower2, title: "Spa & Wellness", desc: "Rejuvenate your body and mind." },
              { icon: Utensils, title: "Fine Dining", desc: "Savor exquisite cuisines crafted by experts." },
              { icon: Waves, title: "Water Adventures", desc: "Snorkeling, diving, and more to explore." },
              { icon: Camera, title: "Local Experiences", desc: "Discover culture and hidden gems with us." }
            ].map((exp, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <exp.icon className="w-10 h-10 text-brand-tan mb-6" strokeWidth={1} />
                <h3 className="font-bold text-brand-dark mb-3">{exp.title}</h3>
                <p className="text-gray-500 text-sm">{exp.desc}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="w-full relative z-20">
        <SectionContainer bgClass="bg-white" className="flex flex-col items-center">
          <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4 text-center">Gallery</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-dark mb-16 text-center">A Glimpse of Paradise</h2>
          
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="col-span-2 md:col-span-1 aspect-[4/3] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="col-span-2 md:col-span-1 aspect-[4/3] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
          </div>


        </SectionContainer>
      </section>

      {/* Guest Reviews */}
      <section className="w-full relative z-20">
        <SectionContainer bgClass="bg-[#FCFAF6]" className="flex flex-col items-center">
          <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4 text-center">Guest Reviews</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-brand-dark mb-16 text-center">What Our Guests Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-12">
            {[
              { name: "Emily R.", location: "Los Angeles, USA", quote: "An absolutely incredible experience! The staff was amazing and the views were out of this world.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150" },
              { name: "James T.", location: "London, UK", quote: "From the moment we arrived, everything was perfect. We can't wait to come back again!", rating: 5, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150" },
              { name: "Sophia M.", location: "Sydney, Australia", quote: "The best resort we've ever stayed at. Luxury, comfort, and breathtaking beauty all in one place.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150" }
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                <Quote className="w-8 h-8 text-brand-tan/30 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-8 flex-1 italic">"{review.quote}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-brand-dark text-sm">{review.name}</h4>
                      <span className="text-xs text-gray-500">{review.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-brand-tan text-brand-tan" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-center">
             <div className="w-2 h-2 rounded-full bg-brand-tan" />
             <div className="w-2 h-2 rounded-full bg-gray-300" />
             <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </SectionContainer>
      </section>

      {/* Footer / CTA */}
      <footer className="relative w-full z-20">
        <div className="relative w-full py-20">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" alt="Footer Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2623] via-[#1A2623]/80 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-start justify-center px-6 lg:px-16 max-w-[1600px] mx-auto text-white">
            <h4 className="text-brand-tan font-bold tracking-[0.2em] uppercase text-xs mb-4">Ready For Your Escape?</h4>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6">Book Your Dream Getaway Today</h2>
            <p className="text-white/80 max-w-[600px] mb-8 text-lg">Unwind in luxury and create memories that last a lifetime.</p>
          </div>
        </div>

        <div className="w-full bg-[#1A2623] text-white/70 py-16 border-t border-white/10 relative z-10">
          <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 text-white mb-2">
                <VeloraLogo className="h-10 w-10 text-brand-tan" />
                <span className="font-serif text-2xl font-medium tracking-wide">Velora Grand</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-tan" />
                <span className="text-sm">(310) 555-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-tan" />
                <span className="text-sm">hello@veloragrand.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-tan shrink-0 mt-1" />
                <span className="text-sm">123 Paradise Lane,<br />Maldives, MV 08090</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Quick Links</h4>
              <a href="#home" className="hover:text-brand-tan transition-colors text-sm">Home</a>
              <a href="#about" className="hover:text-brand-tan transition-colors text-sm">About Us</a>
              <a href="#rooms" className="hover:text-brand-tan transition-colors text-sm">Rooms & Suites</a>
              <a href="#experiences" className="hover:text-brand-tan transition-colors text-sm">Experiences</a>
              <a href="#gallery" className="hover:text-brand-tan transition-colors text-sm">Gallery</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Information</h4>
              <a href="#about" className="hover:text-brand-tan transition-colors text-sm">About Velora Grand</a>
              <a href="#" className="hover:text-brand-tan transition-colors text-sm">Facilities</a>
              <a href="#" className="hover:text-brand-tan transition-colors text-sm">FAQs</a>
              <a href="#" className="hover:text-brand-tan transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-brand-tan transition-colors text-sm">Terms & Conditions</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-2">Newsletter</h4>
              <p className="text-sm mb-2">Subscribe to receive exclusive offers and travel inspiration.</p>
              <div className="flex items-center">
                <input type="email" placeholder="Enter your email" className="bg-white/10 text-white placeholder-white/50 px-4 py-3 rounded-l-md outline-none focus:ring-1 focus:ring-brand-tan w-full text-sm" />
                <button className="bg-brand-tan hover:bg-[#A88764] transition-colors px-4 py-3 rounded-r-md text-white">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-start mt-2">
                <button 
                  onClick={onNavigateToAdmin}
                  className="hover:text-brand-tan transition-colors text-sm"
                >
                  Admin Login
                </button>
              </div>
            </div>

          </div>
        </div>
      </footer>
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl font-medium text-sm flex items-center gap-3 animate-fade-in-up">
          <CheckCircle className="w-5 h-5 text-green-400" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}

const AdminLoginPage = ({ onBack, onLoginSuccess }: { onBack: () => void, onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'temp01@gmail.com' && password === 'temp@1234') {
      setError('');
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);
    } else {
      setError('Invalid email ID or password.');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3b4c36] via-[#2F3C29] to-[#182315] relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-[380px] p-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] bg-[#1e271a] rounded-full flex items-center justify-center shadow-2xl z-20 border border-[#2A3724]">
           <User className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>

        <div className="relative bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 pt-16 overflow-hidden mt-10">
          
          <div className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -rotate-45 pointer-events-none"></div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-10">
            <div>
              <div className="flex bg-[#f3f4f6] rounded-sm overflow-hidden h-[46px] shadow-sm">
                <div className="w-[50px] flex items-center justify-center bg-[#e5e7eb]">
                  <User className="w-[18px] h-[18px] text-gray-600" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email ID" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 text-gray-800 placeholder-gray-500 outline-none text-[13px] font-medium"
                />
              </div>
            </div>

            <div className="flex bg-[#f3f4f6] rounded-sm overflow-hidden h-[46px] shadow-sm">
              <div className="w-[50px] flex items-center justify-center bg-[#e5e7eb]">
                <Lock className="w-[18px] h-[18px] text-gray-600" />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent px-4 text-gray-800 placeholder-gray-500 outline-none text-[13px] font-medium"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-white/90 mt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-3.5 h-3.5 bg-black/30 rounded-sm flex items-center justify-center border border-white/40 group-hover:bg-black/40 transition-colors">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="tracking-wide">Remember me</span>
              </label>
              <a href="#" className="hover:text-white transition-colors tracking-wide italic text-white/80">Forgot Password?</a>
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center font-medium -mt-2 -mb-1">
                {error}
              </div>
            )}
            
            {success && (
              <div className="text-green-400 text-xs text-center font-medium -mt-2 -mb-1">
                Login successful!
              </div>
            )}

            <button 
              type="submit"
              className="mt-2 w-full h-[46px] bg-[#1e271a] hover:bg-black text-white font-bold tracking-widest text-[13px] rounded-sm transition-colors shadow-lg uppercase"
            >
              LOGIN
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onBack}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin' | 'dashboard'>('home');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const handleAddBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  if (currentView === 'admin') {
    return <AdminLoginPage onBack={() => setCurrentView('home')} onLoginSuccess={() => setCurrentView('dashboard')} />;
  }
  
  if (currentView === 'dashboard') {
    return <AdminDashboard bookings={bookings} setBookings={setBookings} onLogout={() => setCurrentView('home')} />;
  }

  return <HotelApp onNavigateToAdmin={() => setCurrentView('admin')} onAddBooking={handleAddBooking} />;
}