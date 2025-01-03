import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'components/Container';
import siteData from 'siteData';
import { Home, Briefcase, Code, BookOpen, Mail, Menu, X } from 'lucide-react';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/Skill', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/Blog', label: 'Blog'},
    { href: '/contact', label: 'Contact'},
  ];

  const isActive = (path: string): boolean => router.pathname === path;

  return (
    <header className="fixed z-50 w-full bg-white border-b">
      <Container>
        <nav className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold">
            <span>{siteData?.author}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 hover:text-blue-600 transition-colors
                  ${isActive(item.href) ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              >
                <span className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </Container>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <nav className="p-4">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 py-2 hover:text-blue-600 transition-colors
                ${isActive(item.href) ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="flex items-center space-x-2">
                {item.icon}
                <span>{item.label}</span>
              </span>
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t">
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;