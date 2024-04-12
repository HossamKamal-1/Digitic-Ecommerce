import './Footer.scss';
import {
  Facebook,
  Instagram,
  LucideIcon,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import googlePlayImg from '../../assets/images/app-icon-01.webp';
import appStoreImg from '../../assets/images/app-icon-02.webp';
import { PAYMENT_METHODS } from '../../data/constants';
import CollapsableTree, {
  CollapseList,
} from '../CollapsableTree/CollapsableTree';
import useMediaQuery from '../../hooks/useMediaQuery';
type SocialLink = {
  Icon: LucideIcon;
  url: string;
};
const SOCIAL_LINKS: SocialLink[] = [
  {
    Icon: Twitter,
    url: '/',
  },
  {
    Icon: Facebook,
    url: '/',
  },
  {
    Icon: Facebook,
    url: '/',
  },
  {
    Icon: Instagram,
    url: '/',
  },
  {
    Icon: Youtube,
    url: '/',
  },
];
const footerLinks: CollapseList = [
  {
    title: 'Contact us',
    children: (
      <>
        <address className="contact-address">
          Demo Store <br />
          No. 1259 Freedom, New York, 11111,
          <br />
          United States
        </address>
        <p className="contact-number">+91-987654321</p>
        <a href="mailto:Demo@Exampledemo.com" className="contact-email-link">
          Demo@Exampledemo.Com
        </a>
        <ul className="social-links">
          {SOCIAL_LINKS.map((socialLink, index) => (
            <li className="social-item" key={index}>
              <a href={socialLink.url} className="social-item-link">
                <socialLink.Icon className="icon" size={20} />
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: 'Information',
    children: [
      {
        title: 'Privacy Policy',
        url: '/',
      },
      {
        title: 'Refund Policy',
        url: '/',
      },
      {
        title: 'Shipping Policy',
        url: '/',
      },
      {
        title: 'Terms of Service',
        url: '/',
      },
      {
        title: 'Blogs',
        url: '/blogs',
      },
    ],
  },
  {
    title: 'Account',
    children: [
      {
        title: 'Search',
        url: '/',
      },
      {
        title: 'About Us',
        url: '/',
      },
      {
        title: 'Faq',
        url: '/',
      },
      {
        title: 'Contact',
        url: '/',
      },
      {
        title: 'Size Chart',
        url: '/',
      },
    ],
  },
  {
    title: 'Quick Links',
    children: [
      {
        title: 'Accessories',
        url: '/',
      },
      {
        title: 'Laptops',
        url: '/',
      },
      {
        title: 'Headphones',
        url: '/',
      },
      {
        title: 'Smart Watches',
        url: '/',
      },
      {
        title: 'Tablets',
        url: '/',
      },
    ],
  },
  {
    title: 'Our App',
    children: (
      <>
        <p className="download__desc">
          Download our App and get extra 15% Discount on your first Order..!
        </p>
        <div className="download__links-wrapper">
          <Link to="/" className="download__link">
            <img
              src={googlePlayImg}
              alt="googleplay"
              className="download__appImg"
            />
          </Link>
          <Link to="/" className="download__link">
            <img
              src={appStoreImg}
              alt="appstore"
              className="download__appImg"
            />
          </Link>
        </div>
      </>
    ),
  },
];

function Footer() {
  const isMobileMedia = useMediaQuery('(max-width: 767px)');
  return (
    <footer>
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-content">
            {isMobileMedia ? (
              <CollapsableTree collapseList={footerLinks} />
            ) : (
              footerLinks.map(({ title, children }) => (
                <div key={title} className="box">
                  <h4 className="heading">{title}</h4>
                  {Array.isArray(children) ? (
                    <ul className="links-list">
                      {children.map((child) => (
                        <li key={child.title} className="links-list__item">
                          <Link
                            to={child.url || '/'}
                            className="links-list__link"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    children
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="footer-copyrights">
        <div className="container">
          <div className="footer-copyrights-content">
            <p className="copyright">
              &copy; 2023, Digitic Powered By{' '}
              <a href="https://github.com/HossamKamal-1" target="_blank">
                Hossam Kamal
              </a>
            </p>
            <ul className="supported-payments-list">
              {PAYMENT_METHODS.map(({ title, img }) => (
                <li className="supported-payment-item" key={title}>
                  <img
                    src={img}
                    alt={title}
                    className="supported-payment-item-img"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
