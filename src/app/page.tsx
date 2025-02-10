const KEY = "Uz4OHLXsoKO4P0fCMEaLEJVmNFuzqdq0cc7qNu6G5RfgQESxk1xebNIr";
import Response from "./types/image";
import Image from "next/image";


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
    <div className="flex justify-center w-full h-full">
      <div className="lg:w-[70vw] grid-cols-galeria ">
        {data.photos.map((item) => (
          <div
            key={item.id}
            className="grid-item mx-4 hover:bg-slate-300 duration-300 z-10 rounded-lg"
          >
            <Image
              src={item.src.original}
              alt={item.alt}
              title={item.alt}
              className="z-10 rounded-lg"
              width={item.width}
              height={item.height}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
}
