import Image from "next/image";
import Link from "next/link";
import SvgFB from "../../../public/assets/fb";
import SvgX from "../../../public/assets/X";
import SvgInstagram from "../../../public/assets/Instagram";
import SvgThreads from "../../../public/assets/Threads";

export default function Footer(){

    return(
        <footer className="bg-[#f7f2c7] p-8 lg:pl-28 lg:pr-28 px-5 sm:px-20 text-black ">
        <section id="upper-footer" className="w-full">
          <div className="w-full flex flex-col gap-4 lg:flex-row  pb-8">
            <div className="lg:w-[55%] w-full flex flex-col">
              <div className="mb-8">
                <Image
                  src="/images/logo.png"
                  width={150}
                  height={50}
                  alt="instagram-icon"
                  priority
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex w-full">
                  <p className=" text-[19px] font-normal not-italic mb-8 lg:w-[78%] w-full">
                    Brindando el mejor servicio inmobiliario desde 2005.
                  </p>
                </div>
                <div className="hidden sm:flex flex-row w-full">
                  <p
                    className="lg:text-[28px] text-2xl mt-2 leading-[22px]
                   -tracking-[0.15px] font-semibold not-italic"
                  >
                    Seguinos
                  </p>
                  <div className="flex flex-row lg:ml-8 ml-5 mt-1 gap-4">
                    <Link href="https://www.instagram.com/immer.world/">
                      <SvgInstagram width={30} height={30}/>
                    </Link>
                    <Link href="https://twitter.com/immerEnt">
                      <SvgX width={30} height={30}/>
                    </Link>
                    <Link href="https://www.facebook.com/immerent">
                      <SvgFB width={30} height={30}/>
                    </Link>
                    <Link href="https://www.threads.net/@immer.world">
                      <SvgThreads width={30} height={30}/>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[45%] md:w-[80%]  w-full flex flex-row pt-2">
            <div className=" lg:w-2/4 md:w-[40%] w-2/4 flex flex-col ">
      <p className="text-primary mb-4 text-2xl font-semibold not-italic tracking-[-0.52px]">
          Navegar
      </p>
      <Link href="/home" className="mb-4 sm:text-[17px] text-[15px] not-italic font-medium leading-[31px] tracking-[-0.42px] hover:text-gray-300">
          Home
      </Link>
      <Link href="/alquileres" className="mb-4 sm:text-[17px] text-[15px] not-italic font-medium leading-[31px] tracking-[-0.42px] hover:text-gray-300">
          Alquileres
      </Link>
      <Link href="/venta" className="mb-4 sm:text-[17px] text-[15px] not-italic font-medium leading-[31px] tracking-[-0.42px] hover:text-gray-300">
          Ventas
      </Link>
  </div>
  
              <div className="lg:w-2/4 md:w-[60%] w-2/4 flex flex-col">
                <p className="text-primary mb-4 text-2xl font-semibold not-italic leading-[39px] tracking-[-0.52px]">
                  Contáctanos
                </p>
                <p className="w-full mb-4 lg:break-normal break-words sm:text-[17px] text-[15px]  not-italic font-medium leading-[31px] tracking-[-0.42px]">
                    inmobiliaria.centro@yahoo.com
                </p>
                <p className="mb-4 sm:text-[17px] text-[15px] ] sm:break-all not-italic font-medium leading-[31px] tracking-[-0.42px]">
                    02932 43-4360                
                </p>
                <p className="mb-4  sm:text-[17px] text-[15px]  not-italic font-medium leading-[31px] tracking-[-0.42px]">
                    25 de mayo 482, Punta Alta, Argentina
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr className="lg:hidden md:hidden block h-px w-full border-slate-800" />
        <section className="sm:hidden flex flex-row w-full mt-4  mb-4">
          <div className="w-[46%]">
            <p
              className=" lg:text-[28px] text-2xl mt-2 leading-[22px]
                   -tracking-[0.15px] font-semibold not-italic"
            >
              Follow Us
            </p>
          </div>
          <div className="flex flex-row justify-start w-2/4  lg:ml-8 ml-5 mt-1 gap-4">
                    <Link href="https://www.instagram.com/">
                      <SvgInstagram width={25} height={30}/>
                    </Link>
                    <Link href="https://twitter.com/">
                      <SvgX width={25} height={30}/>
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=100063544271389">
                      <SvgFB width={25} height={30}/>
                    </Link>
                    <Link href="https://www.threads.net/">
                      <SvgThreads width={25} height={30}/>
                    </Link>
          </div>
        </section>
        <hr className=" h-px w-full border-slate-800" />
        <section
          id="lower-footer"
          className="w-full flex sm:flex-row flex-col  lg:text-base text-xs font-semibold 
          not-italic tracking-tight leading-6 mt-8 gap-4"
        >
          <div className="justify-start lg:w-[55%] w-full">
            <p className="text-start lg:text-base text-sm leading-[31px] font-semibold not-italic">
              Copyright © 2024 Inmobiliaria Centro. All rights reserved
            </p>
          </div>
        </section>
      </footer>
    )
}