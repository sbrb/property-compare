import React from 'react';
import PropertyCard from './PropertyCard';
import './Home.css'

const Home = ({ properties }) => {
    return (
        <div className="home">
            <h2>Properties</h2>
            <div className="property-list">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
