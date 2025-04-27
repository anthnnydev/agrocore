import { create } from "zustand";
import { ClientWithVentasCount } from "@/src/types/client.types";

interface ClientState {
  clients: ClientWithVentasCount[];
  selectedClient: ClientWithVentasCount | null;
  isDeleteModalOpen: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
  
  // Actions
  setClients: (clients: ClientWithVentasCount[]) => void;
  setSelectedClient: (client: ClientWithVentasCount | null) => void;
  openDeleteModal: (client: ClientWithVentasCount) => void;
  closeDeleteModal: () => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  selectedClient: null,
  isDeleteModalOpen: false,
  isSubmitting: false,
  isDeleting: false,
  
  // Actions
  setClients: (clients) => set({ clients }),
  setSelectedClient: (client) => set({ selectedClient: client }),
  openDeleteModal: (client) => set({ selectedClient: client, isDeleteModalOpen: true }),
  closeDeleteModal: () => set({ isDeleteModalOpen: false }),
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsDeleting: (isDeleting) => set({ isDeleting }),
}));