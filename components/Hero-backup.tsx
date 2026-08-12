export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center text-white">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
  गोरखपुर का सबसे भरोसेमंद
  <br />
  Scrap Pickup Service
</h1>

        <p className="mt-6 text-xl">
          घर बैठे अपना कबाड़ बेचें।
          <br />
          हमारी टीम आपके घर से Pickup करेगी।
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <a
            href="#booking"
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
          >
            🚚 Book Pickup
          </a>

          <a
            href="https://wa.me/917377788810"
            target="_blank"
            className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1EBE5D] transition duration-300"
          >
            💬 WhatsApp
          </a>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-white/20 backdrop-blur rounded-xl p-6">
            <h2 className="text-3xl font-bold">1000+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-xl p-6">
            <h2 className="text-3xl font-bold">Same Day</h2>
            <p>Pickup</p>
          </div>

          <div className="bg-white/20 backdrop-blur rounded-xl p-6">
            <h2 className="text-3xl font-bold">Best</h2>
            <p>Market Rates</p>
          </div>

        </div>

      </div>
    </section>
  );
}