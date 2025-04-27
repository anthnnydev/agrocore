import { Cliente, Prisma } from "@prisma/client";

export type ClientWithVentasCount = Prisma.ClienteGetPayload<{
  include: {
    _count: {
      select: {
        ventas: true;
      };
    };
  };
}>;

export type ClientFormData = {
  nombre: string;
  ciudad?: string | null;
  notas?: string | null;
};

export interface ClientListProps {
  clients: ClientWithVentasCount[];
  onEdit: (client: ClientWithVentasCount) => void;
  onDelete: (client: ClientWithVentasCount) => void;
}

export interface ClientFormProps {
  client?: Cliente;
  isSubmitting?: boolean;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
}

export interface DeleteClientModalProps {
  client: ClientWithVentasCount | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (clientId: string) => void;
}