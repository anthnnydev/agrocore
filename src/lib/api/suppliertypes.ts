import {
  SupplierTypeFormData,
  SupplierTypeWithSupplier,
} from "@/src/types/suppliertype.type";

import {
  createTipoProveedorSchema,
  updateTipoProveedorSchema,
  deleteTipoProveedorSchema,
} from "@/src/schemas/suppliertype.schema";

// Función para manejar errores de la API
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error("Error desconocido en la API");
};

// Obtener todos los tipo de proveedores
export const fetchSuppliersType = async (): Promise<
  SupplierTypeWithSupplier[]
> => {
  try {
    const response = await fetch("/api/supplier-types");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener el tipo proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Obtener un tipo proveedor por ID
export const fetchSupplierTypeById = async (id: string) => {
  try {
    const response = await fetch(`/api/supplier-types/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener el tipo proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Crear un nuevo tipo proveedor
export const createSupplierType = async (data: SupplierTypeFormData) => {
  try {
    const validatedData = createTipoProveedorSchema.parse(data);

    const response = await fetch("/api/supplier-types", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear el tipo proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Actualizar un tipo proveedor existente

export const updateSupplierType = async ({
  id,
  ...data
}: SupplierTypeFormData & { id: string }) => {
  try {
    const validatedData = updateTipoProveedorSchema.parse({ id, ...data });

    const response = await fetch(`/api/supplier-types/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear el tipo proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Eliminar un tipo proveedor
export const deleteSupplierType = async (id: string) => {
  try {
    const validatedData = deleteTipoProveedorSchema.parse({ id });

    const response = await fetch(`/api/supplier-types/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al eliminar el tipo proveedor");
    }

    return response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
