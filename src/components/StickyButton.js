import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromComparison, selectComparisonProperties, addToComparison } from '../store/propertiesSlice';
import { Link } from 'react-router-dom';
import './StickyButton.css';

const StickyButton = () => {
    const [showDiv, setShowDiv] = useState(false);
    const [isClicked, setIsClicked] = useState(false); // New state to track the clicked state
    const dispatch = useDispatch();
    const comparisonProperties = useSelector(selectComparisonProperties);

    const toggleDiv = () => {
        setShowDiv(!showDiv);
        setIsClicked(prevClicked => !prevClicked); // Toggle the value of isClicked
    };

    const handleRemoveFromComparison = (id) => {
        dispatch(removeFromComparison(id));
    };

    const handleRemoveAllFromComparison = () => {
        comparisonProperties.forEach((property) => {
            dispatch(removeFromComparison(property.id));
        });
    };

    const handleAddToComparison = (property) => {
        if (comparisonProperties.length <= 4) {
            dispatch(addToComparison(property));
        } else {
            const firstProperty = comparisonProperties[0];
            dispatch(removeFromComparison(firstProperty.id));
            dispatch(addToComparison(property));
        }
    };

    useEffect(() => {
        handleAddToComparison(comparisonProperties);
    }, [comparisonProperties]);

    return (
        <div className="sticky-button-container">
            <div className="compare-button-container">
                <button className={`compare_btn ${isClicked ? 'clicked' : ''}`} onClick={toggleDiv}>
                    Compare ({comparisonProperties.length}/4)
                </button>
                {showDiv && (
                    <div className="sticky-button">
                        <h3>Comparison List</h3>
                        {comparisonProperties.length === 0 ? (
                            <p>No properties selected for comparison.</p>
                        ) : (
                            <>
                                <ul>
                                    {comparisonProperties.map((property) => (
                                        <li key={property.id}>
                                            <img className="sticky_img" src={property.image} alt="" />
                                            <span className='compare_property_name'>{property.name}</span>
                                            <button className='cross_btn' onClick={() => handleRemoveFromComparison(property.id)}>X</button>
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
                )}
            </div>
        </div>
    );
};

export default StickyButton;
