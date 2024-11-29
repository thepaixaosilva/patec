'use client'
import React, { useState } from 'react'

interface UploadResponse {
  message: string
  fileUrl: string
  filename: string
  originalName: string
  size: number
}

export const PdfUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setError(null)

    if (selectedFile) {
      // Validação do tipo de arquivo
      if (selectedFile.type !== 'application/pdf') {
        setError('Por favor, selecione apenas arquivos PDF')
        return
      }

      // Validação do tamanho (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('O arquivo deve ter menos que 10MB')
        return
      }

      setFile(selectedFile)
    }
  }

  const uploadFile = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('pdf', file)

      const response = await fetch('http://seu-api-url/upload/pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro ao fazer upload do arquivo')
      }

      const data = await response.json()
      setUploadedFile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {file && (
          <div className="text-sm text-gray-600">
            <p>Arquivo selecionado: {file.name}</p>
            <p>Tamanho: {formatFileSize(file.size)}</p>
          </div>
        )}

        {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

        <button
          onClick={uploadFile}
          disabled={!file || uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md
            hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
            transition-colors"
        >
          {uploading ? 'Enviando...' : 'Enviar PDF'}
        </button>

        {uploadedFile && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">Upload realizado com sucesso!</p>
            <a href={uploadedFile.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline mt-2 block">
              Visualizar PDF
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
