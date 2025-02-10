

export default function Navbar() {
  return (
    <div className="w-full flex justify-center top-4 sticky z-30">
      <header className={`h-12 items-center px-4 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gris w-[100vh] bg-zinc-700`}>
        <nav className="flex justify-between h-full items-center">
          <div>
            <h1 className="bg-gradient-to-br from-zinc-500 to-zinc-300 bg-clip-text text-transparent">
              Gallery
            </h1>
          </div>
          <div>
            <h1 className="text-zinc-400">Menu</h1>
          </div>
        </nav>
      </header>
    </div>
  );
}
