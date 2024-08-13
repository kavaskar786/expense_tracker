export const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,
                loading: false,
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
                loading: false,
            };
        case 'EXPENSE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
