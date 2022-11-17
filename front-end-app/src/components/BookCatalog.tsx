import { Container } from './Container';
import { Title } from './Title';
import { Navbar } from "./Navbar";
import { BookCatalogMenu } from './BookCatalogMenu';
import { useState } from 'react';
import { BooksList } from './BooksList';
import BookCard from './BookCard';

export function BookCatalog () {
  return (
    <Container>
      <Title/>
      <Navbar/>
      <BookCatalogMenu/>
      <div className="row">
        <BooksList/>
      </div>
    </Container>
  )
}
