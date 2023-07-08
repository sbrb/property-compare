import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromComparison, selectComparisonProperties } from '../store/propertiesSlice';
import { Link } from 'react-router-dom';
import './StickyButton.css';

const StickyButton = () => {
    const dispatch = useDispatch();
    const comparisonProperties = useSelector(selectComparisonProperties);

    const handleRemoveFromComparison = (id) => {
        dispatch(removeFromComparison(id));
    };

    const handleRemoveAllFromComparison = () => {
        comparisonProperties.forEach((property) => {
            dispatch(removeFromComparison(property.id));
        });
    };

    return (
        <div className="sticky-button">
            <h3>Comparison List</h3>
            {comparisonProperties && comparisonProperties.length === 0 ? (
                <p>No properties selected for comparison.</p>
            ) : (
                <>
                    <ul>
                        {comparisonProperties.map((property) => (
                            <li key={property.id}>
                                <span>{property.name}</span>
                                <button onClick={() => handleRemoveFromComparison(property.id)}>X</button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <Link to="/comparison">
                            <button className="compare-button">Compare</button>
                        </Link>
                        <button className="remove-all-button" onClick={handleRemoveAllFromComparison}>
                            Remove All
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default StickyButton;
