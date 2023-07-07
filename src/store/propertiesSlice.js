import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch properties asynchronously
export const fetchProperties = createAsyncThunk('properties/fetchProperties', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = [
                { id: 1, name: 'Property 1', price: '$250,000', area: '1500 sqft', rooms: 3 },
                { id: 2, name: 'Property 2', price: '$350,000', area: '2000 sqft', rooms: 4 },
                { id: 3, name: 'Property 3', price: '$500,000', area: '2500 sqft', rooms: 5 },
            ];
            resolve(data);
        }, 1000);
    });
});

// Save comparison properties to local storage
const saveComparisonPropertiesToLocalStorage = (comparisonProperties) => {
    localStorage.setItem('comparisonProperties', JSON.stringify(comparisonProperties));
};

// Retrieve comparison properties from local storage
const getComparisonPropertiesFromLocalStorage = () => {
    const storedProperties = localStorage.getItem('comparisonProperties');
    return storedProperties ? JSON.parse(storedProperties) : [];
};

// Define the initial state
const initialState = {
    properties: [],
    comparisonProperties: getComparisonPropertiesFromLocalStorage(),
    status: 'idle',
    error: null,
};

// Create the properties slice
const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        addToComparison(state, action) {
            const property = action.payload;
            const exists = state.comparisonProperties.some((p) => p.id === property.id);
            if (!exists) {
                state.comparisonProperties.push(property);
                saveComparisonPropertiesToLocalStorage(state.comparisonProperties);
            }
        },
        removeFromComparison(state, action) {
            const id = action.payload;
            state.comparisonProperties = state.comparisonProperties.filter((property) => property.id !== id);
            saveComparisonPropertiesToLocalStorage(state.comparisonProperties);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProperties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProperties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.properties = action.payload;
            })
            .addCase(fetchProperties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the actions and selectors
export const { addToComparison, removeFromComparison } = propertiesSlice.actions;
export const selectAllProperties = (state) => state.properties.properties;
export const selectComparisonProperties = (state) => state.properties.comparisonProperties;

// Export the reducer
export default propertiesSlice.reducer;

