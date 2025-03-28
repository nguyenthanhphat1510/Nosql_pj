import React from 'react'

const Footer = () => {
  return (
    <footer className="py-8 mt-10 text-gray-700 bg-white-100m px-15">
      <div className="container grid grid-cols-1 gap-6 mx-auto md:grid-cols-4">
        {/* Tasty Treat Section */}
        <div className="flex flex-col items-center md:items-start">
          {/* <div className="mb-4">
            <img src="/logo.png" alt="Iphone" className="w-12 h-12" />
          </div> */}

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-red-600">
              Iphone
            </a>
          </div>
          {/* <h3 className="text-lg font-bold">Iphone</h3> */}
          <p className="mt-2 text-sm text-center md:text-left">
            Iphone Luxurious Innovation Enterprises
          </p>
        </div>

        {/* Delivery Time Section */}
        <div>
          <h3 className="text-lg font-bold">Working Time</h3>
          <p className="mt-2 text-sm">
            <strong>Sunday - Thursday:</strong> 10:00am - 11:00pm
          </p>
          <p className="mt-1 text-sm">
            <strong>Friday - Saturday:</strong> Offday
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <p className="mt-2 text-sm">
            <strong>Location:</strong> HCM
          </p>
          <p className="mt-1 text-sm">
            <strong>Phone:</strong> 033xxxxxxx
          </p>
          <p className="mt-1 text-sm">
            <strong>Email:</strong> ntp2k4@gmail.com
          </p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-bold">Newsletter</h3>
          <p className="mt-2 text-sm">Subscribe our newsletter</p>
          <div className="flex items-center mt-4 border border-gray-400 rounded-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 text-gray-700 outline-none"
            />
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
              &#10148;
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="pt-4 mt-8 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Copyright - 2022, website made by NTP. All Rights Reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-lg text-red-500">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-lg text-red-500">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-lg text-red-500">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer