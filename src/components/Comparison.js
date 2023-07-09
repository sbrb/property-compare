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
            <div className="comparison-list">
                {comparisonProperties.length === 0 ? (
                    <p>No properties selected for comparison.</p>
                ) : (
                    <ul>
                        {comparisonProperties.length > 0 && (
                            <div className="add-property-card">
                                <Link to="/">
                                    <button>Add to Comparison</button>
                                </Link>
                            </div>
                        )}
                        {comparisonProperties.map((property) => (
                            <li key={property.id} className="comparison-property">
                                <div>
                                    <img src={property.image} alt="" />
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
            </div>
        </div>
    );
};

export default Comparison;
