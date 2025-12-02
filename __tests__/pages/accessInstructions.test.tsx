import { render, screen } from '@testing-library/react';
import AccessInstructionsPage from '@/app/access-instructions/page';

describe('Access Instructions Page', () => {
    it('should render the page title', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByRole('heading', { name: /access instructions/i, level: 1 })).toBeInTheDocument();
    });

    it('should render how to request access section', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('How to Request Access')).toBeInTheDocument();
    });

    it('should display teamsite access information', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('Teamsite-FDM-Visitors')).toBeInTheDocument();
    });

    it('should render general access requirements section', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('General Access Requirements')).toBeInTheDocument();
        expect(screen.getByText(/VPN access if working remotely/i)).toBeInTheDocument();
    });

    it('should display access methods section', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('Access Methods')).toBeInTheDocument();
        expect(screen.getByText('Web Portal Access')).toBeInTheDocument();
        expect(screen.getByText('Direct Database Access')).toBeInTheDocument();
        expect(screen.getByText('API Access')).toBeInTheDocument();
    });

    it('should show report-specific access levels', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('Report-Specific Access')).toBeInTheDocument();
        expect(screen.getByText('Standard Reports')).toBeInTheDocument();
        expect(screen.getByText('Restricted Reports')).toBeInTheDocument();
        expect(screen.getByText('Confidential Reports')).toBeInTheDocument();
    });

    it('should display troubleshooting section', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('Troubleshooting Common Issues')).toBeInTheDocument();
        expect(screen.getByText('Cannot Access Portal')).toBeInTheDocument();
        expect(screen.getByText('Report Not Visible')).toBeInTheDocument();
        expect(screen.getByText('Data Appears Outdated')).toBeInTheDocument();
    });

    it('should display support section', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText('Need Help?')).toBeInTheDocument();
    });

    it('should have all required access steps', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Navigate to the All Access platform/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit your request with business justification/i)).toBeInTheDocument();
    });

    it('should mention 2FA requirement', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Two-factor authentication \(2FA\) enabled/i)).toBeInTheDocument();
    });

    it('should display corporate credentials requirement', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Valid corporate network credentials/i)).toBeInTheDocument();
    });

    it('should mention browser requirements', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Modern web browser/i)).toBeInTheDocument();
    });

    it('should provide troubleshooting for network issues', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Verify your network connection and VPN status/i)).toBeInTheDocument();
    });

    it('should have information about clearing cache', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getByText(/Clear browser cache and cookies/i)).toBeInTheDocument();
    });

    it('should mention IT Service Desk', () => {
        render(<AccessInstructionsPage />);

        expect(screen.getAllByText(/IT Service Desk/i).length).toBeGreaterThan(0);
    });
});
