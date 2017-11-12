import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getProducts, filterTable, startEditMode, deleteProduct } from '../actions';
import ProductTable from '../components/ProductTable';
import ProductEditForm from './ProductEditForm';
import { filterableTable } from '../styles/filterableTable.scss';

class FilterableTable extends React.Component {
    constructor(props) {
        super(props);
        this.updateStateByProps(props);
    }

    componentDidMount() {
        this.props.dispatch(getProducts());
    }

    componentWillReceiveProps(props) {
        this.updateStateByProps(props);
    }

    updateStateByProps({ filter, products }) {
        this.state = {
            filter,
            products
        };
    }

    render() {
        return (
            <div className={filterableTable}>
                <ProductEditForm />
                {'filter: '}
                <input
                    value={this.state.filter}
                    ref={node => {this.input = node;}}
                    onChange={() => this.props.onFilter(this.input.value)} />

                <ProductTable filter={this.state.filter}
                    products={this.state.products}
                    onEdit={this.props.onEdit} onDelete={this.props.onDelete} />
            </div>
        );
    }
}

FilterableTable.propTypes = {
    filter: PropTypes.string,
    products: PropTypes.array,
    onFilter: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    dispatch: PropTypes.func.isRequired
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
        onEdit: product => dispatch(startEditMode(product)),
        onDelete: id => dispatch(deleteProduct(id)),
        dispatch
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
