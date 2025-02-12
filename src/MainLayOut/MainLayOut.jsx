import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const MainLayOut = () => {

  return (
    <>
      <header className='bg-[#E5D9F2]/95 sticky top-0 z-50'><Navbar />
      {/* <button onClick={handleToggleBtn} >Switch to Mode</button> */}
      </header>

        <main className='min-h-[calc(100vh-308px)]'>
        <Outlet/>
        </main>
        <footer className='bg-[#E5D9F2]'> <Footer/> </footer>
    </>
  )
}

export default MainLayOut