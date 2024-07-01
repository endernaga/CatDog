import { BigSectionsHeader } from "../../components/BigSectionsHeader";
import { BreadCrumb } from "../../components/BreadCrumb";
import { BASE_URL } from "../../utils/fetchProducts";
import {
  contactsButtons,
} from "../../utils/socialMedias";
import "./Contacts.scss";

export const Contacts = () => {
  return (
    <div className="contacts">
      <BreadCrumb />
      <BigSectionsHeader text={["Супер", "Друзі"]} />
      <div className="contacts__wrapper">
        <div className="contacts__info">
          <div className="contacts__text">
            Київська обл., м. Буча
            <br /> Жовтневий пров., 44
          </div>
          <div className="contacts__text">
            Середа-неділя
            <br /> з 11:00 до 16:00
          </div>
          <div className="contacts__text">
            Санітарні дні:
            <br /> понеділок-вівторок
          </div>
        </div>
        <img
          src={`${BASE_URL}/img/contactsDog.png`}
          alt="dog"
          className="contacts__dog"
        />
        <img
          src={`${BASE_URL}/img/contactsWaiting.png`}
          alt="dog"
          className="contacts__waiting"
        />
      </div>

      <div className="contacts__carts">
        <div className="contacts__carts__item">
          <div className="icon icon-bus" />
          <p className="contacts__carts__text">
            424, 376 маршрутка від м. Академістечко
          </p>
        </div>
        <div className="contacts__carts__item">
          <div className="icon icon-car" />
          <p className="contacts__carts__text">
            30 хвилин машиною від м. Академмістечко
          </p>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2535.1699471662687!2d30.215195676418347!3d50.54960948021937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472b31bef06fbd91%3A0x8a12336f2cab1314!2z0JbQvtCy0YLQvdC10LLQuNC5INC_0YDQvtCy0YPQu9C-0LosIDQ0LCDQkdGD0YfQsCwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgMDgyOTI!5e0!3m2!1suk!2sua!4v1717399420901!5m2!1suk!2sua"
        width="1344"
        height="455"
        className="contacts__map"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="contacts__footer">
      <div className="contacts__links">
        {contactsButtons.map((button) => (
          <div className="contacts__links__item">
            <a href={button.url} target="_blank" className="contacts__circle" key={button.name}>
              <div dangerouslySetInnerHTML={{ __html: button.svg }} />
            </a>
            <p className="contacts__links__text">{button.text}</p>
          </div>
        ))}
        </div>
        
        <div className="contacts__call">
          <img src={`${BASE_URL}/img/contactsCat.png`} alt="cat" className="contacts__call__cat" />
          <img src={`${BASE_URL}/img/contactsCatText.png`} alt="cat" className="contacts__call__text" />
        </div>
      </div>
    </div>
  );
};
