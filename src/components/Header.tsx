"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  HomeIcon,
  PhoneIcon,
  PaperAirplaneIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

const products = [
  {
    name: "Stay with us ",
    description: "GG",
    href: "#",
    icon: HomeIcon,
  },
  {
    name: "Aho Hoichoi kori ",
    description: "GG",
    href: "#",
    icon: PaperAirplaneIcon,
  },
  {
    name: "Pinik contact",
    description: "GG",
    href: "#",
    icon: PhoneIcon,
  },
];
const callsToAction = [
  { name: "See Demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact Support", href: "#", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-[#0f0f0f]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          {/* logo part  */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Hoichoi Fashion</span>
            <div className="rounded-full overflow-hidden">
              <Image
                className="h-12 w-12"
                src="/hoichoi.jpg"
                alt="hoichoi"
                width="48"
                height="48"
              />
            </div>
          </Link>
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
                        <item.icon className="h-6 w-6 text-[#013B94] group-hover:text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-[#013B94]">
                        {item.name}
                        <span className="absolute inset-0"/>
                        </a>
                         <p className="mt-1 text-[#013B94]">
                          {item.description}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      </nav>
    </header>
  );
}
