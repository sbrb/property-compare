import React from 'react';
import { useDispatch } from 'react-redux';
import { addToComparison } from '../store/propertiesSlice';

const Home = ({ properties }) => {
    const dispatch = useDispatch();

    const handleAddToComparison = (property) => {
        dispatch(addToComparison(property));
    };

    return (
        <div className="home">
            <h2>Properties</h2>
            <div className="property-list">
                {properties.map((property) => (
                    <div className="property-card" key={property.id}>
                        <h3>{property.name}</h3>
                        <p>Price: {property.price}</p>
                        <p>Area: {property.area}</p>
                        <p>Rooms: {property.rooms}</p>
                        <button onClick={() => handleAddToComparison(property)}>Add to Comparison</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
