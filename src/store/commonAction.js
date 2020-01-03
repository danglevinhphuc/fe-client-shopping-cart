import utilsCallApi from "./../utils/apiCaller";
import _ from 'lodash';
export const GET_MENU = 'GET_MENU';
export const GET_PRODUCT_TYPE = "GET_PRODUCT_TYPE";
export const SET_USERNAME = "SET_USERNAME";
export const GET_PRODUCT_GROUP = "GET_PRODUCT_GROUP";
export const GET_ICON_HEADER = 'GET_ICON_HEADER';
export const NOTIFY_ERRORS = "NOTIFY_ERRORS";

export const notifyErrors = (data) =>{
    return {
        type: NOTIFY_ERRORS,
        data
    }
}
export const actFetchConfigMenuRequest = (request = null) => {
    return async (dispatch, getState) => {
        try {
            var response =  await utilsCallApi.callApi('/menu/get', 'POST',{'username':getState().common.username, "token":getState().common.token });
            await  dispatch(actFetchConfigMenu(response.data));
        } catch (error) {
            dispatch(notifyErrors('Disconnect menu'));
            console.log(error);
        }
    }
}
export const setUsername = () => {
    return (dispatch, getState) => {
        try {
            var hostname =  window.location.hostname;
            var token = localStorage.getItem("TOKEN");
            // var username = hostname.slice(0,hostname.indexOf(".shoppingcart"));
            var usernameLocal = localStorage.getItem("USER");
            if(usernameLocal){
                usernameLocal = JSON.parse(usernameLocal);
                var username = usernameLocal ? usernameLocal.username :""
            }
            dispatch(
                {
                    type : SET_USERNAME,
                    data : {token,username}
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}
export const actFetchConfigMenu = (data) => {
    return {
        type: GET_MENU,
        data
    }
}
export const actFetchProductTypeRequest = (request) => {
    return async (dispatch, getState) => {        
        try {
            if(!request.username){
                request['username'] = getState().common.username;
                request['token'] = getState().common.token;
            }
            var response =  await utilsCallApi.callApi('/product-type/get', 'POST',request);
            await  dispatch(actProductType(response.data));
        } catch (error) {
            console.log(error)
            dispatch(notifyErrors('Disconnect product type'));
        }
    }
}
export const actProductType = (data) => {
    return {
        type: GET_PRODUCT_TYPE,
        data
    }
}
export const actFetchProductGroupRequest = (request) => {
    return async (dispatch, getState) => {
        try {
            if(!request.username){
                request['username'] = getState().common.username;
                request['token'] = getState().common.token;
            }
            var response =  await utilsCallApi.callApi('/product/group-with-type', 'POST',request);
            await  dispatch(actProductGroupType(response.data));
        } catch (error) {
            console.log(error)
            dispatch(notifyErrors('Disconnect product group'));
        }
    }
}
export const actProductGroupType =  (data) => {
    return {
        type: GET_PRODUCT_GROUP,
        data
    }
}
export const actUpdatePostionMenuRequest = (request) => {
    return async (dispatch, getState) => {
        try {
            if(!request.username){
                request['username'] = getState().common.username;
                request['token'] = getState().common.token;
            }
            var response =  await utilsCallApi.callApi('/menu/update-position', 'POST',request);
            return response;
        } catch (error) {
            console.log(error);
            dispatch(notifyErrors('Disconnect update position menu'));
        }
    }
}
export const actFetchConfigIconHeaderRequest = (request = null) => {
    return async (dispatch, getState) => {
        try {
            var response =  await utilsCallApi.callApi('/iconHeader/get', 'POST',{'username':getState().common.username,'token':getState().common.token});
            await  dispatch(
                {
                    type : GET_ICON_HEADER,
                    data : response.data
                }
            );
        } catch (error) {
            dispatch(notifyErrors('Disconnect icon header'));
            console.log(error);
        }
    }
}
export const actUpdatePostionIconHeaderRequest = (request) => {
    return async (dispatch, getState) => {
        try {
            if(!request.username){
                request['username'] = getState().common.username;
                request['token'] = getState().common.token;
            }
            var response =  await utilsCallApi.callApi('/iconHeader/update-position', 'POST',request);
            return response;
        } catch (error) {
            console.log(error);
            dispatch(notifyErrors('Disconnect update position icon header'));
        }
    }
}
export const sendChat =(request)  =>{
    return async (dispatch, getState) => {
        try {
            var response =  await utilsCallApi.callApi('/chat/send', 'POST',request);
            return response;
        } catch (error) {
            console.log(error);
            dispatch(notifyErrors('Send chat errors'));
        }
    }
}