import { Link } from 'react-router-dom';
import './BreadCrumb.scss';
import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string,
}

export const BreadCrumb:React.FC<Props> = ({title}) => {
  return (
    <div className="breadcrumb">
      <Link to="/" className="icon icon-home" />
      
        <div className="icon icon-right" />
        <div className="navigation-link">
          <p
            className={classNames('navigation-title', {
            })}
          >
            {title}
          </p>
        </div>
  </div>
  )
}