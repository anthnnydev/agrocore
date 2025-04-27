"use client";

import { useSidebarStore } from "@/src/store";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Header() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      {/* Botón para expandir/colapsar sidebar */}
      <button 
        onClick={toggleSidebar} 
        className="flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:bg-gray-100 hover:text-black"
        title={isOpen ? "Minimizar menú" : "Expandir menú"}
      >
        {isOpen ? (
          <ChevronLeftIcon className="h-5 w-5" />
        ) : (
          <ChevronRightIcon className="h-5 w-5" />
        )}
      </button>

      {/* Barra de búsqueda */}
      <div className="flex-1 px-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
    </header>
  );
}