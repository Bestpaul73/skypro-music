import { useEffect, useState } from 'react'

import * as S from './CenterBlockFilter.styles.js'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/playerSlice.js'

const dateSorting = ['Сначала старые', 'По умолчанию', 'Сначала новые']

const CenterBlockFilter = () => {
  const [visibleFilter, setVisibleFilter] = useState(null)
  const [authorList, setAuthorList] = useState([])
  const [genreList, setGenreList] = useState([])
  const { playList } = useSelector((state) => state.playerApp)
  const dispatch = useDispatch()

  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }

  useEffect(() => {
    if (playList.length) {
      const authors = playList.map((el) => el.author)
      const authorSet = new Set(authors)
      setAuthorList(Array.from(authorSet))

      const genre = playList.map((el) => el.genre)
      const genreSet = new Set(genre)
      setGenreList(Array.from(genreSet))
    }
  }, [playList])

  return (
    <S.CenterBlockFilterDiv>
      <S.FilterTitleDiv>Искать по:</S.FilterTitleDiv>

      <S.FilterButtonWrapper>
        <S.FilterButton
          $isActive={visibleFilter === 'author'}
          onClick={() => toggleVisibleFilter('author')}
        >
          исполнителю
        </S.FilterButton>
        {visibleFilter === 'author' && (
          <S.FilterBoxDiv>
            <S.FilterListUl>
              {authorList.map((item) => (
                <S.FilterItem
                  key={item}
                  onClick={() =>
                    dispatch(
                      setFilters({ filterName: 'authors', filterValue: item }),
                    )
                  }
                >
                  {item}
                </S.FilterItem>
              ))}
            </S.FilterListUl>
          </S.FilterBoxDiv>
        )}
      </S.FilterButtonWrapper>

      <S.FilterButtonWrapper>
        <S.FilterButton
          $isActive={visibleFilter === 'year'}
          onClick={() => toggleVisibleFilter('year')}
        >
          году выпуска
        </S.FilterButton>
        {visibleFilter === 'year' && (
          <S.FilterBoxDiv>
            <S.FilterListUl>
              {dateSorting.map((item) => (
                <S.FilterItem key={item}>{item}</S.FilterItem>
              ))}
            </S.FilterListUl>
          </S.FilterBoxDiv>
        )}
      </S.FilterButtonWrapper>

      <S.FilterButtonWrapper>
        <S.FilterButton
          $isActive={visibleFilter === 'genre'}
          onClick={() => toggleVisibleFilter('genre')}
        >
          жанру
        </S.FilterButton>
        {visibleFilter === 'genre' && (
          <S.FilterBoxDiv>
            <S.FilterListUl>
              {genreList.map((item) => (
                <S.FilterItem key={item}>{item}</S.FilterItem>
              ))}
            </S.FilterListUl>
          </S.FilterBoxDiv>
        )}
      </S.FilterButtonWrapper>
    </S.CenterBlockFilterDiv>
  )
}

export default CenterBlockFilter
