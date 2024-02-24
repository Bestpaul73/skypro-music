import { useDispatch, useSelector } from 'react-redux'
import { getAllTracks } from '../../api'
import CenterBlockContent from '../../components/CenterBlockContent/CenterBlockContent'
import CenterBlockFilter from '../../components/CenterBlockFilter/CenterBlockFilter'
import CenterBlockSearch from '../../components/CenterBlockSearch/CenterBlockSearch'
import * as S from './MainTracks.styles'
import { setPlayList } from '../../store/playerSlice'
import { useContext, useEffect } from 'react'
import { loadingContext } from '../../Context'
import { useGetAllTracksQuery } from '../../store/api/tracksApi'

export const MainTracks = () => {
  const dispatch = useDispatch()
  // const { getTracksError, setGetTracksError } = useContext(loadingContext)
  // const { loading, setLoading } = useContext(loadingContext)
  const isPlaying = useSelector((state) => state.playerApp.isPlaying)

  // const handleGetAllTracks = () => {
  //   getAllTracks()
  //     .then((allTracks) => {
  //       dispatch(setPlayList({ playList: allTracks }))
  //       console.log('получили все треки')
  //       console.log(allTracks)
  //     })
  //     .catch((error) => {
  //       console.log(`Ошибка загрузки`)
  //       setGetTracksError(error.message)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //       console.log(isPlaying)
  //     })
  // }

  const { data, isLoading, error } = useGetAllTracksQuery()
  useEffect(() => {
    if (data?.length) dispatch(setPlayList({ playList: data }))
  }, [data])

  return (
    <>
      <CenterBlockSearch />
      <S.CenterBlockH2>Все треки</S.CenterBlockH2>
      <CenterBlockFilter />
      <CenterBlockContent tracks={data} isLoading={isLoading} error={error} />
    </>
  )
}
