import { Proveedor, Prisma, TipoProveedor } from "@prisma/client";

export type SupplierWithLoteGastoCount = Prisma.ProveedorGetPayload<{
  include: {
    tipo: true,
    _count: {
      select: {
        lotes: true,
        gastos: true
      };
    };
  };
}>;

export type SupplierFormData = {
    nombre: string
    contacto: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    ciudad: string | null
    notas: string | null
    tipoId?: string | null
};

export interface SupplierListProps {
    suppliers: SupplierWithLoteGastoCount[];
    onEdit: (supplier: SupplierWithLoteGastoCount) => void;
    onDelete: (supplier: SupplierWithLoteGastoCount) => void;
}

export interface SupplierFormDataProps {
  supplier?: Proveedor;
  tiposProveedor: TipoProveedor[];
  isSubmitting?: boolean;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
}

export interface DeleteSupplierModalProps {
  supplier: SupplierWithLoteGastoCount | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (supplierId: string) => void;
}