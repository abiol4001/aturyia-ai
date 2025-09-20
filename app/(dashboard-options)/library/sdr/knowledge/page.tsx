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
import { useKnowledgeBaseFiles, useUploadKnowledgeBase } from '@/lib/api/hooks/useApi';
import KnowledgeBaseUpload from '@/components/KnowledgeBaseUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch knowledge base files from API
  const { 
    data: filesResponse, 
    isLoading, 
    error 
  } = useKnowledgeBaseFiles();

  // Upload knowledge base files
  const uploadMutation = useUploadKnowledgeBase();

  const files = filesResponse?.data || [];

  // Helper functions to format data for display
  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toUpperCase();
    return extension || 'FILE';
  };

  // Filter files based on active filter and search query
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
    const fileType = getFileType(file.filename).toLowerCase();
    
    let matchesFilter = true;
    if (activeFilter === 'pdf') {
      matchesFilter = fileType === 'pdf';
    } else if (activeFilter === 'word') {
      matchesFilter = fileType === 'doc' || fileType === 'docx';
    }
    // 'all' filter matches everything
    
    return matchesSearch && matchesFilter;
  });

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) return `${sizeInBytes} B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleFileSelect = (filename: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, filename]);
    } else {
      setSelectedFiles(selectedFiles.filter(name => name !== filename));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(filteredFiles.map(file => file.filename));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleAction = (action: string, filename: string) => {
    console.log(`${action} action for file ${filename}`);
    // Implement actual actions here
  };

  const handleUpload = () => {
    setIsUploadModalOpen(true);
    setUploadError(null);
  };

  const handleFileUpload = async (files: File[]) => {
    setUploadError(null);
    
    try {
      await uploadMutation.mutateAsync(files);
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload files. Please try again.');
    }
  };

  const handleUploadSkip = () => {
    setIsUploadModalOpen(false);
    setUploadError(null);
  };

  const handleChooseFiles = () => {
    console.log('Choose files');
    // Implement file selection logic
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

  // Loading State
  if (isLoading) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="h-full overflow-y-auto pb-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading knowledge base files...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error State
  if (error) {
    return (
      <DashboardLayout agentType="sdr">
        <div className="h-full overflow-y-auto pb-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading files</h3>
              <p className="text-gray-600">There was an error loading your knowledge base files.</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout agentType="sdr">
      <div className="h-full overflow-y-auto pb-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
            <p className="text-sm text-gray-600">Manage and organize your document repository</p>
          </div>
          <Button 
            onClick={handleUpload}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>

        {files.length === 0 ? (
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
                <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {files.filter(file => getFileType(file.filename).toLowerCase() === 'pdf').length}
                </span>
              </Button>
              <Button
                variant={activeFilter === 'word' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('word')}
                className={activeFilter === 'word' ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''}
              >
                <File className="w-3 h-3 mr-1" />
                Word
                <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {files.filter(file => {
                    const type = getFileType(file.filename).toLowerCase();
                    return type === 'doc' || type === 'docx';
                  }).length}
                </span>
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
          {filteredFiles.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
                <p className="text-gray-600">
                  {searchQuery ? `No files match "${searchQuery}"` : `No ${activeFilter === 'all' ? '' : activeFilter + ' '}files found`}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                      <th className="px-6 py-3 text-left flex items-center">
                        <Checkbox
                          checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
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
                  {filteredFiles.map((file) => (
                    <tr key={file.filename} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Checkbox
                            checked={selectedFiles.includes(file.filename)}
                            onCheckedChange={(checked) => handleFileSelect(file.filename, checked as boolean)}
                            className="mr-3"
                          />
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{file.filename}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                          {getFileType(file.filename)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatFileSize(file.size)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{formatDate(file.modified_at)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 flex items-center w-fit">
                          <Check className="w-3 h-3 mr-1" />
                          Uploaded
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(file.url, '_blank')}
                            className="h-8 w-8 p-0"
                            title="View file"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = file.url;
                              link.download = file.filename;
                              link.click();
                            }}
                            className="h-8 w-8 p-0"
                            title="Download file"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('delete', file.filename)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            title="Delete file"
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
          )}
        </div>
          </>
        )}
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Knowledge Base Files</DialogTitle>
          </DialogHeader>
          <KnowledgeBaseUpload
            onUpload={handleFileUpload}
            onSkip={handleUploadSkip}
            isUploading={uploadMutation.isPending}
            error={uploadError}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default KnowledgeBase;