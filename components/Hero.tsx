export default function Hero() {
  return (
    <div className="hero-gradient text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white border-opacity-30">
            <div className="text-center">
              <div className="text-4xl font-bold">FDM</div>
              <div className="text-xs mt-1 tracking-wider">LOGO</div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Welcome to FDM Data Solution Portal
        </h1>
        <p className="text-lg md:text-xl text-center max-w-4xl mx-auto text-white text-opacity-90">
          Financial Data Management (FDM) provides analytical and reporting support across the organization,
          focusing on data-driven insights, advanced analytics, and comprehensive reporting solutions.
        </p>
      </div>
    </div>
  );
}

