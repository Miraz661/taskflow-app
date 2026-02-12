import { FaAngleLeft } from "react-icons/fa6";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
export default function NotFound() {
  return (
    <div>
      <div className="containers flex flex-col md:flex-row  justify-center items-center h-screen gap-10 pt-8">
        {/* Left Content */}
        <div className="space-y-4 max-w-lg order-1 md:order-0">
          <h3 className="text-black font-medium text-[48px] leading-[120%] font-poppins">
            Oops...
          </h3>

          <p className="text-black font-normal text-[24px] leading-[150%] font-poppins">
            Page Not Found
          </p>

          <p className="text-[#4B4B4B] font-normal text-[18px] leading-[150%] font-poppins">
            This page doesn't exist or was removed! <br /> We suggest you go back to the Home page.
          </p>

          <Link href="/">
          <button className="text-white font-normal text-[16px] leading-[150%] font-poppins bg-[#FF4D4F] px-4 py-2.5 rounded-lg mt-13.5 flex items-center gap-1.5 cursor-pointer">
            <FaAngleLeft />
            Back to home
          </button></Link>
        </div>

        {/* Image */}
        <div>
          <Image
            src="/images/errorPage.png"
            alt="error"
            width={431}
            height={500}
            className=''
          />
        </div>
      </div>
    </div>
  )
}
