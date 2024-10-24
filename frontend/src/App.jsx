import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import CreateHero from './pages/CreateHero/CreateHero'
import HeroInfo from './pages/HeroInfo/HeroInfo'
import { Suspense } from 'react'

function App() {

  return (
    //<Suspense fallback={<Loader />}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createHero" element={<CreateHero />} />
          <Route path="/infoAboutHero" element={<HeroInfo />} />
      </Routes>
    //</Suspense>
  )
}

export default App
