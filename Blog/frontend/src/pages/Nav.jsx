import React from 'react'

function Nav() {
  return (
    <header className="bg-black fixed top-0 left-0 right-0 w-full">
      <div className="mx-0 max-w-full px-0 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <nav aria-label="Global" className="flex-1 flex justify-center pl-24 ml-24">
              <p className='text-white text-lg text-center '>
                Blog Application
              </p>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-white hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-black shadow"
                href="/Login"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md bg-gray-500 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-black "
                  href="/SignUp"
                >
                  Register
                </a>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav