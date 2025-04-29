import api from "./api";

export const ACTION_TYPES = {
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL'
}

const formatData = data => ({
    ...data,
    age:parseInt(data.age? data.age:0)
})

export const fetchAll = () => dispatch => {
    return api.dCandidate().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            });
        });
};

export const create = (data) => dispatch => {
    data = formatData(data);
    return api.dCandidate().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            });
            return { success: true };
        });
};

export const update = (id, data) => dispatch => {
    data = formatData(data);
    return api.dCandidate().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: {id, ...data}
            });
            return { success: true };
        });
};

export const Delete = (id) => dispatch => {
    return api.dCandidate().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            });
            return { success: true };
        });
};