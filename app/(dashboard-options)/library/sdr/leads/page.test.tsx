import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import Leads from './page';

// Mock the API hooks
const mockUseLeads = vi.hoisted(() => vi.fn());
const mockUseApproveLeads = vi.hoisted(() => vi.fn());
const mockUseRejectLeads = vi.hoisted(() => vi.fn());

vi.mock('@/lib/api/hooks/useApi', () => ({
  useLeads: mockUseLeads,
  useApproveLeads: mockUseApproveLeads,
  useRejectLeads: mockUseRejectLeads,
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the DashboardLayout component
vi.mock('@/components/dashboard/DashboardLayout', () => ({
  default: function MockDashboardLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="dashboard-layout">{children}</div>;
  },
}));

// Mock SearchInput component
vi.mock('@/components/ui/search-input', () => ({
  default: function MockSearchInput({ onSearch }: { onSearch: (query: string) => void }) {
    return (
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search pending leads..."
      />
    );
  },
}));

describe('Leads Page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  const mockLeads = [
    {
      lead_id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      organization: 'Acme Corp',
      designation: 'Manager',
      campaign_name: 'Q1 Campaign',
      status: 'pending',
      created_at: '2024-01-15T10:00:00Z',
      linkedin_url: 'https://linkedin.com/in/johndoe',
      phone: '+1234567890'
    },
    {
      lead_id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      organization: 'Tech Inc',
      designation: 'Director',
      campaign_name: 'Q1 Campaign',
      status: 'pending',
      created_at: '2024-01-16T10:00:00Z',
      linkedin_url: 'https://linkedin.com/in/janesmith',
      phone: '+1234567891'
    }
  ];

  describe('Rendering', () => {
    it('renders leads page with title and pending leads count', () => {
      mockUseLeads.mockReturnValue({
        data: { data: mockLeads },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });

      renderWithQueryClient(<Leads />);

      expect(screen.getByText('Pending Leads (2)')).toBeInTheDocument();
      expect(screen.getByText('Pending leads awaiting your approval.')).toBeInTheDocument();
    });

    it('renders loading state when fetching leads', () => {
      mockUseLeads.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });

      renderWithQueryClient(<Leads />);

      expect(screen.getByText('Pending Leads (...)')).toBeInTheDocument();
      expect(screen.getByText('Loading pending leads...')).toBeInTheDocument();
    });

    it('renders empty state when no leads found', () => {
      mockUseLeads.mockReturnValue({
        data: { data: [] },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });

      renderWithQueryClient(<Leads />);

      expect(screen.getByText('No pending leads found. All leads have been processed!')).toBeInTheDocument();
    });
  });

  describe('Lead Selection', () => {
    beforeEach(() => {
      mockUseLeads.mockReturnValue({
        data: { data: mockLeads },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
    });

    it('allows selecting individual leads', () => {
      renderWithQueryClient(<Leads />);

      const checkboxes = screen.getAllByRole('checkbox');
      const firstLeadCheckbox = checkboxes[1]; // Skip the "select all" checkbox

      fireEvent.click(firstLeadCheckbox);

      expect(firstLeadCheckbox).toBeChecked();
    });

    it('allows selecting all leads with select all checkbox', () => {
      renderWithQueryClient(<Leads />);

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(selectAllCheckbox);

      const allCheckboxes = screen.getAllByRole('checkbox');
      allCheckboxes.forEach((checkbox: HTMLElement) => {
        expect(checkbox).toBeChecked();
      });
    });

    it('shows bulk actions when leads are selected', () => {
      renderWithQueryClient(<Leads />);

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(selectAllCheckbox);

      expect(screen.getByText('2 leads selected')).toBeInTheDocument();
      expect(screen.getByText('Approve Selected')).toBeInTheDocument();
      expect(screen.getByText('Reject Selected')).toBeInTheDocument();
    });
  });

  describe('Lead Approval', () => {
    let mockApproveMutation: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockApproveMutation = vi.fn();
      mockUseLeads.mockReturnValue({
        data: { data: mockLeads },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: mockApproveMutation,
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
    });

    it('approves individual lead when approve button is clicked', async () => {
      renderWithQueryClient(<Leads />);

      const approveButtons = screen.getAllByTitle('Approve lead');
      fireEvent.click(approveButtons[0]);

      await waitFor(() => {
        expect(mockApproveMutation).toHaveBeenCalledWith([mockLeads[0]]);
      });
    });

    it('shows loading modal during approval', async () => {
      mockApproveMutation.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      renderWithQueryClient(<Leads />);

      const approveButtons = screen.getAllByTitle('Approve lead');
      fireEvent.click(approveButtons[0]);

      expect(screen.getByText('Approving Lead')).toBeInTheDocument();
      expect(screen.getByText('Approving 1 lead...')).toBeInTheDocument();
      expect(screen.getAllByText('John Doe')).toHaveLength(2);
    });

    it('approves multiple selected leads', async () => {
      renderWithQueryClient(<Leads />);

      // Select all leads
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(selectAllCheckbox);

      // Click approve selected
      const approveSelectedButton = screen.getByText('Approve Selected');
      fireEvent.click(approveSelectedButton);

      await waitFor(() => {
        expect(mockApproveMutation).toHaveBeenCalledWith(mockLeads);
      });
    });
  });

  describe('Lead Rejection', () => {
    let mockRejectMutation: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockRejectMutation = vi.fn();
      mockUseLeads.mockReturnValue({
        data: { data: mockLeads },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: mockRejectMutation,
        isPending: false
      });
    });

    it('rejects individual lead when reject button is clicked', async () => {
      renderWithQueryClient(<Leads />);

      const rejectButtons = screen.getAllByTitle('Reject lead');
      fireEvent.click(rejectButtons[0]);

      await waitFor(() => {
        expect(mockRejectMutation).toHaveBeenCalledWith([mockLeads[0]]);
      });
    });

    it('shows loading modal during rejection', async () => {
      mockRejectMutation.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      renderWithQueryClient(<Leads />);

      const rejectButtons = screen.getAllByTitle('Reject lead');
      fireEvent.click(rejectButtons[0]);

      expect(screen.getByText('Rejecting Lead')).toBeInTheDocument();
      expect(screen.getByText('Rejecting 1 lead...')).toBeInTheDocument();
      expect(screen.getAllByText('John Doe')).toHaveLength(2);
    });

    it('rejects multiple selected leads', async () => {
      renderWithQueryClient(<Leads />);

      // Select all leads
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(selectAllCheckbox);

      // Click reject selected
      const rejectSelectedButton = screen.getByText('Reject Selected');
      fireEvent.click(rejectSelectedButton);

      await waitFor(() => {
        expect(mockRejectMutation).toHaveBeenCalledWith(mockLeads);
      });
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      mockUseLeads.mockReturnValue({
        data: { data: mockLeads },
        isLoading: false,
        error: null,
        refetch: vi.fn()
      });
      mockUseApproveLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
      mockUseRejectLeads.mockReturnValue({
        mutateAsync: vi.fn(),
        isPending: false
      });
    });

    it('filters leads by name when searching', () => {
      renderWithQueryClient(<Leads />);

      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

    it('filters leads by email when searching', () => {
      renderWithQueryClient(<Leads />);

      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'jane@example.com' } });

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });

    it('shows filtered count in subtitle when searching', () => {
      renderWithQueryClient(<Leads />);

      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'John' } });

      expect(screen.getByText('Showing 1 of 2 pending leads')).toBeInTheDocument();
    });
  });
});
