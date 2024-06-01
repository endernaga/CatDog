import React from 'react';
import './BigSectionsHeader.scss';

type Props = {
  text: string[],
}

export const BigSectionsHeader: React.FC<Props> = ({ text }) => {
  return (
    <div className="big-sections-header">
      <div className="big-sections-header__text">{text[0]}</div>
      <div className="big-sections-header__paws"/>
      <div className="big-sections-header__text">{text[1]}</div>
    </div>
  )
}