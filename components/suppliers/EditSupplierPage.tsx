'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useSupplierMutations } from '@/src/hooks/suppliers/useSupplierStore';
import { useSupplierStore } from '@/src/store/suppliers.store';
import { SupplierFormData } from '@/src/types/supplier.types';
import { fetchSupplierById } from '@/src/lib/api/suppliers';
import { getQueryClient } from '@/src/hooks/useQueryConfig';
import { Proveedor } from '@prisma/client';
import SupplierForm from './SupplierForm';

export default function EditSupplierPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();
  const queryClient = getQueryClient();
  const { handleUpdateSupplier } = useSupplierMutations();
  const { isSubmitting } = useSupplierStore();
  const [supplier, setSupplier] = useState<Proveedor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        const supplierData = await fetchSupplierById(id);
        setSupplier(supplierData);
      } catch (err) {
        setError("Error al cargar el proveedor");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSupplier();
  }, [id]);

  const onCancel = () => {
    router.push('/suppliers');
  };

  const onSubmit = (data: SupplierFormData) => {
    handleUpdateSupplier(id, data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mt-8">
        <p>{error || "Proveedor no encontrado"}</p>
        <button 
          onClick={() => router.push('/suppliers')}
          className="mt-2 text-sm font-medium text-red-600 hover:text-red-800"
        >
          Volver a proveedores
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-right" />
        <SupplierForm
          supplier={supplier}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </QueryClientProvider>
  );
}