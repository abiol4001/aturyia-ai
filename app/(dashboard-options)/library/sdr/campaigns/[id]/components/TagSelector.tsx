'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'

interface TagSelectorProps {
  title: string
  tags: string[]
  inputValue: string
  placeholder: string
  onInputChange: (value: string) => void
  onAddTag: () => void
  onRemoveTag: (index: number) => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

export const TagSelector = ({
  title,
  tags,
  inputValue,
  placeholder,
  onInputChange,
  onAddTag,
  onRemoveTag,
  onKeyPress
}: TagSelectorProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-gray-700 uppercase">{title}</h4>
      
      {/* Selected Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => onRemoveTag(index)}
                className="ml-2 hover:text-orange-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Tag Input */}
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          onClick={onAddTag}
          className="bg-black hover:bg-gray-800 text-white px-3"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
