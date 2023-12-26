"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";

import {
  ChevronDownIcon,
  HomeIcon,
  PhoneIcon,
  PaperAirplaneIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
import { useProductContext } from "@/Provider/Context/Product.context";
import toast from "react-hot-toast";


const products = [
  {
    name: "Admin Login ",
    description: "GG",
    href: "/Admin/Login",
    icon: HomeIcon,
  },
  {
    name: "FaceBook ",
    description: "GG",
    href: "https://www.facebook.com/p/HoiChoi-Fashion-100063743310259/?paipv=0&eav=AfZBS22bE0IF00Vi6sEy0IHA2l0Fr6dhlHfo7c2CXG0C3fqWNSu1tuBJHy9HpGPyHJY&_rdr",
    icon: PaperAirplaneIcon,
  },
];
const callsToAction = [
  { name: "See Demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact Support", href: "#", icon: PhoneIcon },
];
interface CartItem {
  id: string;
  name: string;
  price: number; // Assuming price is a number, update it accordingly
  image: string;
  // Add other properties as needed
}
export default function Header() {
  const { cart, removeFromCartHandler, totalPrice } = useProductContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    console.log("Pressed close");
  };
  const handleremove = (item: CartItem) => {
    removeFromCartHandler(item.id);
  };
 
  const handlePayment = async () => {
  toast.error("Payment page is under construction")
};
  
  return (
    <header className="bg-[#0f0f0f]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center justify-between">
          {/* logo part  */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Hoichoi Fashion</span>
            <div className="rounded-full ring ring-lime-50 overflow-hidden">
              <Image
                className="h-12 w-12 "
                src="/hoichoi.jpg"
                alt="hoichoi"
                width="48"
                height="48"
              />
            </div>
          </Link>
          <div className="text-white pl-20 sm:pr-20 flex items-center cursor-pointer relative">
            <ShoppingBagIcon
              className="h-6 w-6"
              aria-hidden="true"
              onClick={openPopup}
            />
            <span className="text-white ml-1">{cart.length}</span>

            {isPopupOpen && (
              <div className="bg-white text-black absolute top-full left-0 p-2 rounded shadow-md mt-8 z-20 w-72 ">
                <div className="text-center mb-2">
                  <h1 className="text-lg font-semibold">
                    Your Cart Items Are:
                  </h1>
                </div>
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="mb-2">
                    <div className="pl-2 flex justify-start items-center font-semibold">
                      <img
                        src={item.image}
                        alt=""
                        className="h-5 w-5 rounded-full ml-2"
                      />
                      <span className="ml-1 text-xs">Product :{item.name}</span>
                      <span className="ml-1 text-xs">
                        Price: {item.price}Tk
                      </span>

                      <button
                        className="ml-1 text-xs hover:text-red-600"
                        onClick={() => handleremove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="m-6 text-xs font-semibold">
                  Total price: {totalPrice}Tk
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={closePopup}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={handlePayment}
                  >
                    Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only"> Open Main Menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Choose
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-white -left-8 top-full z-0 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="ground relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-600">
                        <item.icon
                          className="h-6 w-6 text-[#013B94] group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-[#013B94]"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-[#013B94]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#013B94]"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-[#013B94]"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <a
            href="https://www.facebook.com/profile.php?id=100063743310259"
            className="text-sm font-semibold leading-6 text-white"
            target="_blank"
          >
            Fabcebook
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white"
            target="_blank"
          >
            Contact US!
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white ml-4"
          >
            Instagram
          </a>
        </Popover.Group>
        <div className=" hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/Admin/Login"
            className="text-sm font-semibold leading-6 text-white"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#013B94] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Hoichoi Fashion</span>
              <Image
                className="h-12 w-12 "
                src="/hoichoi.jpg"
                alt="hoichoi"
                width="48"
                height="48"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 p-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                        Choose
                        <ChevronDownIcon
                          className={cn(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel as="div" className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800"
                          >
                            <a href={item.href}>{item.name}</a>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
