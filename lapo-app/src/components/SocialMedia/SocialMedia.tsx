import { socialMedias } from "../../utils/socialMedias";
import "./SocialMedia.scss";

export const TelegramIcon = () => {
  return (
    <a href={socialMedias[3].url} className="social-media" key={'telegram'}>
      <div dangerouslySetInnerHTML={{ __html: socialMedias[3].svg }} />
    </a>
  );
};
