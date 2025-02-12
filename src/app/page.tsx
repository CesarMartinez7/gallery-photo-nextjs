"use client";
import useSWR from "swr";
import Image from "next/image";
import { useReducer, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import reducer, { ActionReducer } from "@/store/useIncrement";
import Response from "../types/image";

const KEY =
  process.env.API_KEY ??
  "Uz4OHLXsoKO4P0fCMEaLEJVmNFuzqdq0cc7qNu6G5RfgQESxk1xebNIr";

const fetcher = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: KEY,
    },
  }).then((res) => res.json());

  
function SkeletonCard() {
  return (
    <div className="grid-item mx-4 duration-300 relative overflow-hidden shadow-lg group rounded-2xl z-10 animate-pulse">
      <div className="w-full h-64 bg-zinc-700 rounded-2xl"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="h-4 bg-zinc-500 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-zinc-500 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const [perPage] = useState<number>(40)
  const url = `https://api.pexels.com/v1/curated?page=${state.count}&per_page=${perPage}`;

  const { data, error, isValidating } = useSWR<Response>(url, fetcher, {
    revalidateOnFocus: false,
  });


  return (
    <div className="flex justify-center w-full h-full items-center flex-col">
      <h1 className="text-2xl mt-8">Página: {state.count}</h1>

      {error && <p>Error al cargar las imágenes.</p>}

      <div className="lg:w-[70vw] grid-cols-galeria" ref={divRef}>
        {(!data && isValidating)
          ?
            Array.from({ length: perPage }, (_, i) => (
              <SkeletonCard key={i} />
            ))
          :
            data?.photos.map((item) => (
              <div
                key={item.id}
                className="grid-item mx-4 duration-300 relative overflow-hidden shadow-lg group rounded-2xl z-10"
              >
                <Image
                  src={item.src.original}
                  alt={item.alt}
                  title={item.alt}
                  className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover max-w-full max-h-full rounded-2xl"
                  width={item.width}
                  height={item.height}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 z-40 transition-opacity duration-300 text-white p-4">
                  <h1>{item.photographer}</h1>
                  <p className="text-[12px]">{item.alt}</p>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => {
            divRef.current?.scrollIntoView({
              inline: "center",
              behavior: "smooth",
            });
            dispatch({ type: ActionReducer.INCREMENT });
          }}
          title="Siguiente página"
          variant="outline"
          className="bg-gris text-zinc-300 rounded-lg"
        >
          Siguiente página
        </Button>
      </div>
    </div>
  );
}
