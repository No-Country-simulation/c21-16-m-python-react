import React from 'react';
import './Home.css'
import Hero from './hero';
import { Tarjetas } from './tarjetas/tarjetas';
import { Unete } from './unete/Unete';

export const Home = () => {
  return (
    <div className='HOMEPAGE'>
        <Hero/>
        <Tarjetas/>
        <Unete/>
    </div>
  )
}
