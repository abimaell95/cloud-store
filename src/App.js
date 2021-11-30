import  React, { Fragment, useState, useEffect} from "react";
import "tailwindcss/tailwind.css"
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Menu, Transition, Dialog } from "@headlessui/react";
import {eventService} from "./services"

const timestampToDate = (unixtime)=>{
  var newDate = new Date();
  newDate.setTime(unixtime*1000);
  return newDate.toUTCString();
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



function DataTable({openModal, state, setState}) {
  let [currentPage, setCurrentPage] = useState(1)
  
  let pageRange = ()=>{
    let startIndex = (currentPage - 1) * 10
    let endIndex = currentPage*10
    return [startIndex, endIndex]
  }

  let eventColor = (event)=>{
    const colorMap = {  
      cart: "yellow",
      view: "blue",
      purchase: "green"}
    return colorMap[event]
  }



  let onNextPage = ()=>{
    if( 9>=currentPage >= 1 ){
      setCurrentPage(currentPage + 1)
    }
  }

  let onPreviousPage = ()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }


  let onDeleteEvent = (docId) =>{
    eventService.deleteEvent(docId)
  }

  return(
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
            {state.table.data.slice(...pageRange()).map((evento, idx) => (
              <tr key={`event-${idx}`}>
                <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center space-x-3 lg:pl-2">
                    <div
                      className={classNames(
                        `bg-${eventColor(evento.eventType)}-500`,
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
                  {timestampToDate(evento.eventTime._seconds)}
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
                                onClick={()=>onDeleteEvent(evento.docId)}
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
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{(currentPage*10) - 9}</span> a <span className="font-medium">{(currentPage * 10)}</span> de{' '}
              <span className="font-medium">100</span> resultados
            </p>
          </div>
          <div className="flex-1 flex justify-between sm:justify-end">
            <a
              onClick={()=>{onPreviousPage()}}
              className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              onClick={()=>{onNextPage()}}
              className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}

function App() {
  let[state, setState] = useState({
    table:{
      data:[],
      loading:false
    }
  })
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    loadEvents()
  }, [])
    

  let loadEvents = ()=>{
    setState({
      ...state,table:{...state.table, loading: true}
    })
    eventService.getEvents()
      .then(data => {
        setState({
          ...state,table:{...state.table, data: data.result, loading: false}
        })
      })
  }

 

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex flex-col flex-1">
        <main className="flex-1 relative z-0 ">
          {/* Page title & actions */}
          <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                Monitor de  Eventos
              </h1>
            </div>
            <div className="flex sm:mt-0 sm:ml-4">
              <a
                onClick={openModal}
                className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:order-1 sm:ml-3"
              >
                Nuevo
              </a>
            </div>
          </div>
          {!state.table.loading && <DataTable openModal={openModal} state={state} setState={setState}/>}
          <BrandTable />
        </main>
      </div>
    <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal}/>
    </>
  );
}


function BrandTable() {
  let [state, setState] = useState({
    brands:{},
    loading:false,
    currentBrand: {},
    modalOpen: false
  })

  function closeModal() {
    setState({
      ...state, modalOpen:false
    })
  }

  function openModal(brand) {
    setState({
      ...state, modalOpen:true, currentBrand: brand
    })
  }
  

  useEffect(() => {
    loadBrands()
  }, [])


  let  loadBrands = ()=>{
    setState({
      ...state,loading:true
    })
    eventService.getBrandsInfo()
      .then(data => {
        setState({
          ...state,brands:data.result, loading:false
        })
      })
  }

  if(state.loading){
    return <></>
  }

  return(
    <div className="p-4">
      <h1 className="text-gray-800 text-2xl font-medium text-center my-2">Ingresos por marca</h1>
      <div className="flex flex-row flex-wrap">
        {Object.keys(state.brands).map((brand)=>
          <>
          <div 
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 m-2 rounded-lg cursor-pointer"
            onClick={()=>openModal({...state.brands[brand],name:brand})}
          >
            {brand}
          </div>
          </>
        )
        }
      </div>
      <BrandModal isOpen={state.modalOpen} currentBrand={state.currentBrand} closeModal={closeModal}/>
    </div>
  )
}

function BrandModal({isOpen, currentBrand, closeModal}){
  return(
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {currentBrand?.name?.toUpperCase()}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Número de Productos Vendidos: {currentBrand?.total}
                </p>
                <p className="text-sm text-gray-500">
                  Número Total de Ingresos: {currentBrand?.income}
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Ok
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  ) 
}

function Modal({isOpen, closeModal}){
  let [formState, setFormState] = useState({
    brand: "",
    categoryCode1: "",
    categoryCode2: "",
    categoryCode3: "",
    price: "",
    evenType: ""
  })

  let cleanFormState = ()=>{
    setFormState({
      brand: "",
      categoryCode1: "",
      categoryCode2: "",
      categoryCode3: "",
      price: "",
      evenType: ""
    })
  }

  let onCloseModal =()=> {
    onSaveEvent()
  }

  let onChangeBrand = (e)=>{
    setFormState({
      ...formState, brand: e.target.value
    })
  }

  let onChangeEvent = (e)=>{
    setFormState({
      ...formState, evenType: e.target.value
    })
  }

  let onChangeCategory1 = (e)=>{
    setFormState({
      ...formState, categoryCode1: e.target.value
    })
  }
  let onChangeCategory2 = (e)=>{
    setFormState({
      ...formState, categoryCode2: e.target.value
    })
  }
  let onChangeCategory3 = (e)=>{
    setFormState({
      ...formState, categoryCode3: e.target.value
    })
  }

  let onChangePrize = (e)=>{
    setFormState({
      ...formState, price: e.target.value
    })
  }

  let onSaveEvent = ()=>{
    let event = {
      brand: formState.brand,
      categoryCode:formState.categoryCode1+formState.categoryCode2+formState.categoryCode3,
      price: parseFloat(formState.price),
      evenType: formState.evenType
    }
    eventService.addEvent(event)
    .then(data=>{
      closeModal()
      cleanFormState()
    })
  }

  return (
  <>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onCloseModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Evento
                <p className="mt-1 text-sm text-gray-500">Escribe la información relacionada a un evento de producto.</p>
              </Dialog.Title>
              <div className="">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Marca
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={onChangeBrand}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={onChangePrize}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Categoría de Evento
                    </label>
                    <div className="mt-1">
                      <select
                        onChange={onChangeEvent}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="cart">Carrito</option>
                        <option value="view">Vista</option>
                        <option value="purchase">Compra</option>
                      </select>
                    </div>
                  </div>


                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Categoría 1
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={onChangeCategory1}  
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      Categoría 2
                    </label>
                    <div className="mt-1">
                      <input
                      onChange={onChangeCategory2}
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Categoría 3
                    </label>
                    <div className="mt-1">
                      <input
                      onChange={onChangeCategory3}
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onCloseModal}
                >
                  Guardar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  </>
)
}





export default App;
