import { useParams } from 'react-router-dom'
import * as S from './Category.styles'
import CenterBlockContent from '../../components/CenterBlockContent/CenterBlockContent'
import CenterBlockSearch from '../../components/CenterBlockSearch/CenterBlockSearch'
import { useGetCategoryTracksQuery } from '../../store/api/tracksApi'

export const Category = () => {
  const params = useParams()
  const { data, isLoading, error } = useGetCategoryTracksQuery(params.id)
  console.log(data);

  return (
    <section>
      <CenterBlockSearch />

      <S.CenterBlockH2>{data?.name}</S.CenterBlockH2>
      <CenterBlockContent
        tracks={data?.tracks}
        isLoading={isLoading}
        error={error}
      />
    </section>
  )
}
