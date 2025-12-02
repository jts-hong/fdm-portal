import { render, screen } from '@testing-library/react';
import Navigation from '@/components/Navigation';

// Mock Next.js modules
jest.mock('next/link', () => {
    return ({ children, href, ...props }: { children: React.ReactNode; href: string;[key: string]: any }) => {
        return <a href={href} {...props}>{children}</a>;
    };
});

jest.mock('next/image', () => {
    return ({ src, alt }: { src: string; alt: string }) => {
        return <img src={src} alt={alt} />;
    };
});

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/'),
}));

describe('Navigation Component', () => {
    it('should render all navigation items', () => {
        render(<Navigation />);

        expect(screen.getByText('All Reports')).toBeInTheDocument();
        expect(screen.getByText('Access Instructions')).toBeInTheDocument();
        expect(screen.getByText('Contacts')).toBeInTheDocument();
    });

    it('should render the logo', () => {
        render(<Navigation />);

        const logo = screen.getByAltText('FDM Logo');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/fdm-logo.png');
    });

    it('should render the branding text', () => {
        render(<Navigation />);

        expect(screen.getByText('Data Solution Portal')).toBeInTheDocument();
        expect(screen.getByText('Financial Data Management Platform')).toBeInTheDocument();
    });

    it('should render contact button', () => {
        render(<Navigation />);

        const contactButton = screen.getByText('Contact FDM Team');
        expect(contactButton).toBeInTheDocument();
        expect(contactButton.closest('a')).toHaveAttribute('href', 'mailto:fdm-team@company.com');
    });

    it('should render mobile menu button', () => {
        render(<Navigation />);

        const mobileMenuButton = screen.getByRole('button', { name: /open navigation/i });
        expect(mobileMenuButton).toBeInTheDocument();
    });

    it('should link to home page from logo', () => {
        render(<Navigation />);

        const logoLinks = screen.getAllByRole('link');
        const homeLink = logoLinks.find(link => link.getAttribute('href') === '/');
        expect(homeLink).toBeInTheDocument();
    });

    it('should render navigation links with correct hrefs', () => {
        render(<Navigation />);

        const allReportsLink = screen.getByRole('link', { name: 'All Reports' });
        expect(allReportsLink).toHaveAttribute('href', '/');

        const accessLink = screen.getByRole('link', { name: 'Access Instructions' });
        expect(accessLink).toHaveAttribute('href', '/access-instructions');

        const contactsLink = screen.getByRole('link', { name: 'Contacts' });
        expect(contactsLink).toHaveAttribute('href', '/contacts');
    });

    it('should highlight active route', () => {
        const { usePathname } = require('next/navigation');
        usePathname.mockReturnValue('/');

        render(<Navigation />);

        const allReportsLink = screen.getByRole('link', { name: 'All Reports' });
        expect(allReportsLink).toHaveClass('bg-white');
    });

    it('should not highlight inactive routes', () => {
        const { usePathname } = require('next/navigation');
        usePathname.mockReturnValue('/');

        render(<Navigation />);

        const accessLink = screen.getByRole('link', { name: 'Access Instructions' });
        expect(accessLink).not.toHaveClass('bg-white');
    });
});
