

import { Input } from "./input";
import { Icon } from "@iconify/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center top-4 sticky z-30">
      <header
        className={`h-12 items-center px-4 rounded-2xl w-[90vw] lg:w-[80vw] bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gris  bg-zinc-700`}
      >
        <nav className="flex justify-between h-full items-center">
          <div>
            <h1 className="bg-gradient-to-br from-zinc-500 to-zinc-300 bg-clip-text text-transparent">
              GalleryPhoto
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="text-zinc-400">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-zinc-400 grid place-content-center">
                  <Icon icon="basil:search-outline" width="20" height="20" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" items-center px-4 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gris  bg-zinc-700`">
                  <DropdownMenuLabel className="text-zinc-400 ">
                    <Input className="border-gris" />
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
           
          </div>
        </nav>
      </header>
    </div>
  );
}
