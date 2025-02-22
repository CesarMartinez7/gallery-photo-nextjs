export default function SkeletonCard() {
  return (
    <div className="grid-item mx-4 duration-300 relative overflow-hidden shadow-lg group rounded-2xl z-10 animate-pulse">
      <div className="w-full h-64 bg-zinc-900 rounded-2xl"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="h-4 bg-zinc-800 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
      </div>
    </div>
  );
}