"use client"
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [returnedValue, setReturnedValue] = useState<string>('');
  const popupRef = useRef<Window | null>(null);

  const openPopup = () => {
    const popup = window.open(
      '/reports/select_student',
      'PopupWindow',
      'width=400,height=300,left=300,top=200'
    );
    popupRef.current = popup;
  };

  useEffect(() => {
    // Listener para receber mensagens do popup
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'POPUP_VALUE') {
        setReturnedValue(event.data.value);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="p-8">
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Abrir Popup
      </button>

      {returnedValue && (
        <p className="mt-4">Valor recebido do popup: {returnedValue}</p>
      )}
    </div>
  );
}