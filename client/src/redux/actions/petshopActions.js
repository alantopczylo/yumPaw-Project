import axios from "axios";
import { GET_PRODUCTS, SEARCHBAR_PRODUCTS, FILTER_BY_PET, SORT_PRICE, FILTER_CATEGORY, ADD_FAVORITE_REDUX, FILTER_TARGET_ANIMAL, ID_PRODUCT, REMOVE_FROM_CART, CHARGE_CART, CLEAR_CART, ADD_ITEM, DELETE_ITEM, CHARGE_FAVORITES} from "../actions-type/petshopActionsTypes";

export function getProducts (){
    return async function (dispatch){
        let response = await axios.get('https://proyecto-grupal.herokuapp.com/products');
        return dispatch({
            type: GET_PRODUCTS,
            payload: response.data
        })
    }
};

export function searchBarProducts (name){
    return async function (dispatch){
        let response = await axios.get(`https://proyecto-grupal.herokuapp.com/products?name=${name}`);
        return dispatch({
            type: SEARCHBAR_PRODUCTS,
            payload: response.data
        })
    }
};


export function chargeCart (email){
    console.log("se ejecuta la función charge cart")
    return {
        type: CHARGE_CART,
        email,
    }
};

export function sortByPrice(payload){
    return {
        type: SORT_PRICE,
        payload,
    }
};

export function filterByCategory(payload){
    return {
        type: FILTER_CATEGORY,
        payload,
    }
};

export function filterTargetAnimal(payload){
    return {
        type: FILTER_TARGET_ANIMAL,
        payload,
    }
};

export function getById(id){
    return function(dispatch){
        axios.get(`https://proyecto-grupal.herokuapp.com/products/${id}`)
        .then(response => {
            dispatch({
                type: ID_PRODUCT,
                payload: response.data
            })
        })
    }
};

export function removeFromCart(payload, email){
    return {
        type: REMOVE_FROM_CART,
        payload,
        email
    }
};

export function clearAllCart(email){
    return {
        type: CLEAR_CART,
        email
    }
};

export function addOneItem(id){
    return {
        type: ADD_ITEM,
        payload: id
    }
};

export function deleteItem(id){
    return {
        type: DELETE_ITEM,
        payload: id
    }
};

export function addTofavorites(favoritos){
    return {
        type: CHARGE_FAVORITES,
        payload: favoritos
    }
};




export function postSold(payload) {
    return async function () {
        try {

            await axios.post(`https://proyecto-grupal.herokuapp.com/solds`, payload)
        } catch (error) {
            console.log(error)
        }
    }
};

export function selectedProduct(payload){
    return {
        type: 'SELECTED_PRODUCT',
        payload,
    }
}


export function putProduct(id, modification) {
    return async function () {
        try {
            await axios.put(`https://proyecto-grupal.herokuapp.com/products/${id}`, modification)
        } catch (error) {
            console.log(error)
        }
    }
};


export function postProduct(product) {
    return async function () {
        try {
            await axios.post(`https://proyecto-grupal.herokuapp.com/products/`, product)
        } catch (error) {
            console.log(error)
        }
    }
};

export function cleanDetail(){
    return {
        type: 'CLEAN_DETAIL',
        payload: []
    }
}

