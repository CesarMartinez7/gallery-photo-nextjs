"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { useQuery } from "@/store/useQuery";
import Response from "../types/image";

const API_KEY =
  process.env.API_KEY ??
  "Uz4OHLXsoKO4P0fCMEaLEJVmNFuzqdq0cc7qNu6G5RfgQESxk1xebNIr";


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
  const query = useQuery((state) => state.query);
  const [page, setPage] = useState(1);
  const [perPage] = useState<number>(20);
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ENDPOINT = `https://api.pexels.com/v1/search?query=${
    query.length === 0 ? "Naturaleza" : query
  }&per_page=${perPage}&page=${page}`;

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(ENDPOINT, {
          headers: { Authorization: API_KEY },
        });
        if (!res.ok) throw new Error("Error al cargar las imágenes");

        const result: Response = await res.json();
        setData(result);
      } catch (err) {
        setError("Error al cargar las imágenes");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [ENDPOINT]);

  return (
    <div className="relative flex justify-center w-full h-fit items-center flex-col">
      <Particles className="absolute w-full z-[-1]" />
      <h1 className="text-2xl mt-8">Página: {page}</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="lg:w-[70vw] grid-cols-galeria" ref={divRef}>
        {loading
          ? Array.from({ length: perPage }, (_, i) => <SkeletonCard key={i} />)
          : data?.photos.map((item) => (
              <div
                key={item.id}
                className="grid-item mx-4 duration-300 relative overflow-hidden shadow-lg group rounded-2xl z-10"
              >
                <img
                  src={item.src.original}
                  alt={item.alt}
                  title={item.alt}
                  className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover max-w-full max-h-full rounded-2xl"
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
            divRef.current?.scrollIntoView({ inline: "center", behavior: "smooth" });
            setPage((prev) => prev + 1);
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
