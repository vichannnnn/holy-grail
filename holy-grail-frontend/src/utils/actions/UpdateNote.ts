import apiClient from "../../api/apiClient";

const updateNote = async (
  noteId: number | null,
  uploaded_by: number | undefined,
  newCategory: number|"", 
  newSubject: number|"", 
  newType:number|"", 
  newDocName:string|"" 
  ) => {
  try {
    const response = await apiClient.put(`/note/${noteId}`, {
      "category": newCategory,
      "subject": newSubject,
      "type": newType,
      "document_name": newDocName,
      "uploaded_by": uploaded_by
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateNote;
