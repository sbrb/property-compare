import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToComparison, removeFromComparison, selectComparisonProperties } from '../store/propertiesSlice';

const PropertyCard = ({ property }) => {
    const dispatch = useDispatch();
    const comparisonProperties = useSelector(selectComparisonProperties);

    const { id, name, price, area, rooms } = property;
    const added = comparisonProperties.some((p) => p.id === id);

    const handleToggleComparison = () => {
        if (added) {
            dispatch(removeFromComparison(id));
        } else {
            dispatch(addToComparison(property));
        }
    };

    const buttonStyle = {
        backgroundColor: added ? 'red' : 'green',
        color: 'white',
    };

    return (
        <div className="property-card">
            <h3>{name}</h3>
            <p>Price: {price}</p>
            <p>Area: {area}</p>
            <p>Rooms: {rooms}</p>
            <button onClick={handleToggleComparison} style={buttonStyle}>
                {added ? 'Remove from Comparison' : 'Add to Comparison'}
            </button>
        </div>
    );
};

export default PropertyCard;
