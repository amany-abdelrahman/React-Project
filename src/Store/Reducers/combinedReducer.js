import { combineReducers } from 'redux';
import favoritesReducer from './favoriteReducer';
import cartReducer from './cartReducer';

const combinedReducer = combineReducers({
    favorites: favoritesReducer,
    cart: cartReducer
});

export default combinedReducer;