import { useParams } from 'react-router-dom'
import * as S from './Category.styles'
import CenterBlockContent from '../../components/CenterBlockContent/CenterBlockContent'
import CenterBlockSearch from '../../components/CenterBlockSearch/CenterBlockSearch'
import { useGetCategoryTracksQuery } from '../../store/api/tracksApi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setPlayList } from '../../store/playerSlice'

export const Category = () => {
  const params = useParams()
  const { data, isLoading, error } = useGetCategoryTracksQuery(params.id)
  const searchString = useSelector((state) => state.playerApp.searchString)
  const dispatch = useDispatch()

  const filterTracks = () => {
    if (data?.tracks?.length) {
      let filteredTracks = [...data.tracks]

      if (searchString?.length) {
        filteredTracks = filteredTracks.filter((el) =>
          el.name.toLowerCase().includes(searchString.toLowerCase()),
        )
      }
      return filteredTracks
    }
    return []
  }

  const tracks = filterTracks()

  return (
    <section>
      <CenterBlockSearch />

      <S.CenterBlockH2>{data?.name}</S.CenterBlockH2>
      <CenterBlockContent tracks={tracks} isLoading={isLoading} error={error} />
    </section>
  )
}
