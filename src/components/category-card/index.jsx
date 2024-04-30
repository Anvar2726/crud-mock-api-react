import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, avatar, id, editCategory, deleteCategory }) => {
  return (
    <div className="card mb-3">
      <Link to={`/products/${id}`}>
      <LazyLoadImage src={avatar} className="card-img-top" alt={name} height={190} />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="d-flex align-items-center">
          <button className="btn btn-success me-2" onClick={() => editCategory(id)}>Edit</button>
          <button className="btn btn-danger" onClick={() => deleteCategory(id)}>Delete</button>
        </div>
      </div>
    </div>
  );

};

CategoryCard.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  id: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
}

export default CategoryCard;
