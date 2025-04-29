import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchSuppliersType,
  createSupplierType,
  updateSupplierType,
  deleteSupplierType,
} from "@/src/lib/api/suppliertypes";

import {
  SupplierTypeFormData,
  SupplierTypeWithSupplier,
} from "@/src/types/suppliertype.type";

import { toast } from "react-hot-toast";
import { useSupplierTypeStore } from "@/src/store/suppliertype.store";

export const useSupplierTypeQuery = () => {
  const { setSuppliersType } = useSupplierTypeStore();

  return useQuery({
    queryKey: ["suppliersType"],
    queryFn: fetchSuppliersType,
    meta: {
      onSuccess: (data: SupplierTypeWithSupplier[]) => {
        setSuppliersType(data);
      },
    },
  });
};

export const useSupplierTypeMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setIsSubmitting, setIsDeleting, closeDeleteModal } =
    useSupplierTypeStore();

  const createMutation = useMutation({
    mutationFn: createSupplierType,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliersType"] });
      toast.success("Tipo proveedor creado exitosamente");
      router.push("/settings/supplier-types");
    },
    onError: (error) => {
      toast.error(`Error al crear el tipo proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateSupplierType,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliersType"] });
      toast.success("Tipo proveedor actualizado exitosamente");
      router.push("/settings/supplier-types");
    },
    onError: (error) => {
      toast.error(`Error al actualizar el tipo proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSupplierType,
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliersType"] });
      toast.success("Tipo proveedor eliminado exitosamente");
      closeDeleteModal();
    },
    onError: (error) => {
      toast.error(`Error al eliminar el tipo proveedor: ${error.message}`);
    },
    onSettled: () => {
      setIsDeleting(false);
    },
  });

  const handleCreateSupplierType = useCallback(
    (data: SupplierTypeFormData) => {
      createMutation.mutate(data);
    },
    [createMutation]
  );

  const handleUpdateSupplierType = useCallback(
    (id: string, data: SupplierTypeFormData) => {
      updateMutation.mutate({ id, ...data });
    },
    [updateMutation]
  );

  const handleDeleteSupplierType = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation]
  );

  return {
    handleCreateSupplierType,
    handleUpdateSupplierType,
    handleDeleteSupplierType,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
