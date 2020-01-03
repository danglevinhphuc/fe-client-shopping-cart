import * as ConfigAction from "./commonAction";
import _ from 'lodash';
var initialState = {
    configMenuData : [],
    configIconHeaderData : [],
    dataClone: null,
    productType :[],
    productGroupWithType : [],
    username: '',
    token: '',
    errors:''
};

const CommonReducer = (state = initialState, action) => {
    var { data,val } = action;
    switch (action.type) {
        case ConfigAction.GET_MENU:
            state.configMenuData = data && data.data ? _.filter(data.data,(o) =>{return o.isActive}) : [];            
            return {...state};
        case ConfigAction.GET_PRODUCT_TYPE:
            state.productType = data && data.data ? data.data : [];
            return {...state};
        case ConfigAction.SET_USERNAME:
            state.username = data.username;
            state.token = data.token;
            return {...state};
        case ConfigAction.GET_PRODUCT_GROUP:
            let productGroup = data ? data : [];
            productGroup =  _.map(productGroup,(o)=>{
                var productType = _.find(state.productType,{"_id":o._id.type});
                if(productType){
                    o._id.name = productType.name;
                }
                return o;
            })
            state.productGroupWithType =productGroup;
            return {...state};
        case ConfigAction.GET_ICON_HEADER:
            state.configIconHeaderData = data && data.data ? _.filter(data.data,(o) =>{return o.isActive}) : [];            
            return {...state};
        case ConfigAction.NOTIFY_ERRORS :
            state.errors = data
            return {...state};
    default:
        return {...state};
    }
}
  
export { CommonReducer };