import React from 'react'

const stats = [
  { label: 'Års erfarenhet', value: '20+' },
  { label: 'Genomförda projekt', value: '1000+' },
  { label: 'Nöjda kunder', value: '500+' },
  { label: 'Certifieringar', value: '15+' },
]

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Image section */}
            <div className="relative mb-12 lg:mb-0">
              <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Replace with actual image */}
                <div className="absolute inset-0 bg-[url('/about-image.jpg')] bg-cover bg-center" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black/5 rounded-full" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-black/5 rounded-full" />
            </div>

            {/* Content section */}
            <div className="relative">
              <div>
                <h2 className="text-3xl font-extrabold text-secondary sm:text-4xl">
                  Din partner för säkra höjdarbeten
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Sedan 2003 har vi levererat professionella höjdarbetstjänster med högsta fokus på säkerhet och kvalitet. 
                  Vårt team består av erfarna och certifierade specialister som är redo att ta sig an de mest utmanande projekten.
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Vi investerar kontinuerligt i den senaste utrustningen och utbildning för att säkerställa att vi alltid 
                  levererar bästa möjliga resultat för våra kunder.
                </p>

                {/* Stats grid */}
                <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="relative"
                    >
                      <dt className="text-base font-medium text-gray-500">
                        {stat.label}
                      </dt>
                      <dd className="mt-2 text-3xl font-extrabold text-primary">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* CTA Button */}
                <div className="mt-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
                  >
                    Kontakta oss
                    <svg
                      className="ml-2 h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-1"
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 