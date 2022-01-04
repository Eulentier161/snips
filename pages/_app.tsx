import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Container, Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Snippets</Navbar.Brand>
          </Link>
          {router.pathname == "/" ? null : (
            <Nav>
              <Link href="/" passHref>
                <Nav.Link>Create</Nav.Link>
              </Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
