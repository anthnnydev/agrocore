import {
  SupplierFormData,
  SupplierWithLoteGastoCount,
} from "@/src/types/supplier.types";
import {
  createProveedorSchema,
  updateProveedorSchema,
  deleteProveedorSchema,
} from "@/src/schemas/supplier.schema";

// Función para manejar errores de la API
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error("Error desconocido en la API");
};

// Obtener todos los proveedores
export const fetchSuppliers = async (): Promise<
  SupplierWithLoteGastoCount[]
> => {
  try {
    const response = await fetch("/api/suppliers");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener proveedores");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Obtener un proveedor por ID
export const fetchSupplierById = async (id: string) => {
  try {
    const response = await fetch(`/api/suppliers/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener el proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Crear un nuevo proveedor
export const createSupplier = async (data: SupplierFormData) => {
  try {
    const validatedData = createProveedorSchema.parse(data);

    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear el proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Actualizar un proveedor existente

export const updateSupplier = async ({
  id,
  ...data
}: SupplierFormData & { id: string }) => {
  try {
    const validatedData = updateProveedorSchema.parse({ id, ...data });

    const response = await fetch(`/api/suppliers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear el proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Eliminar un proveedor
export const deleteSupplier = async (id: string) => {
  try {
    const validatedData = deleteProveedorSchema.parse({ id });

    const response = await fetch(`/api/suppliers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al eliminar el proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
