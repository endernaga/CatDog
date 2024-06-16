import { Link } from 'react-router-dom';
import './BreadCrumb.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  title1: string,
  title2?: string,
}

export const BreadCrumb: React.FC<Props> = ({ title1, title2 }) => {
  let link1 = '';
  if (title1 === 'Знайти друга') {
    link1 = '/pets'
  }
  return (
    <div className="breadcrumb">
      <Link to="/" className="icon icon-home" />
      
        <div className="icon icon-right" />
        <Link to='/pets' className="breadcrumb__link">
          <p
            className='breadcrumb__title'
          >
            {title1}
          </p>
      </Link>
      {title2 && (
        <>
        <div className="icon icon-right" />
        <div className="breadcrumb__link">
          <p
            className='breadcrumb__title'
          >
            {title2}
          </p>
          </div>
          </>
      )}
  </div>
  )
}