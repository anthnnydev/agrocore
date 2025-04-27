import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  ciudad: z.string().nullable().optional(),
  notas: z.string().nullable().optional(),
});

export const createClientSchema = clientSchema.omit({ id: true });

export const updateClientSchema = clientSchema;

export const deleteClientSchema = z.object({
  id: z.string(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type DeleteClientInput = z.infer<typeof deleteClientSchema>;