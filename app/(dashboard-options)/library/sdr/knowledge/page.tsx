"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Upload, 
  Search, 
  FileText, 
  File, 
  List, 
  Grid3X3, 
  Eye, 
  Download, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Check,
  FolderOpen,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isEmpty, setIsEmpty] = useState(true); // Toggle this to test empty state

  // Sample file data matching the image
  const files = isEmpty ? [] : [
    {
      id: '1',
      name: 'Acme Performance.pdf',
      type: 'PDF',
      size: '99.22 KB',
      uploadDate: 'Sep 5',
      status: 'Uploaded',
      icon: FileText
    },
    {
      id: '2', 
      name: 'Acme Projects.pdf',
      type: 'PDF',
      size: '99.86 KB',
      uploadDate: 'Sep 5',
      status: 'Uploaded',
      icon: FileText
    },
  ];

  const handleFileSelect = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(files.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleAction = (action: string, fileId: string) => {
    console.log(`${action} action for file ${fileId}`);
    // Implement actual actions here
  };

  const handleUpload = () => {
    console.log('Upload files');
    // Implement file upload logic
  };

  const handleChooseFiles = () => {
    console.log('Choose files');
    // Implement file selection logic
    // For demo purposes, let's simulate adding files
    setIsEmpty(false);
  };

  // Empty State Component
  const EmptyState = () => (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md mx-auto">
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50/50">
          {/* Folder Icon */}
          <div className="mb-6">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No files uploaded yet
          </h2>

          {/* Instructions */}
          <p className="text-gray-600 mb-6">
            Drop files here or click the button below to upload
          </p>

          {/* Choose Files Button */}
          <Button 
            onClick={handleChooseFiles}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base font-medium rounded-lg"
          >
            <ArrowUp className="w-5 h-5 mr-2" />
            Choose Files
          </Button>

          {/* File Type Info */}
          <p className="text-sm text-gray-500 mt-4">
            PDFs and Word documents, max 10MB
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout agentType="sdr">
      <div className="h-full overflow-y-auto pb-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
            <p className="text-sm text-gray-600">Manage and organize your document repository</p>
          </div>
          {!isEmpty && <Button 
            onClick={handleUpload}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>}
        </div>

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            {/* Search and Filter Section */}
            <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* File Type Filters */}
            <div className="flex items-center space-x-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
              >
                All Files
                <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{files.length}</span>
              </Button>
              <Button
                variant={activeFilter === 'pdf' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('pdf')}
                className={activeFilter === 'pdf' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
              >
                <FileText className="w-3 h-3 mr-1" />
                PDF
              </Button>
              <Button
                variant={activeFilter === 'word' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('word')}
                className={activeFilter === 'word' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
              >
                <File className="w-3 h-3 mr-1" />
                Word
              </Button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* File Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left flex items-center">
                    <Checkbox
                      checked={selectedFiles.length === files.length && files.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="mr-3"
                    />
                    <span className="text-sm font-medium text-gray-900 flex items-center">
                      NAME
                      <div className="ml-2 flex flex-col">
                        <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium text-gray-900 flex items-center">
                      TYPE
                      <div className="ml-2 flex flex-col">
                        <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium text-gray-900 flex items-center">
                      SIZE
                      <div className="ml-2 flex flex-col">
                        <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium text-gray-900 flex items-center">
                      UPLOAD DATE
                      <div className="ml-2 flex flex-col">
                        <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium text-gray-900 flex items-center">
                      STATUS
                      <div className="ml-2 flex flex-col">
                        <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                        <ChevronDown className="w-3 h-3 text-gray-400" />
                      </div>
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-sm font-medium text-gray-900">ACTIONS</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedFiles.includes(file.id)}
                          onCheckedChange={(checked) => handleFileSelect(file.id, checked as boolean)}
                          className="mr-3"
                        />
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                        {file.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{file.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{file.uploadDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 flex items-center w-fit">
                        <Check className="w-3 h-3 mr-1" />
                        {file.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction('view', file.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction('download', file.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAction('delete', file.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default KnowledgeBase;