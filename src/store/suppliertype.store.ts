import { create } from "zustand";
import { SupplierTypeWithSupplier } from "../types/suppliertype.type";

interface SupplierTypeState {
  suppliersType: SupplierTypeWithSupplier[];
  selectedSupplierType: SupplierTypeWithSupplier | null;
  isDeleteModalOpen: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  
  // Actions
  setSuppliersType: (suppliersType: SupplierTypeWithSupplier[]) => void;
  setSelectedSupplierType: (suppliersType: SupplierTypeWithSupplier | null) => void;
  openDeleteModal: (suppliersType: SupplierTypeWithSupplier) => void;
  closeDeleteModal: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const useSupplierTypeStore = create<SupplierTypeState>((set) => ({
  suppliersType: [],
  selectedSupplierType: null,
  isDeleteModalOpen: false,
  isSubmitting: false,
  isDeleting: false,
  
  // Actions
  setSuppliersType: (suppliersType) => set({ suppliersType }),
  setSelectedSupplierType: (suppliersType) => set({ selectedSupplierType: suppliersType }),
  openDeleteModal: (suppliersType) => set({ selectedSupplierType: suppliersType, isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
}));