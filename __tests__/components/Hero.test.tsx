import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
    it('should render the hero section', () => {
        render(<Hero />);

        // Check if main heading exists
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
    });

    it('should render with correct styling classes', () => {
        const { container } = render(<Hero />);

        // Hero section should be rendered
        expect(container.querySelector('.hero-gradient')).toBeInTheDocument();
    });

    it('should be visible on the page', () => {
        const { container } = render(<Hero />);

        // Component should render without errors
        expect(container.firstChild).toBeInTheDocument();
    });
});
