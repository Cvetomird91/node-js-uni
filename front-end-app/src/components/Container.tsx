import React from 'react'
import { Title } from './Title'
import { Navbar } from './Navbar'

export function Container () {
  return (
    <div className="container">
        <Title/>
        <Navbar/>
    </div>
  )
}
