import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { filterTable, startEditMode } from '../actions';
import ProductTable from '../components/ProductTable';
import ProductEditForm from './ProductEditForm';
import { filterableTable } from '../styles/filterableTable.scss';

const FilterableTable = ({ filter, products, onFilter, onEdit }) => {
    let input;

    return (
        <div className={filterableTable}>
            <ProductEditForm />
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)} />

            <ProductTable filter={filter} products={products} onEdit={onEdit} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    products: PropTypes.array,
    onFilter: PropTypes.func,
    onEdit: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        products: state.products
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText)),
        onEdit: product => dispatch(startEditMode(product))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
