import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-section">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/bg3.jpg')] bg-cover bg-center" />
        
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        {/* Additional dimming layer */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 drop-shadow-lg">
            SVENSKA HÖJDBOLAGET
          </h2>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            ERT FÖRSTAVAL INOM STÄLLNINGSLÖSNINGAR
          </h1>

          <p className="text-xl text-white mb-8 drop-shadow-md">
            Svenska HöjdBolaget i Kristianstad AB är ett företag med huvudkontor i Kristianstad. 
            Vi har i dagsläget ett flertal avdelningar som utför ställningsarbeten åt privatpersoner, 
            myndigheter och entreprenörer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/request-quote"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200 shadow-lg"
            >
              Begär offert
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
            <Link
              to="#services"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-secondary transition-colors duration-200 shadow-lg"
            >
              Våra tjänster
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center text-white text-xl drop-shadow-md">
              <svg className="h-6 w-6 mr-3 text-primary filter drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Trygghet och säkerhet är vår expertis</span>
            </div>
            <div className="flex items-center text-white text-xl drop-shadow-md">
              <svg className="h-6 w-6 mr-3 text-primary filter drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Erfarna yrkesarbetare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero 