import api from "@/config/api";
import TestDay from "@/interfaces/testDay";

// Adicionar um novo TestDay
export async function createTestDay() {

}
  
  // Editar um TestDay existente
  export const updateTestDay = async (testDaysId: number, updatedTest: Partial<TestDay>): Promise<TestDay> => {
    try {
      const response = await api.put(`/test-days/${testDaysId}`, updatedTest);
      return response.data;
    } catch (error) {
      console.error('Error editing test day:', error);
      throw new Error('Failed to edit test day.');
    }
  };
  
  // Excluir um TestDay
  export const deleteTestDay = async (testDaysId: number): Promise<void> => {
    try {
      await api.delete(`/test-days/${testDaysId}`);
    } catch (error) {
      console.error('Error deleting test day:', error);
      throw new Error('Failed to delete test day.');
    }
  };