import PropTypes from 'prop-types';
import React from 'react';

const ProductRow = ({ data, onEdit }) =>
    <div>
        <p>
          {data.name} = {data.price}
          {' '}
          <a href="#" onClick={e => {e.preventDefault(); onEdit(data);}}>
            edit
          </a>
        </p>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object,
    onEdit: PropTypes.func
};

export default ProductRow;
