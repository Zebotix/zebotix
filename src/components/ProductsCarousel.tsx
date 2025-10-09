'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Data: solutions + short product ideas and one-line reason
const SOLUTIONS = [
  {
    id: 'ecommerce',
    title: 'E‑commerce / Multi‑vendor',
    subtitle: 'Stores & marketplaces for retail businesses',
    products: [
      {
        name: 'Winter clothing (coats, hoodies, shawls)',
        why: 'High seasonal demand; good margins',
      },
      { name: 'Perfumes & itar', why: 'Popular gifting category; high margins' },
      { name: 'Cosmetics & skincare', why: 'Growing online personal care market' },
      { name: 'Mobile accessories', why: 'Fast repeat purchases; low ticket items' },
      { name: 'Small home appliances', why: 'High-value items for home shoppers' },
    ],
  },
  {
    id: 'fashion',
    title: 'Fashion / Clothing (Seasonal)',
    subtitle: 'Seasonal drops, bundles and collections',
    products: [
      { name: 'Woollen shawls & mufflers', why: 'Local winter staple with strong demand' },
      { name: 'Quilted jackets & thermals', why: 'Functional items that sell in cold months' },
      { name: 'Knitted caps & winter footwear', why: 'Accessory upsells for bundles' },
    ],
  },
  {
    id: 'perfume',
    title: 'Perfumes & Itar (Niche)',
    subtitle: 'High-margin gifting & personal fragrance',
    products: [
      { name: 'Branded perfumes', why: 'Recognized brands convert well online' },
      { name: 'Local itar blends', why: 'Cultural preference; popular as gifts' },
      { name: 'Fragrance gift sets', why: 'Great during wedding/holiday seasons' },
    ],
  },
  {
    id: 'beauty',
    title: 'Cosmetics & Beauty',
    subtitle: 'Skincare, makeup & grooming',
    products: [
      { name: 'Halal skincare & serums', why: 'Local preference + rising organic demand' },
      { name: 'Makeup kits & henna', why: 'High repeat buyers and gifting' },
      { name: 'Men’s grooming kits', why: 'Expanding mens personal care market' },
    ],
  },
  {
    id: 'electronics',
    title: 'Electronics & Mobile Accessories',
    subtitle: 'Fast-selling accessories and devices',
    products: [
      { name: 'Phone cases & chargers', why: 'Low-cost, high-repeat items' },
      { name: 'Power banks & earphones', why: 'Everyday essentials with good margins' },
      { name: 'Budget smartphones', why: 'Large local demand for affordable devices' },
    ],
  },
  {
    id: 'home-winter',
    title: 'Home & Winter Essentials',
    subtitle: 'Comfort and seasonal appliances',
    products: [
      { name: 'Electric heaters & heated blankets', why: 'Seasonal spikes in colder months' },
      { name: 'Hot water bottles & hand warmers', why: 'Low-cost, widely used items' },
      { name: 'Heavy blankets & thermal bedding', why: 'High local demand in winter regions' },
    ],
  },
  {
    id: 'grocery',
    title: 'Grocery & Specialty Foods',
    subtitle: 'Local flavors & ready-to-eat',
    products: [
      { name: 'Artisanal pickles & chutneys', why: 'Local tastes; giftable' },
      { name: 'Frozen parathas & ready meals', why: 'Convenience sells in urban markets' },
      { name: 'Gourmet spices & confectionery', why: 'Good repeat purchase potential' },
    ],
  },
  {
    id: 'services-marketplace',
    title: 'Salon & Beauty Services Marketplace',
    subtitle: 'Booking app + product upsell',
    products: [
      { name: 'Home bridal makeups & treatments', why: 'High conversion with local logistics' },
      { name: 'Salon product bundles', why: 'Upsell during bookings' },
      { name: 'Subscription care plans', why: 'Recurring revenue model' },
    ],
  },
  {
    id: 'power',
    title: 'Small Appliances & Power Solutions',
    subtitle: 'Backup power & energy products',
    products: [
      { name: 'Inverters & UPS', why: 'Essential during load-shedding' },
      { name: 'Solar power banks & panels', why: 'Growing renewable interest' },
      { name: 'Efficient heaters', why: 'High seasonal demand' },
    ],
  },
  {
    id: 'jewelry',
    title: 'Jewelry & Accessories',
    subtitle: 'Gifting, weddings & fashion',
    products: [
      { name: 'Lightweight gold/plated jewellery', why: 'Wedding season demand' },
      { name: 'Kundan / local-inspired pieces', why: 'Cultural appeal and gifting' },
      { name: 'Watches & cufflinks', why: 'Men’s gifting & accessories' },
    ],
  },
  {
    id: 'kids',
    title: 'Kids & Baby Products',
    subtitle: 'High-repeat essentials & gifts',
    products: [
      { name: 'Winter baby clothes & thermals', why: 'Seasonal and repeat purchases' },
      { name: 'Diapers & baby skincare', why: 'Essential repeat items' },
      { name: 'Educational toys', why: 'Parents invest in learning tools' },
    ],
  },
  {
    id: 'handmade',
    title: 'Handmade & Local Artisans',
    subtitle: 'Crafts, truck-art & cultural goods',
    products: [
      {
        name: 'Ajrak scarves & handcrafted textiles',
        why: 'Strong local identity and tourist appeal',
      },
      { name: 'Truck-art merchandise', why: 'Unique gifts & home decor' },
      { name: 'Handmade perfumes & soaps', why: 'Premium artisan positioning' },
    ],
  },
];

// Additional platform offerings
const PLATFORMS = [
  { id: 'lms', title: 'Learning Management System (LMS)' },
  { id: 'hotel', title: 'Hotel / Hospitality Management' },
  { id: 'portfolio', title: 'Portfolio / Showcase Web App' },
  { id: 'erp', title: 'Finance / Accounting / ERP' },
  { id: 'inventory', title: 'Inventory & Supply Chain' },
  { id: 'ecommerce-platform', title: 'E‑commerce Platforms' },
  { id: 'booking', title: 'Booking & Reservation Systems' },
  { id: 'workflow', title: 'Document Management / Workflow' },
  { id: 'subscription', title: 'Subscription / Membership Management' },
];

const ProductChip = ({ p }: any) => (
  <div className='flex-shrink-0 bg-zebotix-darkGray/70 border border-gray-800 rounded-xl px-4 py-2 mr-3 shadow-sm'>
    <div className='text-sm font-medium text-white'>{p.name}</div>
    <div className='text-xs text-gray-400 mt-1'>{p.why}</div>
  </div>
);

const HorizontalCarousel = ({ items }: { items: typeof SOLUTIONS }) => {
  const ref = useRef(null);

  const scroll = (dir = 'right') => {
    const el: any = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7; // scroll 70% of viewport
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <div className='relative'>
      <div className='flex items-center gap-3 mb-4'>
        <Button
          onClick={() => scroll('left')}
          variant='ghost'
          className='bg-zebotix-blue hover:bg-blue-600 p-2 rounded-full border border-gray-800'
          aria-label='Scroll left'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <div
          ref={ref}
          className='flex gap-4 overflow-x-auto py-2 px-1 no-scrollbar touch-pan-x scrollbar-gutter-stable'
          role='list'
          aria-label='Products carousel'
        >
          {items?.map((s: any, i: any) => (
            <article
              key={i}
              className='flex flex-col justify-between min-w-full sm:min-w-[40vw] md:min-h-[30vh] bg-gradient-to-b from-zebotix-darkGray to-zebotix-black rounded-xl space-y-6 p-5 text-center border border-gray-800'
            >
              <header className='mb-3'>
                <h3 className='text-xl sm:text-2xl font-semibold text-white'>{s.title}</h3>
                <p className='text-sm sm:text-lg text-gray-400'>{s.subtitle}</p>
              </header>

              <div className='flex flex-col items-center justify-between'>
                <Button asChild>
                  <a href={`/solutions/${s.id}`} className='text-sm'>
                    Learn more
                  </a>
                </Button>
                <span className='mt-3 text-xs text-gray-400'>Top categories • Local demand</span>
              </div>
            </article>
          ))}
        </div>
        <Button
          onClick={() => scroll('right')}
          variant='ghost'
          className='bg-zebotix-blue hover:bg-blue-600 p-2 rounded-full border border-gray-800'
          aria-label='Scroll right'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

const ProductsCarouselSection = () => {
  return (
    <section
      id='solutions'
      className='bg-zebotix-black py-16 md:py-24'
      aria-labelledby='solutions-heading'
    >
      <div className='section-container'>
        <div className='text-center max-w-4xl mx-auto mb-12'>
          <h2 id='solutions-heading' className='text-3xl md:text-4xl font-bold mb-3'>
            Zebotix Solutions — Local & Online Business Ideas
          </h2>
          <p className='text-gray-400'>
            12 practical business solutions that sell well in Karachi & Pakistan, with product ideas
            and short reasons. Use Zebotix to build the web, mobile or admin tools to sell them.
          </p>
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {SOLUTIONS.map((s) => (
            <article
              key={s.id}
              className='bg-gradient-to-b from-zebotix-darkGray to-zebotix-black rounded-xl p-5 border border-gray-800'
            >
              <header className='mb-3'>
                <h3 className='text-lg font-semibold text-white'>{s.title}</h3>
                <p className='text-xs text-gray-400'>{s.subtitle}</p>
              </header>

              <HorizontalCarousel items={s.products} />

              <div className='mt-3 flex items-center justify-between'>
                <Button asChild>
                  <a href={`/solutions/${s.id}`} className='text-sm'>
                    Learn how to sell
                  </a>
                </Button>
                <span className='text-xs text-gray-400'>Top categories • Local demand</span>
              </div>
            </article>
          ))}
        </div> */}

        <HorizontalCarousel items={SOLUTIONS} />
        {/* Platforms row */}
        <div className='mt-10'>
          <h3 className='text-xl font-bold mb-4'>Platforms & Systems Zebotix Builds</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {PLATFORMS.map((p) => (
              <div
                key={p.id}
                className='bg-zebotix-darkGray rounded-lg p-3 border border-gray-800 text-sm text-gray-300'
              >
                {p.title}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 text-center'>
          <Button asChild>
            <a href='/contact' className='px-6'>
              Talk to an expert
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsCarouselSection;
