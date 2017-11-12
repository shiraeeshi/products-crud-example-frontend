import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import ProductTable from '../components/ProductTable';
import ProductEditForm from './ProductEditForm';
import { filterableTable } from '../styles/filterableTable.scss';

const FilterableTable = ({ filter, products, onFilter }) => {
    let input;

    return (
        <div className={filterableTable}>
            <ProductEditForm />
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)} />

            <ProductTable filter={filter} products={products} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    products: PropTypes.array,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        products: state.products
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
