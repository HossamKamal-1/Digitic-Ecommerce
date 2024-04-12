import './CollectionSection.scss';
import headphone from '../../assets/images/headphone.jpg';
import speakers from '../../assets/images/speaker.jpg';
import laptop from '../../assets/images/laptop.jpg';
import camera from '../../assets/images/camera.jpg';
import tv from '../../assets/images/tv.jpg';
import gaming from '../../assets/images/controller.webp';
import { Link } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import EcommerceClient from '../../services/ecommerceApi';
type Collection = {
  id: number;
  title: string;
  itemsCount: number;
  img: string;
};
const COLLECTIONS = [
  {
    id: 218,
    title: 'Computers & Laptops',
    itemsCount: 8,
    img: laptop,
  },
  {
    id: 224,
    title: 'Cameras & Videos',
    itemsCount: 10,
    img: camera,
  },
  {
    id: 242,
    title: 'Smart Television',
    itemsCount: 12,
    img: tv,
  },
  {
    id: 227,
    title: 'SmartWatches',
    itemsCount: 13,
    img: speakers,
  },
  {
    id: 288,
    title: 'Music & Gaming',
    itemsCount: 4,
    img: gaming,
  },
  {
    id: 300,
    title: 'Mobiles & Tablets',
    itemsCount: 5,
    img: laptop,
  },
  {
    id: 292,
    title: 'Headphones',
    itemsCount: 6,
    img: headphone,
  },
  {
    id: 225,
    title: 'Accessories',
    itemsCount: 10,
    img: laptop,
  },
  {
    id: 253,
    title: 'Portable Speakers',
    itemsCount: 8,
    img: laptop,
  },
  {
    id: 234,
    title: 'Home Appliances',
    itemsCount: 6,
    img: laptop,
  },
];
function CollectionSection() {
  const {
    responseData: collections,
    isFetching,
    error,
  } = useAxios<Collection[]>(
    {
      url: '/collections',
    },
    EcommerceClient
  );

  return (
    <section className="collection-section">
      <div className="container">
        <div className="content">
          <div className="collections-wrapper">
            {collections?.map((collection) => (
              <div className="collection-card" key={collection.title}>
                <div className="text">
                  <Link
                    to={`/store?collection=${collection.id}`}
                    className="collection-link"
                  >
                    {collection.title}
                  </Link>
                  <span className="count">
                    {collection.itemsCount} collections
                  </span>
                </div>
                <img src={collection.img} alt={collection.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
