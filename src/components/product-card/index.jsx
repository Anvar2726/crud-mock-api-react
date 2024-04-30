import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from 'prop-types'

const ProductCard = ({avatar, name, id, description, editProduct, deleteProduct}) => {
  return (
    <div className="card mb-3 ">
      <LazyLoadImage src={avatar} className="card-img-top" alt={description} height={190} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {description}
        </p>
        <button onClick={() => editProduct(id)}  className="btn btn-primary me-2">
          Edit {id}
        </button>
        <button onClick={() => deleteProduct(id)}  className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string,
    editProduct: PropTypes.func,
    deleteProduct: PropTypes.func
}

export default ProductCard;
