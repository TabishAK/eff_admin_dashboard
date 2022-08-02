import { actionType } from "../constants";

const INITIAL_STATE = {
    Vendor: [],
};

export const vendorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.vendor:
            return {
                ...state,
                Vendor: action.payload,
            }

        default:
            return state;
    }
};

