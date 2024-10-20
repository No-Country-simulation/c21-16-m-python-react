import React from 'react';
import './Autenticacion.css'
import { Page as Signin } from '../../routes/auth/signin';
import { Page as Singup} from '../../routes/auth/signup'

export const Autenticacion = () => {
  return (
    <div className='pagina-registro'>
        <Signin/>
        <Singup/>
    </div>
  )
}
