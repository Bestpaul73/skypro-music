import { NavMenu } from './NavMenu/NavMenu'
import MainCenterBlock from './MainCenterBlock/MainCenterBlock'
import MainSideBar from './MainSideBar'

const Main = () => {
  return (
    <main className="main">
      <NavMenu />
      <MainCenterBlock />
      <MainSideBar />
    </main>
  )
}

export default Main
