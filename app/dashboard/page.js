'use client';
import React, { useState } from 'react';
import { Upload, FileText, Loader } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FlashcardAnimation from "@/components/ui/FlashcardAnimation";

const FlashCard = ({ question, answer, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Flash card section
  return (
    <div 
      className="relative h-48 w-full perspective-1000"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full duration-500 preserve-3d cursor-pointer ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="p-6 rounded-lg border bg-card h-full flex flex-col justify-between">
            <div className="overflow-auto">
              <h3 className="font-semibold text-lg mb-2">Question {index + 1}</h3>
              <p className="text-gray-600">{question}</p>
            </div>
            <p className="text-sm text-gray-400 text-center">Click to reveal answer</p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="p-6 rounded-lg border bg-card h-full flex flex-col justify-between">
            <div className="overflow-auto">
              <h3 className="font-semibold text-lg mb-2">Answer</h3>
              <p className="text-gray-600">{answer}</p>
            </div>
            <p className="text-sm text-gray-400 text-center">Click to see question</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const validFileTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    // Checking uploaded file type and size
    if (!selectedFile) {
      setError('No file selected');
      setFile(null);
      return;
    }

    if (!validFileTypes.includes(selectedFile.type)) {
      setError('Please upload a valid file type (TXT, PDF, DOC, or DOCX)');
      setFile(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10 MB. Please upload a smaller document.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const generateFlashcards = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate flashcards');
      }

      // Check if no flashcards were generated
      if (!data.flashcards || data.flashcards.length === 0) {
        setError('No flashcards could be generated from the document. Please try a different document.');
        setLoading(false);
        return;
      }

      // Check if the file is empty
      if (file.size === 0) {
        setError('The uploaded document is empty. Please upload a document with content.');
        setLoading(false);
        return;
      }

      setFlashcards(data.flashcards);
      setIsSubmitting(true);

      if (data.totalChunks > data.processedChunks) {
        setError(`Note: Only processed ${data.processedChunks} of ${data.totalChunks} sections due to size limitations. Consider uploading a smaller document for better results.`);
      }
    } catch (err) {
      let errorMessage = 'Failed to generate flashcards. Please try again.';

      if (err.message.includes('Rate limit exceeded')) {
        errorMessage = 'Please wait a few minutes before trying again, or try with a smaller document.';
      } else if (err.message.includes('too large')) {
        errorMessage = 'Document is too large. Please try with a smaller document (less than 10 pages recommended).';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setFile(null);
    setFlashcards([]);
    setError('');
    setIsSubmitting(false);
  };
   
  // Upload file section
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Study Dashboard</h1>
          <p className="text-gray-600">Transform your documents into interactive flashcards</p>
        </div>
        
        {!isSubmitting ? (
          <div className="flex flex-col items-center justify-center pt-12">
            <Card>
              <CardHeader>
                <CardTitle>Upload Document</CardTitle>
                <CardDescription>Upload a Text, PDF or word document to generate flashcards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full">
                    <label 
                      htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-4 pb-4">
                        <Upload className="h-8 w-8 mb-2 text-gray-500" />
                        <p className="text-sm text-gray-500">
                          {file ? file.name : 'Click to upload or drag and drop'}
                        </p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  
                  <Button 
                    onClick={generateFlashcards}
                    disabled={!file || loading}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Generating Flashcards...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Flashcards
                      </>
                    )}
                  </Button>

                  <Button 
                    onClick={resetAll}
                    className="w-full"
                    variant="secondary"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-4 text-center">
                <CardTitle>Generated Flashcards</CardTitle>
                <CardDescription>Click on a card to reveal its answer</CardDescription>
              </CardHeader>
            </Card>
            
            {flashcards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flashcards.map((card, index) => (
                  <FlashCard
                    key={index}
                    question={card.question}
                    answer={card.answer}
                    index={index} 
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-4">
                  <div className="text-center text-gray-500">
                    No flashcards generated
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-center mt-4 mb-4">    
              <Button 
                onClick={resetAll}
                className="align-middle mt-4 mb-4 bg-black text-white"
                variant="primary"
              >
                Submit Another Document
              </Button>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}