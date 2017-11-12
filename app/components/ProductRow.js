import PropTypes from 'prop-types';
import React from 'react';

const ProductRow = ({ data, onEdit, onDelete }) =>
    <div>
        <p>
          {data.name} = {data.price}
          {' '}
          <a href="#" onClick={e => {e.preventDefault(); onEdit(data);}}>
            edit
          </a>
          {' '}
          <a href="#" onClick={e => {e.preventDefault(); onDelete(data.id);}}>
            {'delete'}
          </a>
        </p>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default ProductRow;
