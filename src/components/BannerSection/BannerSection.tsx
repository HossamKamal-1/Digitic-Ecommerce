import './BannerSection.scss';
import { CategoryBanner,CustomSlider } from '..';
import mainBanner1 from '../../assets/images/main-banner.jpg';
import mainBanner2 from '../../assets/images/main-banner-1.jpg';
import banner1 from '../../assets/images/catbanner-01.jpg';
import banner2 from '../../assets/images/catbanner-02.jpg';
import banner3 from '../../assets/images/catbanner-03.jpg';
import banner4 from '../../assets/images/catbanner-04.jpg';
const bannerList = [
  {
    heading: 'best sale',
    title: 'Laptops max',
    desc: 'From $1699.00 or $64.62/mo.',
    img: banner1,
  },
  {
    heading: 'new arrival',
    title: 'buy ipad air',
    desc: 'From $599 or $49.91/mo. for 12 mo. *',
    img: banner2,
  },
  {
    heading: '15% off',
    title: 'Smartwatch 7',
    desc: 'Shop the latest band styles and colors.',
    img: banner3,
  },
  {
    heading: 'free engraving',
    title: 'AirPods Max',
    desc: 'High-fidelity playback & ultra-low distortion',
    img: banner4,
  },
];
const sliderBannerList = [
  {
    heading: 'SUPERCHARGED FOR PROS.',
    title: 'iPad S13+ Pro.',
    desc: 'From $999.00 or $41.62/mo.for 24 mo. Footnote*',
    offerUrl: '/',
    img: mainBanner1,
  },
  {
    heading: 'SUPERCHARGED FOR PROS.',
    title: 'Special Sale',
    desc: 'From $1699.00 or $64.62/mo.',
    offerUrl: '/',
    img: mainBanner2,
  },
];
function BannerSection() {
  // TODO: fetch banners here
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-section-content">
          <div className="slider-banner">
            <CustomSlider disablePadding>
              {sliderBannerList.map((item) => (
                <CategoryBanner key={item.title} {...item} />
              ))}
            </CustomSlider>
          </div>
          {bannerList.map((banner) => (
            <CategoryBanner key={banner.title} {...banner} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BannerSection;
