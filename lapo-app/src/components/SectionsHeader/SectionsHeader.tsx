import React from 'react';
import './SectionsHeader.scss';

type Props = {
  text: string,
}

export const SectionsHeader: React.FC<Props> = ({ text }) => {
  const normalizedText = text.replace(/\\n/g, '\n');
  return (
    <div className="sections-header">
      <div className="sections-header__paws" />
      <div className="sections-header__text">
        {normalizedText.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index !== normalizedText.split('\n').length - 1 && <br/>}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}