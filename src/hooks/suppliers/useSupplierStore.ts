import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/src/lib/api/suppliers";

import {
  SupplierFormData,
  SupplierWithLoteGastoCount,
} from "@/src/types/supplier.types";

import { toast } from "react-hot-toast";
import { useSupplierStore } from "@/src/store/suppliers.store";

export const useSupplierQuery = () => {
  const { setSuppliers } = useSupplierStore();

  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchSuppliers,
    meta: {
      onSuccess: (data: SupplierWithLoteGastoCount[]) => {
        setSuppliers(data);
      },
    },
  });
};

export const useSupplierMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsSubmitting, setIsDeleting, closeDeleteModal } = useSupplierStore();

  const createMutation = useMutation({
    mutationFn: createSupplier,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Proveedor creado exitosamente");
      router.push("/suppliers");
    },
    onError: (error) => {
      toast.error(`Error al crear proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSupplier,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Proveedor actualizado exitosamente");
      router.push("/suppliers");
    },
    onError: (error) => {
      toast.error(`Error al actualizar el proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSupplier,
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success("Proveedor eliminado exitosamente");
      closeDeleteModal();
    },
    onError: (error) => {
      toast.error(`Error al eliminar proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleCreateSupplier = useCallback(
    (data: SupplierFormData) => {
      createMutation.mutate(data);
    },
    [createMutation]
  );

  const handleUpdateSupplier = useCallback(
    (id: string, data: SupplierFormData) => {
      updateMutation.mutate({ id, ...data });
    },
    [updateMutation]
  );

  const handleDeleteSupplier = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  return {
    handleCreateSupplier,
    handleUpdateSupplier,
    handleDeleteSupplier,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
