import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { 
  fetchClients, 
  createClient, 
  updateClient, 
  deleteClient 
} from "@/src/lib/api/clients";
import { 
  ClientFormData, 
  ClientWithVentasCount 
} from "@/src/types/client.types"
import { toast } from "react-hot-toast";
import { useClientStore } from "@/src/store/clients.store";

export const useClientQuery = () => {
  const { setClients } = useClientStore();
  
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    meta: {
      onSuccess: (data: ClientWithVentasCount[]) => {
        setClients(data);
      },
    },
  });
};

export const useClientMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { 
    setIsSubmitting, 
    setIsDeleting, 
    closeDeleteModal 
  } = useClientStore();

  const createMutation = useMutation({
    mutationFn: createClient,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente creado exitosamente");
      router.push("/clients");
    },
    onError: (error) => {
      toast.error(`Error al crear cliente: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateClient,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente actualizado exitosamente");
      router.push("/clients");
    },
    onError: (error) => {
      toast.error(`Error al actualizar cliente: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente eliminado exitosamente");
      closeDeleteModal();
    },
    onError: (error) => {
      toast.error(`Error al eliminar cliente: ${error.message}`);
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleCreateClient = useCallback((data: ClientFormData) => {
    createMutation.mutate(data);
  }, [createMutation]);

  const handleUpdateClient = useCallback((id: string, data: ClientFormData) => {
    updateMutation.mutate({ id, ...data });
  }, [updateMutation]);

  const handleDeleteClient = useCallback((id: string) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  return {
    handleCreateClient,
    handleUpdateClient,
    handleDeleteClient,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};