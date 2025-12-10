'use client';
import React, { useState } from 'react';
import { ServiceCategory } from '@/types';

interface ServicesProps {
  categories: ServiceCategory[];
  title?: string;
  description?: string;
}

export default function Services({ categories, title, description }: ServicesProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = categories[activeTab] || { title: '', slug: '', services: [] };

  return (
    <section className="py-16 bg-[#f5f6fc] ">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* Use provided title/description or fallbacks */}
        <h2 className="text-4xl text-center font-bold mb-3 text-black">{title || 'Popular Services'}</h2>
        <p className="text-center text-gray-600 mb-15">
          {description ||
            'Must explain to you how all this mistaken idea of denouncing pleasure born and give you a complete account the system'}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-[12px] sm:text-lg rounded-full border ${
                activeTab === idx ? 'bg-black text-white border-black' : ' bg-gray-400 text-white border-gray-400 cursor-pointer hover:bg-black hover:border-black hover:text-white transition-all ease-in-out duration-500' 
              } font-semibold transition`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeCategory.services.map((service, idx) => (
            <div key={idx} className="bg-white flex flex-col  items-center px-6 py-8 rounded-xl shadow hover:shadow-lg transition">
              {service.icon && (
                <div className="border-gray-700 border w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
              )}
              <h3 className="text-xl font-semibold text-black">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
              <a
                href={service.link}
                className="text-black font-semibold hover:underline inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {service.btnText || 'Learn More'} <span className="ml-1">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
