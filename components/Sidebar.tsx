"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import {
  Squares2X2Icon,
  UserCircleIcon,
  InboxIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  HeartIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import { useSidebarStore } from "@/src/store";

type MenuItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: boolean;
  submenuItems?: {
    title: string;
    path: string;
    icon: React.ReactNode;
  }[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen } = useSidebarStore();

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: <Squares2X2Icon className="h-5 w-5" />,
    },
    {
      title: "Lotes",
      path: "/batches",
      icon: <InboxIcon className="h-5 w-5" />,
    },
    {
      title: "Gastos",
      path: "/expenses",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
    },
    {
      title: "Ventas",
      path: "/sales",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
    },
    {
      title: "Clientes",
      path: "/clients",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
    {
      title: "Proveedores",
      path: "/suppliers",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      title: "Mortalidad",
      path: "/mortality",
      icon: <HeartIcon className="h-5 w-5" />,
    },
    {
      title: "Reportes",
      path: "/reports",
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
    {
      title: "Configuración",
      path: "#",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        {
          title: "Tipo Proveedor",
          path: "/settings/supplier-types",
          icon: <TagIcon className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col overflow-y-hidden bg-white shadow-sm transition-all duration-300 ${
        isOpen ? "w-72" : "w-16"
      }`}
    >
      {/* Inicio - Logo */}
      <div className={`flex h-16 items-center ${isOpen ? "justify-between px-6" : "justify-center"}`}>
        {isOpen ? (
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-900">Agrocore</span>
          </Link>
        ) : (
          <Link href="/" className="flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">A</span>
          </Link>
        )}
      </div>
      {/* Fin - Logo */}

      {/* Inicio - Menú */}
      <div className={`flex flex-col overflow-y-auto ${isOpen ? "px-4 pt-6" : "pt-6"}`}>
        {isOpen && (
          <h3 className="mb-4 ml-4 text-sm font-bold uppercase text-gray-500">
            MENU
          </h3>
        )}
        <ul className={`mb-6 flex flex-col ${isOpen ? "gap-1.5" : "gap-4"}`}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const isSubmenuItemActive = item.submenuItems?.some(
              (subItem) => pathname === subItem.path
            );

            return (
              <li key={index}>
                {item.submenu ? (
                  isOpen ? (
                    <Disclosure defaultOpen={isSubmenuItemActive}>
                      {({ open }) => (
                        <div>
                          <Disclosure.Button
                            className={`group flex w-full items-center justify-between rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-blue-50 ${
                              isSubmenuItemActive ? "bg-blue-50 text-blue-600" : "text-gray-600"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={
                                  isSubmenuItemActive ? "text-blue-600" : "text-gray-500"
                                }
                              >
                                {item.icon}
                              </span>
                              {item.title}
                            </div>
                            <ChevronDownIcon
                              className={`h-4 w-4 transition-transform duration-300 ${
                                open ? "rotate-180 transform" : ""
                              } ${isSubmenuItemActive ? "text-blue-600" : "text-gray-500"}`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="pl-4 pt-1">
                            <ul className="flex flex-col gap-1">
                              {item.submenuItems?.map((subItem, subIndex) => {
                                const isSubItemActive = pathname === subItem.path;
                                return (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.path}
                                      className={`group flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-blue-50 ${
                                        isSubItemActive
                                          ? "bg-blue-50 text-blue-600"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      <span
                                        className={
                                          isSubItemActive ? "text-blue-600" : "text-gray-500"
                                        }
                                      >
                                        {subItem.icon}
                                      </span>
                                      {subItem.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  ) : (
                    <div 
                      className={`flex justify-center rounded-md py-2 ${
                        isSubmenuItemActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                      title={item.title}
                    >
                      {item.icon}
                    </div>
                  )
                ) : (
                  <Link
                    href={item.path}
                    className={
                      isOpen
                        ? `group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium duration-300 ease-in-out hover:bg-blue-50 ${
                            isActive ? "bg-blue-50 text-blue-600" : "text-gray-600"
                          }`
                        : `flex justify-center rounded-md py-2 ${
                            isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                          }`
                    }
                    title={!isOpen ? item.title : undefined}
                  >
                    <span className={isActive ? "text-blue-600" : ""}>
                      {item.icon}
                    </span>
                    {isOpen && (
                      <span>{item.title}</span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}