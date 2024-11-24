import api from '@/config/api';
import ITestDay from '@/interfaces/testDay';
import { useEffect, useState } from 'react';

  export default function useTestDays() {
    const [testDays, setTestDays] = useState<ITestDay[]>([])
  
    useEffect(() => {
      api.get('/test-days').then((response) => {
        setTestDays(response.data)
      })
    }, [])
  
    return { testDays, setTestDays }
  }