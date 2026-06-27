export type Booking = {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomCategory: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  bookingDate: string;
  nights: number;
  guests: { adults: number; children: number };
  totalAmount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
  notes: string;
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BKG-001',
    guestName: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91 9876543210',
    roomCategory: 'Ocean Villa',
    roomNumber: '101',
    checkIn: '2026-06-25',
    checkOut: '2026-06-28',
    bookingDate: '2026-06-01',
    nights: 3,
    guests: { adults: 2, children: 1 },
    totalAmount: 145000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    notes: 'Late check-in requested'
  },
  {
    id: 'BKG-002',
    guestName: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '+91 9876543211',
    roomCategory: 'Deluxe Suite',
    roomNumber: '205',
    checkIn: '2026-06-26',
    checkOut: '2026-06-30',
    bookingDate: '2026-06-15',
    nights: 4,
    guests: { adults: 2, children: 0 },
    totalAmount: 80000,
    status: 'Pending',
    paymentStatus: 'Pending',
    notes: 'Anniversary celebration'
  },
  {
    id: 'BKG-003',
    guestName: 'Amit Kumar',
    email: 'amit.k@example.com',
    phone: '+91 9876543212',
    roomCategory: 'Standard Room',
    roomNumber: '310',
    checkIn: '2026-06-20',
    checkOut: '2026-06-23',
    bookingDate: '2026-05-20',
    nights: 3,
    guests: { adults: 1, children: 0 },
    totalAmount: 35000,
    status: 'Completed',
    paymentStatus: 'Paid',
    notes: 'Corporate booking'
  },
  {
    id: 'BKG-004',
    guestName: 'Sneha Gupta',
    email: 'sneha.g@example.com',
    phone: '+91 9876543213',
    roomCategory: 'Premium Villa',
    roomNumber: '105',
    checkIn: '2026-07-01',
    checkOut: '2026-07-05',
    bookingDate: '2026-06-10',
    nights: 4,
    guests: { adults: 4, children: 2 },
    totalAmount: 250000,
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    notes: 'Family trip'
  },
  {
    id: 'BKG-005',
    guestName: 'Vikram Singh',
    email: 'vikram.s@example.com',
    phone: '+91 9876543214',
    roomCategory: 'Ocean Villa',
    roomNumber: '102',
    checkIn: '2026-06-28',
    checkOut: '2026-07-02',
    bookingDate: '2026-06-12',
    nights: 4,
    guests: { adults: 2, children: 0 },
    totalAmount: 190000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    notes: ''
  }
];
