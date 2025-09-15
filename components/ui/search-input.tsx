"use client";

import React from 'react';
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
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: defaultValue
    }
  });

  const onSubmit = async (data: SearchFormData) => {
    try {
      await onSearch(data.query);
      // Optionally reset form after search
      // reset();
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          {...register('query')}
          placeholder={placeholder}
          className={`pl-10 ${showButton ? 'pr-20' : 'pr-4'} ${errors.query ? 'border-red-500' : ''}`}
          onKeyPress={handleKeyPress}
          disabled={disabled || isSubmitting}
        />
        {showButton && (
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3"
            disabled={disabled || isSubmitting}
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
    </form>
  );
};

export default SearchInput;
