const KEY = "Uz4OHLXsoKO4P0fCMEaLEJVmNFuzqdq0cc7qNu6G5RfgQESxk1xebNIr";
import Response from "../types/image";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
 



export default async function Home() {

  const response = await fetch("https://api.pexels.com/v1/curated?", {
    method: "GET",
    headers: {
      Authorization: `${KEY}`, // Corrección aquí
    },
  });

  const data: Response = await response.json();
  console.log(data.photos.length);

  return (
    <div className="flex justify-center w-full h-full items-center flex-col ">
      <h1>sdfsdf</h1>
      <div className="lg:w-[70vw] grid-cols-galeria ">
        {data.photos.map((item) => (
          <div
            key={item.id}
            className="grid-item mx-4 duration-300 relative overflow-hidden   shadow-lg group rounded-2xl z-10"
          >
            <Image
              src={item.src.original}
              alt={item.alt}
              title={item.alt}
              className="w-full h-full z-0 transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover max-w-full max-h-full rounded-2xl "
              width={item.width}
              height={item.height}
              
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 z-40 transition-opacity duration-300 text-white p-4 ">
            <h1>{item.photographer}</h1>
            <p className="text-[12px]">{item.alt}</p>
            </div>
          </div>
        ))}
        
      </div>
      <div className="flex justify-center">
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
        </div>
    </div>
  );
}
