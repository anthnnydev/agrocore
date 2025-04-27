import { create } from "zustand";
import { SupplierWithLoteGastoCount } from "../types/supplier.types";

interface SupplierState {
  suppliers: SupplierWithLoteGastoCount[];
  selectedSupplier: SupplierWithLoteGastoCount | null;
  isDeleteModalOpen: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  
  // Actions
  setSuppliers: (suppliers: SupplierWithLoteGastoCount[]) => void;
  setSelectedSupplier: (supplier: SupplierWithLoteGastoCount | null) => void;
  openDeleteModal: (supplier: SupplierWithLoteGastoCount) => void;
  closeDeleteModal: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const useSupplierStore = create<SupplierState>((set) => ({
  suppliers: [],
  selectedSupplier: null,
  isDeleteModalOpen: false,
  isSubmitting: false,
  isDeleting: false,
  
  // Actions
  setSuppliers: (suppliers) => set({ suppliers }),
  setSelectedSupplier: (supplier) => set({ selectedSupplier: supplier }),
  openDeleteModal: (supplier) => set({ selectedSupplier: supplier, isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
}));