"use client";

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  UploadIcon, 
  FileTextIcon, 
  ImageIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  TrashIcon,
  DownloadIcon,
  EyeIcon
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface FileUploadProps {
  onFilesChange: (files: FileData[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  title?: string;
  description?: string;
}

interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  url?: string;
  error?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
  if (type.includes('image')) return ImageIcon;
  if (type.includes('pdf') || type.includes('document')) return FileTextIcon;
  return FileTextIcon;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 5,
  maxSize = 10, // 10MB default
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  title = "Upload Documents",
  description = "Upload your resume, cover letter, or portfolio"
}) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.some(type => type.toLowerCase() === fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const simulateUpload = (fileData: FileData) => {
    const interval = setInterval(() => {
      setFiles(prevFiles => 
        prevFiles.map(f => {
          if (f.id === fileData.id) {
            if (f.progress >= 100) {
              clearInterval(interval);
              return { ...f, status: 'completed', progress: 100, url: URL.createObjectURL(new Blob()) };
            }
            return { ...f, progress: f.progress + Math.random() * 15 };
          }
          return f;
        })
      );
    }, 200);
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileData[] = [];
    const currentFilesCount = files.length;
    
    setError(null);

    if (currentFilesCount + fileList.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    Array.from(fileList).forEach(file => {
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }

      const fileData: FileData = {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      newFiles.push(fileData);
      
      // Simulate upload progress
      setTimeout(() => simulateUpload(fileData), 100);
    });

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UploadIcon className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            isDragOver 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <UploadIcon className={cn(
            "w-12 h-12 mx-auto mb-4",
            isDragOver ? "text-blue-500" : "text-gray-400"
          )} />
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop files here or click to upload
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            Support for {acceptedTypes.join(', ')} up to {maxSize}MB each
          </p>
          
          <Button variant="outline" size="sm">
            Choose Files
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <XCircleIcon className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">
              Uploaded Files ({files.length}/{maxFiles})
            </h4>
            
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border"
                >
                  <FileIcon className="w-8 h-8 text-gray-500 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </h5>
                      
                      <div className="flex items-center space-x-2">
                        {file.status === 'completed' && (
                          <>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-auto">
                              <DownloadIcon className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="p-1 h-auto text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>{formatFileSize(file.size)}</span>
                      
                      {file.status === 'completed' && (
                        <>
                          <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          <Badge variant="outline" className="text-green-700 border-green-200">
                            Uploaded
                          </Badge>
                        </>
                      )}
                      
                      {file.status === 'error' && (
                        <>
                          <XCircleIcon className="w-4 h-4 text-red-500" />
                          <Badge variant="outline" className="text-red-700 border-red-200">
                            Error
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          Uploading... {Math.round(file.progress)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Summary */}
        {files.some(f => f.status === 'completed') && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                {files.filter(f => f.status === 'completed').length} file(s) uploaded successfully
              </span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Your documents are ready for review. You can still add more files if needed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;