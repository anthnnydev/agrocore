import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createClientSchema } from "@/src/schemas/client.schema";
import { ClientFormProps } from "@/src/types/client.types";

export default function ClientForm({ 
  client, 
  isSubmitting = false, 
  onSubmit, 
  onCancel 
}: ClientFormProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      nombre: client?.nombre || "",
      ciudad: client?.ciudad || "",
      notas: client?.notas || "",
    },
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({
      nombre: data.nombre,
      ciudad: data.ciudad || null,
      notas: data.notas || null,
    });
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {client ? "Editar Cliente" : "Nuevo Cliente"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingrese nombre"
                {...register("nombre")}
                className={`block w-full px-4 py-3 rounded-md bg-gray-50 border ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              />
              {errors.nombre && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                placeholder="Ingrese ciudad"
                {...register("ciudad")}
                className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notas" className="block text-sm font-medium text-gray-700 mb-2">
              Notas
            </label>
            <textarea
              id="notas"
              rows={4}
              placeholder="Información adicional sobre el cliente"
              {...register("notas")}
              className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

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
              className="px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? "Guardando..." : client ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}