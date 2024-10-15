import React from 'react';
import './Home.css'
import Hero from './hero';
import { Tarjetas } from './tarjetas/tarjetas';

export const Home = () => {
  return (
    <div className='HOMEPAGE'>
        <Hero/>
        <Tarjetas/>
    </div>
  )
}
