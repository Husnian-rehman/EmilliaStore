import React from 'react';
import { FooterData } from '@/types';

interface FooterProps {
  data: FooterData;
}

export const Footer: React.FC<FooterProps> = ({ data }) => {
  if (!data) return null;

  return (
    <footer className="bg-[#f5f6fc] text-gray-700 py-20">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">

          {/* Logo & Address */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            {data.logo && (
              <img src={data.logo} alt="Footer Logo" className="h-[36px] w-auto" />
            )}

            <ul className="space-y-2">
              {data.address && (
                <li className="flex items-start text-sm space-x-2 text-gray-700">
                  <svg width="15" height="15" fill="currentColor" className='min-w-[15px]'>
                    <path d="M7.49981 0C4.50436 0 2.06738 2.43697 2.06738 5.4324C2.06738 9.14982 6.92888 14.6072 7.13586 14.8377C7.33027 15.0543 7.66971 15.0539 7.86377 14.8377C8.07075 14.6072 12.9322 9.14982 12.9322 5.4324C12.9322 2.43697 10.4952 0 7.49981 0ZM7.49981 8.1656C5.99272 8.1656 4.76665 6.93949 4.76665 5.4324C4.76665 3.92531 5.99275 2.69924 7.49981 2.69924C9.00688 2.69924 10.2329 3.92534 10.2329 5.43243C10.2329 6.93952 9.00688 8.1656 7.49981 8.1656Z" />
                  </svg>
                  <p>{data.address}</p>
                </li>
              )}
            </ul>
          </div>

          {/* Dynamic Menus */}
          {data.menus?.map((menu, index) => (
            <div key={index} className='md:text-left text-center'>
              <h2 className="text-xl font-semibold mb-4 text-black ">{menu.title}</h2>
              <ul className="space-y-2 text-md">
                {menu.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="hover:text-gray-900 transition text-gray-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className='md:col-span-2 xl:col-span-1 lg:!col-start-2 xl:!col-start-auto text-center xl:text-left'>
            <h2 className="text-xl font-semibold mb-4 text-black">
              Subscribe Our Newsletter
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {data.newsletterText ||
                'Join our newsletter for exclusive updates, special offers, and the latest news delivered straight to your inbox!'}
            </p>
            <form className="flex flex-col gap-2 max-w-[500px] lg:max-w-auto mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border rounded-xl bg-white text-black text-sm outline-none focus:ring-2 focus:ring-gray-500 flex-1"
              />
              <button
                type="submit"
                className="px-4 overflow-hidden relative py-2 bg-black hover:text-black text-white group text-sm rounded-xl font-semibold transtion-all duration-600 ease-in-out cursor-pointer"
              >
                <span className='relative z-[2]'>Subscribe</span>
                <span className="w-0 bg-white absolute h-full z-[1] top-0  right-[-1px]  group-hover:w-full group-hover:right-0  transtion-all duration-600 ease-in-out "></span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <p className="text-center text-[16px] text-gray-700 mt-10">
          {data.copyright || '© 2024 My Company. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};
