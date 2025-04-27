"use client";

import { useSidebarStore } from "@/src/store";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ClientSideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      {/* Overlay solo para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => useSidebarStore.getState().closeSidebar()}
        />
      )}
      
      <div 
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isOpen ? "ml-72" : "ml-16"
        }`}
      >
        <Header />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-gray-100 min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}