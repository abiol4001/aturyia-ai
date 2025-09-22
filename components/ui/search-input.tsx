"use client";

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Zod schema for search validation
const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query is too long'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  className = "",
  showButton = false,
  buttonText = "Search",
  disabled = false,
  defaultValue = ""
}) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: defaultValue
    }
  });

  const searchQuery = watch('query');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search effect
  useEffect(() => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Only search if there's a query and it's not just whitespace
    if (searchQuery && searchQuery.trim() !== '') {
      debounceRef.current = setTimeout(() => {
        onSearch(searchQuery.trim());
      }, 2000); // 2 seconds delay
    } else if (searchQuery === '') {
      // If search is cleared, immediately show all results
      onSearch('');
    }

    // Cleanup timeout on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  const handleBlur = () => {
    clearErrors('query');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          {...register('query')}
          placeholder={placeholder}
          className={`pl-10 ${showButton ? 'pr-20' : 'pr-4'} ${errors.query ? 'border-red-500' : ''}`}
          onBlur={handleBlur}
          disabled={disabled || isSubmitting}
        />
        {showButton && (
          <Button
            type="button"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3"
            disabled={disabled || isSubmitting}
            onClick={() => onSearch(searchQuery || '')}
          >
            {isSubmitting ? '...' : buttonText}
          </Button>
        )}
      </div>
      {errors.query && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {errors.query.message}
        </p>
      )}
    </div>
  );
};

export default SearchInput;
