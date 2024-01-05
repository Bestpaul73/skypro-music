import { NavMenu } from '../../components/NavMenu/NavMenu'
import MainCenterBlock from '../../components/MainCenterBlock/MainCenterBlock'
import MainSideBar from '../../components/MainSideBar/MainSideBar'
import { MainDiv } from './Main.styles'
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer'
import { useState, useEffect, useContext } from 'react'
import { loadingContext } from '../../Context'
import { userContext } from '../../App'
import { useDispatch, useSelector } from 'react-redux'
import { stopTrack } from '../../store/playerSlice'

export const Main = () => {
  const [loading, setLoading] = useState(true)
  // const { currentTrack } = useContext(userContext)
  const currentTrack = useSelector((state) => state.playerApp.currentTrack)

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setLoading(false)
  //   }, 5000)
  //   return () => {
  //     clearTimeout(timeoutId)
  //   }
  // }, [])

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      <MainDiv>
        <NavMenu />
        <MainCenterBlock />
        <MainSideBar />
        {currentTrack && <AudioPlayer />}
      </MainDiv>
    </loadingContext.Provider>
  )
}
