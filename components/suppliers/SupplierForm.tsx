import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createProveedorSchema } from "@/src/schemas/supplier.schema";
import { SupplierFormDataProps } from "@/src/types/supplier.types";

export default function SupplierForm({
  supplier,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: SupplierFormDataProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProveedorSchema),
    defaultValues: {
      nombre: supplier?.nombre || "",
      tipoId: supplier?.tipoId || "",
      contacto: supplier?.contacto || "",
      telefono: supplier?.telefono || "",
      email: supplier?.email || "",
      direccion: supplier?.direccion || "",
      ciudad: supplier?.ciudad || "",
      notas: supplier?.notas || "",
    },
  });

  const onFormSubmit = handleSubmit((data) => {
    onSubmit({
      nombre: data.nombre,
      tipoId: data.tipoId || null,
      contacto: data.contacto || null,
      telefono: data.telefono || null,
      email: data.email || null,
      direccion: data.direccion || null,
      ciudad: data.ciudad || null,
      notas: data.notas || null,
    });
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {supplier ? "Editar Proveedor" : "Nuevo Proveedor"}
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
                placeholder="Ingrese nombre"
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

            {/* Tipo de Proveedor */}
            <div>
              <label
                htmlFor="tipoId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tipo de Proveedor *
              </label>
              <select
                id="tipoId"
                {...register("tipoId")}
                className={`block w-full px-4 py-3 rounded-md bg-gray-50 border ${
                  errors.tipoId ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              >
                <option value="">Seleccione un tipo</option>
              </select>
              {errors.tipoId && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {errors.tipoId.message}
                </p>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <label
              htmlFor="contacto"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contacto
            </label>
            <input
              type="text"
              id="contacto"
              placeholder="Ingrese contacto"
              {...register("contacto")}
              className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Otros campos (Telefono, Email, Direccion, Ciudad, Notas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teléfono */}
            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                placeholder="Ingrese teléfono"
                {...register("telefono")}
                className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingrese email"
                {...register("email")}
                className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Dirección y Ciudad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                placeholder="Ingrese dirección"
                {...register("direccion")}
                className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="ciudad"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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

          {/* Notas */}
          <div>
            <label
              htmlFor="notas"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notas
            </label>
            <textarea
              id="notas"
              rows={4}
              placeholder="Información adicional sobre el proveedor"
              {...register("notas")}
              className="block w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            />
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
