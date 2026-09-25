import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';

export const metadata = {
  title: 'FitLog - Gym Companion',
  description: 'Track and plan your workout lifts effortlessly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f17] text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}