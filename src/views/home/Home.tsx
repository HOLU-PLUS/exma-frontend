import { GetInTouch, GetStarted, Header, Navbar } from '.'
import { Footer } from './footer'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <GetStarted />
      <GetInTouch />
      <Footer />
    </>
  )
}
