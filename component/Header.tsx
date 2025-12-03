"use client";
import { usePathname } from "next/navigation";

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HeaderProps } from '../types'
import { urlForImage } from "@/lib/sanity";

export const Header: React.FC<HeaderProps> = ({ logo, menus = [], rightLinks = [] }) => {
  const pathname = usePathname();

  // hide header on /studio (and any nested routes like /studio/...)
  if (pathname?.startsWith("/studio")) return null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)

  // only show mega menus if any item has links or a featuredProduct
  const menuHasContent = (menu: any) => {
    if (!menu?.items?.length) return false
    return menu.items.some((item: any) => {
      const sections = item?.megaContent ?? []
      return sections.some((section: any) => (section?.links?.length ?? 0) > 0 || Boolean(section?.featuredProduct))
    })
  }
  
  return (
    <header className=" shadow-sm relative z-50 !fixed w-full top-[10px] left-0">
      <div className="max-w-[1460px] bg-white  relative mx-auto flex items-center rounded-[10px] justify-between px-5">

        {/* Hamburger Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
       {/* Logo */}
        <div className="flex-shrink-0">
          {logo && (
            <Link href="/">
              <Image src={urlForImage(logo).url()} alt="Logo" width={150} height={50} />
            </Link>
          )}
        </div>


        {/* Left Menu (Desktop) */}
        <nav className="hidden md:flex gap-5 ">
          {menus.map((menu) => (
            <div key={menu.title ?? Math.random()} className="group">
              <span className="main-menu font-semibold cursor-pointer text-black flex items-center justify-center gap-1  py-7 px-2">
                  {menu.title}
                  {menuHasContent(menu) && (
                    <svg
                      className="w-5 h-4 text-gray-800 dark:text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7"/>
                    </svg>
                  )}
                </span>

              {/* Mega Menu — render only when there is content */}
              {menuHasContent(menu) && (
                <div className="mega-menu-desktop absolute left-0 rounded-[10px] h-[500px] top-[65px] mt-2 w-full bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-50 p-6 md:p-10 grid grid-cols-4 gap-6">
                    {menu.items?.map((item) => {

                       // ONLY SHOW IF item.title exists
                      if (!item?.title) return null;
                      const sections = item.megaContent ?? [];
                      return (
                        <div key={item.title ?? Math.random()}>
                          <h4 className="font-bold mb-3  text-[18px] text-left">{item.title}</h4>

                          {sections.map((section: any, idx: number) => (
                            <div key={idx} className="">
                              {/* menus */}
                              <ul className=" flex flex-col gap-2 items-start justify-center">
                                {section.links?.map((link: any) => (
                                  <li key={link.title ?? Math.random()}>
                                    {link?.url ? (
                                      <Link href={link.url} className="text-[16px] text-gray-600 hover:text-black">
                                        {link.title}
                                      </Link>
                                    ) : (
                                      <span className="text-[16px] text-gray-600">{link.title}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                               {/* product card */}
                              {section.featuredProduct?.image && (
                                <div className="mt-2 flex flex-col items-center">
                                  <Image
                                    src={urlForImage(section.featuredProduct.image).url()}
                                    alt={section.featuredProduct.title ?? ''}
                                    width={100}
                                    height={120}
                                    className="object-cover w-full h-[350px] rounded mb-4"
                                  />
                                 <div className='flex justify-between items-center w-full gap-3'>
                                   <p className="text-[20px] font-semibold ">{section.featuredProduct.title}</p>
                                  <p className="text-sm text-gray-500">${section.featuredProduct.price}</p>
                                 </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    }) || null}
                  </div>
              )}
            </div>
          ))}
        </nav>

        

        {/* Right Links */}
        <div className="hidden md:flex space-x-4">
          {rightLinks.map((link) =>
            link.url ? (
              <Link key={link.title ?? Math.random()} href={link.url}>
                {link.icon ? (
                  <Image src={urlForImage(link.icon).url()} alt={link.title} width={24} height={24} />
                ) : (
                  <span className="sr-only">{link.title}</span>
                )}
              </Link>
            ) : (
              <div key={link.title ?? Math.random()} className="flex items-center">
                {link.icon ? (
                  <Image src={urlForImage(link.icon).url()} alt={link.title} width={24} height={24} />
                ) : (
                  <span className="sr-only">{link.title}</span>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mega-menu-mobile absolute top-full left-0 w-full z-40">
          <nav className="flex flex-col space-y-2 p-4">
            {menus?.map((menu) => (
              <div key={menu.title ?? Math.random()}>
                <button
                  onClick={() => setOpenMegaMenu(openMegaMenu === menu.title ? null : menu.title)}
                  className="w-full text-left font-semibold py-2"
                >
                  {menu.title}
                </button>

                {/* Render sections (same structure as desktop) */}
                {openMegaMenu === menu.title && menuHasContent(menu) && (
                  <div className="pl-4 pb-4">
                    {menu.items?.map((item) => {
                        // Prevent rendering section without title — same as desktop
                       if (!item?.title) return null;
                      const sections = item.megaContent ?? [];
                      return (
                        <div key={item.title ?? Math.random()} className="mb-4">
                          <h4 className="font-bold mb-2">{item.title}</h4>

                          {sections.map((section: any, idx: number) => (
                            // menus 
                            <div key={idx} className="space-y-2">
                              <ul className="space-y-1">
                                {section.links?.map((link: any) => (
                                  <li key={link.title ?? Math.random()}>
                                    {link?.url ? (
                                      <Link href={link.url} className="text-sm text-gray-600 hover:text-black">
                                        {link.title}
                                      </Link>
                                    ) : (
                                      <span className="text-sm text-gray-600">{link.title}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                                {/* product card */}
                              {section.featuredProduct && (
                                <div className="mt-2 flex items-start gap-3">
                                  {section.featuredProduct.image && (
                                    <Image
                                      src={urlForImage(section.featuredProduct.image).url()}
                                      alt={section.featuredProduct.title ?? ''}
                                      width={80}
                                      height={80}
                                      className="object-cover rounded"
                                    />
                                  )}
                                  <div>
                                    <p className="text-sm font-semibold">{section.featuredProduct.title}</p>
                                    <p className="text-sm text-gray-500">${section.featuredProduct.price}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Right Links in Mobile */}
            <div className="flex space-x-4 mt-4">
              {rightLinks?.map((link) =>
                link?.url ? (
                  <Link key={link.title ?? Math.random()} href={link.url}>
                    {link.icon ? (
                      <Image src={urlForImage(link.icon).url()} alt={link.title} width={24} height={24} />
                    ) : (
                      <span className="sr-only">{link.title}</span>
                    )}
                  </Link>
                ) : (
                  <div key={link.title ?? Math.random()} className="flex items-center">
                    {link.icon ? (
                      <Image src={urlForImage(link.icon).url()} alt={link.title} width={24} height={24} />
                    ) : (
                      <span className="sr-only">{link.title}</span>
                    )}
                  </div>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
