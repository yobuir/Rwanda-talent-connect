import React, { useState, useRef } from 'react';
import { CloudUpload, FileUp, X, FileText } from 'lucide-react';
import { cn } from "@/lib/utils";

const FileUploadDragDrop = ({ 
  multiple = true, 
  mediaType = 'images',
  onFileChange 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  // Accepted file types based on media type
  const acceptedFileTypes = mediaType === 'image' 
    ? '.jpg,.jpeg,.png,.gif,.webp' 
    : '.mp4,.avi,.mov,.webm';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (fileList) => {
    const newFiles = multiple 
      ? Array.from(fileList)
      : [fileList[0]];
    
    // Filter files by type and size
    const validFiles = newFiles.filter(file => 
      acceptedFileTypes.includes(`.${file.name.split('.').pop().toLowerCase()}`) &&
      file.size <= 50 * 1024 * 1024 // 50MB max file size
    );

    // Update local state
    setFiles(validFiles);
    
    // Call the parent's onFileChange callback
    onFileChange(validFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileName) => {
    const newFiles = files.filter(file => file.name !== fileName);
    setFiles(newFiles);
    onFileChange(newFiles);
  };

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  return (
    <div 
      className={cn(
        "w-full p-6 border-2 border-dashed rounded-lg transition-all duration-300 ease-in-out",
        dragActive 
          ? "border-orange-500 bg-orange-50" 
          : "border-gray-300 hover:border-orange-500"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={acceptedFileTypes}
        onChange={handleChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <CloudUpload 
          className={cn(
            "w-12 h-12 transition-colors duration-300",
            dragActive ? "text-orange-500" : "text-gray-400"
          )}
        />
        
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            Drag & Drop {mediaType}s or 
            <button 
              type="button"
              onClick={triggerFileInput}
              className="ml-2 text-orange-600 hover:underline focus:outline-none"
            >
              Browse
            </button>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {mediaType === 'image' 
              ? 'PNG, JPG, GIF up to 50MB' 
              : 'MP4, WebM up to 50MB'}
          </p>
        </div>

        {files.length > 0 && (
          <div className="w-full mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-600">
              {files.length} File{files.length > 1 ? 's' : ''} Selected
            </p>
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(file.name)}
                  className="text-red-500 hover:bg-red-50 rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadDragDrop;