import { useState } from 'react'

const CenterBlockFilter = () => {
  const [visibleFilter, setVisibleFilter] = useState(null)

  const toggleVisibleFilter = (filter) => {
    setVisibleFilter(visibleFilter === filter ? null : filter)
  }

  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>

      <div className="filter__button-wrapper">
        <button
          className={`filter__button button-author ${
            visibleFilter === 'author' ? `_btn-text_active` : `_btn-text`
          }`}
          onClick={() => toggleVisibleFilter('author')}
        >
          исполнителю
        </button>
        {visibleFilter === 'author' && (
          <div className="filter__box">
            <ul className="filter__list">
              <li className="filter__item">Исполнитель1</li>
              <li className="filter__item">Исполнитель2</li>
              <li className="filter__item">Исполнитель3</li>
              <li className="filter__item">Исполнитель4</li>
              <li className="filter__item">Исполнитель5</li>
              <li className="filter__item">Исполнитель6</li>
              <li className="filter__item">Исполнитель7</li>
              <li className="filter__item">Исполнитель8</li>
              <li className="filter__item">Исполнитель9</li>
            </ul>
          </div>
        )}
      </div>

      <div className="filter__button-wrapper">
        <button
          className={`filter__button button-author ${
            visibleFilter === 'year' ? `_btn-text_active` : `_btn-text`
          }`}
          onClick={() => toggleVisibleFilter('year')}
        >
          году выпуска
        </button>
        {visibleFilter === 'year' && (
          <div className="filter__box">
            <ul className="filter__list">
              <li className="filter__item">1980</li>
              <li className="filter__item">1990</li>
              <li className="filter__item">2000</li>
              <li className="filter__item">2010</li>
              <li className="filter__item">2015</li>
            </ul>
          </div>
        )}
      </div>
      <div className="filter__button-wrapper">
        <button
          className={`filter__button button-author ${
            visibleFilter === 'genre' ? `_btn-text_active` : `_btn-text`
          }`}
          onClick={() => toggleVisibleFilter('genre')}
        >
          жанру
        </button>
        {visibleFilter === 'genre' && (
          <div className="filter__box">
            <ul className="filter__list">
              <li className="filter__item">Рок</li>
              <li className="filter__item">Поп</li>
              <li className="filter__item">Техно</li>
              <li className="filter__item">Джаз</li>
              <li className="filter__item">Металл</li>
              <li className="filter__item">Классика</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default CenterBlockFilter
