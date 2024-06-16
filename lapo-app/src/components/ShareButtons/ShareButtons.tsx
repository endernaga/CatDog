import { InstapaperIcon, InstapaperShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import './ShareButtons';

export const ShareButtons = () => {
  const currentURL = window.location.href;

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <InstapaperShareButton url={currentURL}>
        <InstapaperIcon size={32} round={true} />
      </InstapaperShareButton>
    </div>
  )
}