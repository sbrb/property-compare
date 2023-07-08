import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromComparison, selectComparisonProperties } from '../store/propertiesSlice';
import { Link } from 'react-router-dom';
import './Comparison.css';

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
                {comparisonProperties.length === 0 ? (
                    <p>No properties selected for comparison.</p>
                ) : (
                    <ul>
                        {comparisonProperties.map((property) => (
                            <li key={property.id} className="comparison-property">
                                <div>
                                    <div className="property-name">{property.name}</div>
                                    <div className="property-price">{property.price}</div>
                                    {property.area ? (
                                        <div className="property-value">{property.area}</div>
                                    ) : (
                                        <div className="property-not-available">X</div>
                                    )}
                                    {property.rooms ? (
                                        <div className="property-value">{property.rooms}</div>
                                    ) : (
                                        <div className="property-not-available">X</div>
                                    )}
                                    <button onClick={() => handleRemoveFromComparison(property.id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {comparisonProperties && (
                    <div className="add-property-card">
                        <p>Add Property</p>
                        <Link to="/">
                            <button>Add to Comparison</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comparison;
