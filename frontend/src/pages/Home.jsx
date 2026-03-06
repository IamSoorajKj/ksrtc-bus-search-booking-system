import Hero from '@/components/Hero'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div>
      <Hero />
    </div>
  )
}

export default Home
