import React, { useContext } from 'react';
import './Pagination.scss';
import { GlobalContext } from '../../context/GlobalContext';
import classNames from 'classnames';
import { Filters } from '../../types/sortFilters';

type Props = {
  numOfPages: number,
  updateSearchParams: (newFilters: Partial<Filters>) => void,
}

export const Pagination: React.FC<Props> = ({ numOfPages, updateSearchParams }) => {
  let pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  };

  const { filters } = useContext(GlobalContext);

  return (
    <div className="pagination">
      <div className="pagination__hand">  
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4373 16L21.0373 22.6L19.152 24.4866L10.6667 16L19.152 7.51465L21.0373 9.39998L14.4373 16Z"
                fill="currentColor"
              />
            </svg>

          </div>
      <div className="pagination__slider">
        <li className="pagination__list">
          {pages.map((page) => (
            <li
              className={classNames('pagination__item', {
                'pagination__item--active': page === filters.page,
              })}
              key={page}
              onClick={() => updateSearchParams({page: page})}
            >
              {page}
            </li>
          ))}
        </li>
      </div>
      <div className="pagination__hand">
      <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5626 16L10.9626 9.39999L12.848 7.51599L21.3333 16L12.848 24.4853L10.9626 22.5987L17.5626 16Z"
                fill="currentColor"
              />
            </svg>
      </div>
    </div>
  )
}