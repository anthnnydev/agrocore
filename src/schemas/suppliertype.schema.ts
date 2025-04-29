import { z } from "zod";

export const TipoProveedorSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
});

export const createTipoProveedorSchema = TipoProveedorSchema.omit({ id: true });

export const updateTipoProveedorSchema = TipoProveedorSchema;

export const deleteTipoProveedorSchema = z.object({
  id: z.string(),
});

export type CreateProveedorInput = z.infer<typeof createTipoProveedorSchema>;
export type UpdateProveedorInput = z.infer<typeof updateTipoProveedorSchema>;
export type DeleteProveedorInput = z.infer<typeof deleteTipoProveedorSchema>;