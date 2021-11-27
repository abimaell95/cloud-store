import  React, { Fragment} from "react";
import "tailwindcss/tailwind.css"
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";


const eventos = [
  {
    "userSession": "6d1ca185-34e5-42ca-b470-0c1a718f604c",
    "productId": 1004767,
    "eventType": "cart",
    "brand": "samsung",
    "userId": 556179146,
    "price": 241.25,
    "eventTime": {
        "_seconds": 1572944702,
        "_nanoseconds": 0
    },
    "categoryCode": "electronics.smartphone",
    "categoryId": 2053013555631882800
  }
  // More projects...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


function DataTable() {
  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 relative z-0 ">
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Monitor de  Eventos
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <a
              href="/campanas/nuevo"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:order-1 sm:ml-3"
            >
              Nuevo
            </a>
          </div>
        </div>
        {/* Projects table (small breakpoint and up) */}
        <div className="hidden mt-8 sm:block">
          <div className="align-middle inline-block min-w-full border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="lg:pl-2">Evento</span>
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marca
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {eventos.map((evento, idx) => (
                  <tr key={`event-${idx}`}>
                    <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center space-x-3 lg:pl-2">
                        <div
                          className={classNames(
                            "bg-blue-700",
                            "flex-shrink-0 w-2.5 h-2.5 rounded-full"
                          )}
                          aria-hidden="true"
                        />
                        <a href="# " className="truncate hover:text-gray-600">
                          <span>{evento.eventType}</span>
                        </a>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {evento.brand}
                    </td>
                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {evento.categoryCode}
                    </td>
                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {evento.price}
                    </td>
                    <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      {evento.eventTime._seconds}
                    </td>
                    <td className="pr-6">
                      <Menu
                        as="div"
                        className="relative flex justify-end items-center"
                      >
                        <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          <span className="sr-only">Open options</span>
                          <DotsVerticalIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="# "
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "group flex items-center px-4 py-2 text-sm"
                                    )}
                                  >
                                    <PencilAltIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Edit
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="# "
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "group flex items-center px-4 py-2 text-sm"
                                    )}
                                  >
                                    <TrashIcon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    Delete
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <DataTable />
  );
}




export default App;
