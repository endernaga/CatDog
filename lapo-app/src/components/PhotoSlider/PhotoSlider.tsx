import { aboutUsPhoto } from '../../utils/aboutUsPhoto';
import { BASE_URL } from '../../utils/fetchProducts';
import './PhotoSlider.scss';

export const PhotoSlider = () => {
  return (
    <div className="slider">
      <div className="slider__header">
        <div className="slider__dots">
           {aboutUsPhoto.map((photo, index) => (
            <button
              key={photo}
              type='button'
              aria-label='dots'
              className="slider__dots__item" />
          ))}
        </div>
      </div>
      <div className="slider__content">
        {/* {aboutUsPhoto.map(photo => (
          <img src={`${BASE_URL}/${photo}`} alt="aboutUsPhoto" className="slider__photo" />
        ))} */}
      </div>
    </div>
  )
}