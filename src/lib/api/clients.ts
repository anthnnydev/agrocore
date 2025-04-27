import { 
    ClientFormData, 
    ClientWithVentasCount 
  } from "@/src/types/client.types";
  import { 
    createClientSchema, 
    updateClientSchema, 
    deleteClientSchema 
  } from "@/src/schemas/client.schema";
  
  // Función para manejar errores de la API
  const handleApiError = (error: unknown) => {
    console.error("API Error:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error desconocido en la API");
  };
  
  // Obtener todos los clientes
  export const fetchClients = async (): Promise<ClientWithVentasCount[]> => {
    try {
      const response = await fetch("/api/clients");
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener clientes");
      }
      
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };
  
  // Obtener un cliente por ID
  export const fetchClientById = async (id: string) => {
    try {
      const response = await fetch(`/api/clients/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al obtener el cliente");
      }
      
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };
  
  // Crear un nuevo cliente
  export const createClient = async (data: ClientFormData) => {
    try {
      // Validar datos con Zod
      const validatedData = createClientSchema.parse(data);
      
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear el cliente");
      }
      
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };
  
  // Actualizar un cliente existente
  export const updateClient = async ({ id, ...data }: ClientFormData & { id: string }) => {
    try {
      // Validar datos con Zod
      const validatedData = updateClientSchema.parse({ id, ...data });
      
      const response = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar el cliente");
      }
      
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };
  
  // Eliminar un cliente
  export const deleteClient = async (id: string) => {
    try {
      // Validar ID con Zod
      const validatedData = deleteClientSchema.parse({ id });
      
      const response = await fetch(`/api/clients/${validatedData.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el cliente");
      }
      
      return response.json();
    } catch (error) {
      return handleApiError(error);
    }
  };