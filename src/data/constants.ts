import visaImg from '../assets/images/visa.svg';
import mastercardImg from '../assets/images/mastercard.svg';
import amexImg from '../assets/images/amex.svg';
import paypalImg from '../assets/images/paypal.svg';
import dinnersclubImg from '../assets/images/dinners-club.svg';
import discoverImg from '../assets/images/discover.svg';
import appleImg from '../assets/images/brand-01.png'
import boseImg from '../assets/images/brand-02.png'
import canonImg from '../assets/images/brand-03.png'
import dellImg from '../assets/images/brand-04.png'
import intelImg from '../assets/images/brand-05.png'
import lgImg from '../assets/images/brand-06.png'
import samsungImg from '../assets/images/brand-07.png'
import sandiskImg from '../assets/images/brand-08.png'
type PaymentMethod = {
  title: string;
  img: string;
};
type Brand = {
  title: string;
  img: string;
};
export const BRANDS_LIST: Brand[] = [
  { title: 'Bose', img: boseImg },
  { title: 'Samsung', img: samsungImg },
  { title: 'Canon', img: canonImg },
  { title: 'Apple', img: appleImg },
  { title: 'Intel', img: intelImg },
  { title: 'Sandisk', img: sandiskImg },
  { title: 'Lg', img: lgImg },
  { title: 'Dell', img: dellImg },
];
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    title: 'Visa',
    img: visaImg,
  },
  {
    title: 'MasterCard',
    img: mastercardImg,
  },
  {
    title: 'Amex',
    img: amexImg,
  },
  {
    title: 'Paypal',
    img: paypalImg,
  },
  {
    title: 'Dinners Club',
    img: dinnersclubImg,
  },
  {
    title: 'Discover',
    img: discoverImg,
  },
] as const;

export const LANGUAGES_LIST = ['English', 'Español', 'العربية'] as const;
