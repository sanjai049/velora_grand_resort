import mongoose from 'mongoose';
import dns from 'dns';

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is not defined in environment variables. Database not connected.');
      return;
    }
    
    // Fix for DNS resolution errors (like querySrv ECONNREFUSED) in some local environments
    const servers = dns.getServers();
    if (servers.length === 0 || (servers.length === 1 && servers[0] === '127.0.0.1')) {
      try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
      } catch (dnsErr) {
        console.warn('Failed to set DNS servers pre-emptively:', dnsErr);
      }
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it's a DNS error, try to set public DNS and retry once
    if (error instanceof Error && error.message.includes('querySrv ECONNREFUSED')) {
      console.log('Detected querySrv ECONNREFUSED. Retrying connection with Google DNS (8.8.8.8, 8.8.4.4)...');
      try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        const conn = await mongoose.connect(process.env.MONGODB_URI!);
        console.log(`MongoDB Connected (on retry): ${conn.connection.host}`);
        return;
      } catch (retryError) {
        if (retryError instanceof Error) {
          console.error(`Retry Error: ${retryError.message}`);
        }
      }
    }

    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred while connecting to MongoDB');
    }
    // process.exit(1); removed to prevent server crash in AI Studio
  }
};
