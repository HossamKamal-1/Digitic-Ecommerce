import './ServicesSection.scss';
import service1 from '../../assets/images/service.png';
import service2 from '../../assets/images/service-02.png';
import service3 from '../../assets/images/service-03.png';
import service4 from '../../assets/images/service-04.png';
import service5 from '../../assets/images/service-05.png';
const SERVICES_LIST = [
  {
    img: service1,
    title: 'Free Shipping',
    desc: 'From all orders over $100',
  },
  {
    img: service2,
    title: 'Daily Surpise Offers ',
    desc: 'Save up to 25% off',
  },
  {
    img: service3,
    title: 'Support 24/7',
    desc: 'Shop with an expert',
  },
  {
    img: service4,
    title: 'Affordable Prices',
    desc: 'Get Factory direct price',
  },
  {
    img: service5,
    title: 'Secure Payments',
    desc: '100% Protected Payments',
  },
];
function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section-content">
          {SERVICES_LIST.map((service) => (
            <div className="service" key={service.title}>
              <img src={service.img} alt={service.title} />
              <div className="text">
                <h4 className="title">{service.title}</h4>
                <p className="desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
