import Head from 'next/head'
import React from 'react'
import Banner from '@/components/Banner'
import FeaturedItems from '@/components/FeaturedItems'
import ContactSection from '@/components/ContactSection'
import ItemsSection from '@/components/ItemsSection'

// https://dummyjson.com/products
const index = () => {
  return (
    <div className='select-none overflow-hidden'>
      <Head>
        <title>Next Cart</title>
      </Head>
      <Banner />
      <FeaturedItems />
      <ItemsSection />
      <ContactSection />
    </div>
  )
}

export default index