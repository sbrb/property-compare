import React from 'react';
import PropertyCard from './PropertyCard';
import './Home.css'

const Home = ({ properties }) => {
    return (
        <div className="home">
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
