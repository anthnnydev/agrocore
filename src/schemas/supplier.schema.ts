import { z } from "zod";

export const proveedorSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  tipoId: z.string().min(1, { message: "El tipo de proveedor es requerido" }),
  contacto: z.string().nullable().optional(),
  telefono: z.string().nullable().optional(),
  email: z.string().email({ message: "Email inválido" }).nullable().optional(),
  direccion: z.string().nullable().optional(),
  ciudad: z.string().nullable().optional(),
  notas: z.string().nullable().optional(),
});

export const createProveedorSchema = proveedorSchema.omit({ id: true });

export const updateProveedorSchema = proveedorSchema;

export const deleteProveedorSchema = z.object({
  id: z.string(),
});

export type CreateProveedorInput = z.infer<typeof createProveedorSchema>;
export type UpdateProveedorInput = z.infer<typeof updateProveedorSchema>;
export type DeleteProveedorInput = z.infer<typeof deleteProveedorSchema>;