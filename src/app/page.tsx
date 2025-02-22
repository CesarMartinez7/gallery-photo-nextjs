"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Particles from "@/components/ui/particles";
import { useQuery } from "@/store/useQuery";
import Response from "../types/image";
import { Suspense } from "react";
import SkeletonCard from "@/components/ui/skeleton";

const API_KEY = process.env.API_KEY
export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);
  const query = useQuery((state) => state.query);
  const page = useQuery((state) => state.count);
  const setPage = useQuery((state) => state.increment);

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
          method: "GET",
          headers: { Authorization: API_KEY },
        });
        if (!res.ok) throw new Error("Error al cargar las imágenes");

        const result: Response = await res.json();
        setData(result);
      } catch (err) {
        setError(`Error al cargar las imágenes ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [ENDPOINT]);

  return (
    <div className="relative flex justify-center w-full h-full items-center flex-col">
      <Particles
        particleColors={["#f2f", "#ff43"]}
        particleCount={200}
        particleSpread={10}
        speed={0.2}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
      {error && <p className="text-red-500">{error}</p>}

      <div className="lg:w-[70vw] my-12 grid-cols-galeria" ref={divRef}>
        {loading
          ? Array.from({ length: perPage }, (_, i) => <SkeletonCard key={i} />)
          : data?.photos.map((item) => (
              <Suspense key={item.id} fallback={<SkeletonCard />}>
                <div
                  key={item.id}
                  className="grid-item mx-4 duration-300 relative overflow-hidden shadow-lg group rounded-2xl z-10"
                >
                  <Image
                    src={item.src.large2x}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    title={item.alt}
                    className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover max-w-full max-h-full rounded-2xl"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/100 to-transparent opacity-0 group-hover:opacity-100 z-40 transition-opacity duration-300 text-white p-4">
                    <h1>{item.photographer}</h1>
                    <p className="text-[12px]">{item.alt}</p>
                  </div>
                </div>
              </Suspense>
            ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            divRef.current?.scrollIntoView({
              behavior: "smooth",
            });
            setPage(page + 1);
          }}
          className="rounded-xl shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3]  text-white font-light transition duration-200 ease-linear z-30"
        >
          Siguiente pagina
        </button>
      </div>
    </div>
  );
}
