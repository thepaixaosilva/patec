'use client'
import { useState } from 'react'

export default function Popup() {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    // Envia mensagem para a janela principal
    if (window.opener) {
      window.opener.postMessage({ type: 'POPUP_VALUE', value: inputValue }, '*')
      window.close()
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Digite um valor</h2>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border p-2 mb-4 w-full rounded" />
      <div className="flex justify-end gap-2">
        <button onClick={() => window.close()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Confirmar
        </button>
      </div>
    </div>
  )
}
