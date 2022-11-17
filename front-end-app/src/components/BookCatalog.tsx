import { Container } from './Container';
import { Title } from './Title';
import { Navbar } from "./Navbar";
import { BookCatalogMenu } from './BookCatalogMenu';
import BooksList from './BooksList';

export function BookCatalog () {
  return (
    <Container>
      <Title/>
      <Navbar/>
      <BookCatalogMenu/>
      <BooksList/>
    </Container>
  )
}
