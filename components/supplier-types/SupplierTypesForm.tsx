import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createTipoProveedorSchema } from "@/src/schemas/suppliertype.schema";
import { SupplierTypeFormDataProps } from "@/src/types/suppliertype.type";

export default function TypeSupplierForm({
  suppliertype,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: SupplierTypeFormDataProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTipoProveedorSchema),
    defaultValues: {
      nombre: suppliertype?.nombre || ""
    }
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({
      nombre: data.nombre
    });
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {suppliertype ? "Editar Tipo de Proveedor" : "Nuevo Tipo de Proveedor"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={onFormSubmit} className="mt-6">
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre *
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese nombre del tipo de proveedor"
              {...register("nombre")}
              className={`block w-full px-4 py-3 rounded-md bg-gray-50 border ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
            />
            {errors.nombre && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="pt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}