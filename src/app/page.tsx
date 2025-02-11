"use client";
const KEY =
  process.env.API_KEY ??
  "Uz4OHLXsoKO4P0fCMEaLEJVmNFuzqdq0cc7qNu6G5RfgQESxk1xebNIr";
import Response from "../types/image";
import { ActionReducer } from "@/store/useIncrement";
import Image from "next/image";
import { useEffect, useState, useReducer, useRef } from "react";
import { Button } from "@/components/ui/button";
import reducer from "@/store/useIncrement";

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, { count: 1  });
  const [data, setData] = useState<Response | undefined>();
  useEffect(() => {
    fetch(`https://api.pexels.com/v1/curated?page=${state.count}&per_page=40`, {
      method: "GET",
      headers: {
        Authorization: `${KEY}`, // Corrección aquí
      },
    })
      .then((response) => response.json())
      .then((datae) => setData(datae));
  }, [state.count]);

  return (
    <div className="flex justify-center w-full h-full items-center flex-col ">
      <h1 className="text-2xl mt-8">{state.count}</h1>
      <div className="lg:w-[70vw] grid-cols-galeria " ref={divRef}>
        {data?.photos.map((item) => (
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
        <Button
          onClick={() => {
            divRef.current?.scrollIntoView({inline:"center", behavior:"smooth"})
            dispatch({ type: ActionReducer.INCREMENT });
          }}
          title="Hello world"
          variant={"outline"}
          className="bg-gris text-zinc-300 rounded-lg"
        >
          Siguiente pagina
        </Button>
      </div>
    </div>
  );
}
