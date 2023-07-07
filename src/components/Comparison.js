import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromComparison, selectComparisonProperties } from '../store/propertiesSlice';
import { Link } from 'react-router-dom';

const Comparison = () => {
    const dispatch = useDispatch();
    const comparisonProperties = useSelector(selectComparisonProperties);

    const handleRemoveFromComparison = (id) => {
        dispatch(removeFromComparison(id));
    };

    return (
        <div className="comparison">
            <h2>Comparison List</h2>
            <div className="comparison-list">
                {comparisonProperties && comparisonProperties.length === 0 ? (
                    <p>No properties selected for comparison.</p>
                ) : (
                    <ul>
                        {comparisonProperties.map((property) => (
                            <div key={property.id}>
                                <li>{property.name}</li>
                                <li>{property.price}</li>
                                <li>{property.area}</li>
                                <li>{property.rooms}</li>
                                <button onClick={() => handleRemoveFromComparison(property.id)}>Remove</button>
                            </div>
                        ))}
                            <div className="add-property-card">
                                <li>
                                    <p>Add Property</p>
                                    <Link to="/"><button>Add to Comparison</button></Link>
                                </li>
                            </div>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Comparison;
