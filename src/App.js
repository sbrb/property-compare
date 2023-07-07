////without redux
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';


// const PropertyCard = ({ property, comparisonProperties, onAddToComparison, onRemoveFromComparison }) => {
//   const { id, name, price, area, rooms } = property;
//   const [added, setAdded] = useState(false);

//   useEffect(() => {
//     if (comparisonProperties) {
//       setAdded(comparisonProperties.some((p) => p.id === id));
//     }
//   }, [comparisonProperties, id]);

//   const handleAddToComparison = () => {
//     setAdded(true);
//     onAddToComparison(property);
//   };

//   const handleRemoveFromComparison = () => {
//     setAdded(false);
//     onRemoveFromComparison(id);
//   };

//   return (
//     <div className="property-card">
//       <h3>{name}</h3>
//       <p>Price: {price}</p>
//       <p>Area: {area}</p>
//       <p>Rooms: {rooms}</p>
//       {added ? (
//         <button onClick={handleRemoveFromComparison}>Remove from Comparison</button>
//       ) : (
//         <button onClick={handleAddToComparison}>Add to Comparison</button>
//       )}
//     </div>
//   );
// };


// const ComparisonList = ({ properties, onRemoveFromComparison }) => {
//   const handleRemoveFromComparison = (id) => {
//     onRemoveFromComparison(id);
//   };

//   return (<>
//     <h2>Comparison List</h2>
//     <div className="comparison-list">
//       {properties.length === 0 ? (
//         <p>No properties selected for comparison.</p>
//       ) : (
//         <ul>
//           {properties.map((property) => (
//             <div key={property.id}>
//               <li>{property.name}</li>
//               <li>{property.price}</li>
//               <li>{property.area}</li>
//               <li>{property.rooms}</li>
//               <button onClick={() => handleRemoveFromComparison(property.id)}>Remove</button>
//             </div>
//           ))}
//           <div className="add-property-card">
//             <li>
//               <p>Add Property</p>
//               <Link to="/"><button>Add to Comparison</button></Link>
//             </li>
//           </div>
//         </ul>
//       )}
//     </div>
//   </>
//   );
// };


// const Home = ({ properties, onAddToComparison, onRemoveFromComparison }) => {
//   return (
//     <div className="home">
//       <h2>Properties</h2>
//       <div className="property-list">
//         {properties.map((property) => (
//           <PropertyCard
//             key={property.id}
//             property={property}
//             onAddToComparison={onAddToComparison}
//             onRemoveFromComparison={onRemoveFromComparison}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Comparison = ({ properties, onRemoveFromComparison }) => {
//   return (
//     <div className="comparison">
//       <ComparisonList properties={properties} onRemoveFromComparison={onRemoveFromComparison} />
//     </div>
//   );
// };

// const App = () => {
//   const [properties, setProperties] = useState([
//     { id: 1, name: 'Property 1', price: '$250,000', area: '1500 sqft', rooms: 3 },
//     { id: 2, name: 'Property 2', price: '$350,000', area: '2000 sqft', rooms: 4 },
//     { id: 3, name: 'Property 3', price: '$500,000', area: '2500 sqft', rooms: 5 },
//   ]);

//   const [comparisonProperties, setComparisonProperties] = useState(() => {
//     const storedProperties = localStorage.getItem('comparisonProperties');
//     return storedProperties ? JSON.parse(storedProperties) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('comparisonProperties', JSON.stringify(comparisonProperties));
//   }, [comparisonProperties]);

//   const handleAddToComparison = (property) => {
//     const propertyExists = comparisonProperties.some((p) => p.id === property.id);
//     if (!propertyExists) {
//       setComparisonProperties((prevProperties) => [...prevProperties, property]);
//     }
//   };

//   const handleRemoveFromComparison = (id) => {
//     setComparisonProperties(comparisonProperties.filter((property) => property.id !== id));
//   };

//   return (
//     <Router>
//       <div className="app">
//         <nav className="navbar">
//           <ul className="navbar-list">
//             <li className="navbar-item">
//               <Link to="/">Home</Link>
//             </li>
//             <li className="navbar-item">
//               <Link to="/comparison">Comparison</Link>
//             </li>
//           </ul>
//         </nav>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Home
//                 properties={properties}
//                 onAddToComparison={handleAddToComparison}
//                 onRemoveFromComparison={handleRemoveFromComparison}
//               />
//             }
//           />
//           <Route
//             path="/comparison"
//             element={<Comparison properties={comparisonProperties} onRemoveFromComparison={handleRemoveFromComparison} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
















//with redux
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { fetchProperties, selectAllProperties, addToComparison, removeFromComparison, selectComparisonProperties } from './store/propertiesSlice';
import Comparison from './components/Comparison';

const Home = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectAllProperties);
  const comparisonProperties = useSelector(selectComparisonProperties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handleAddToComparison = (property) => {
    dispatch(addToComparison(property));
  };

  const handleRemoveFromComparison = (id) => {
    dispatch(removeFromComparison(id));
  };

  return (
    <div className="home">
      <h2>Properties</h2>
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            comparisonProperties={comparisonProperties}
            onAddToComparison={handleAddToComparison}
            onRemoveFromComparison={handleRemoveFromComparison}
          />
        ))}
      </div>
    </div>
  );
};

const PropertyCard = ({ property, comparisonProperties, onAddToComparison, onRemoveFromComparison }) => {
  const { id, name, price, area, rooms } = property;
  const added = comparisonProperties.some((p) => p.id === id);

  const handleAddToComparison = () => {
    onAddToComparison(property);
  };

  const handleRemoveFromComparison = () => {
    onRemoveFromComparison(id);
  };

  return (
    <div className="property-card">
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p>Area: {area}</p>
      <p>Rooms: {rooms}</p>
      {added ? (
        <button style={{ backgroundColor: "red" }} onClick={handleRemoveFromComparison}>Remove from Comparison</button>
      ) : (
        <button style={{ backgroundColor: "green" }} onClick={handleAddToComparison}>Add to Comparison</button>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/comparison">Comparison</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comparison" element={<Comparison />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
