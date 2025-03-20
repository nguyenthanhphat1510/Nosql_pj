import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white-100m mt-10 px-15 text-gray-700 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Tasty Treat Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
            <img src="/logo.png" alt="Iphone" className="w-12 h-12" />
          </div>
          <h3 className="font-bold text-lg">Iphone</h3>
          <p className="text-sm text-center md:text-left mt-2">
            Công ty cổ phần công nghệ Iphone
          </p>
        </div>

        {/* Delivery Time Section */}
        <div>
          <h3 className="font-bold text-lg">Working Time</h3>
          <p className="text-sm mt-2">
            <strong>Sunday - Thursday:</strong> 10:00am - 11:00pm
          </p>
          <p className="text-sm mt-1">
            <strong>Friday - Saturday:</strong> Offday
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-bold text-lg">Contact</h3>
          <p className="text-sm mt-2">
            <strong>Location:</strong> HCM
          </p>
          <p className="text-sm mt-1">
            <strong>Phone:</strong> 033xxxxxxx
          </p>
          <p className="text-sm mt-1">
            <strong>Email:</strong> ntp2k4@gmail.com
          </p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold text-lg">Newsletter</h3>
          <p className="text-sm mt-2">Subscribe our newsletter</p>
          <div className="mt-4 flex items-center border border-gray-400 rounded-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 flex-grow text-gray-700 outline-none"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
              &#10148;
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          Copyright - 2022, website made by NTP. All Rights Reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-red-500 text-lg">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-red-500 text-lg">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-red-500 text-lg">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer