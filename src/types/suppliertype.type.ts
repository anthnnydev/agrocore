import { TipoProveedor, Prisma } from "@prisma/client";

export type SupplierTypeWithSupplier  = Prisma.TipoProveedorGetPayload<{
  include: {
    _count: {
      select: {
        proveedores: true
      };
    };
  };
}>;

export type SupplierTypeFormData = {
    nombre: string
};

export interface SupplierTypeListProps {
    suppliertype: SupplierTypeWithSupplier[];
    onEdit: (suppliertype: SupplierTypeWithSupplier) => void;
    onDelete: (suppliertype: SupplierTypeWithSupplier) => void;
}

export interface SupplierTypeFormDataProps {
  supplier?: TipoProveedor;
  isSubmitting?: boolean;
  onSubmit: (data: SupplierTypeFormData) => void;
  onCancel: () => void;
}

export interface DeleteSupplierModalProps {
  supplier: SupplierTypeWithSupplier | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (suppliertypeId: string) => void;
}