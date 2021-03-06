import { takeEvery, put } from 'redux-saga/effects';
import * as Types from './todos.type';
import * as Action from './todos.action';

function* addSaga({ params, callback }) {
    try {
        yield put(Action.addSuccess(params));
        callback();
    } catch (error) {
        yield put(Action.addError(error));
        console.log(error);
    }
}

function* updateSaga({ params, callback }) {
    try {
        yield put(Action.updateSuccess(params));
        callback();
    } catch (error) {
        yield put(Action.updateError(error));
        console.log(error);
    }
}
function* deleteSaga({ params, callback }) {
    try {
        yield put(Action.deleteSuccess(params));
        callback();
    } catch (error) {
        yield put(Action.deleteError(error));
        console.log(error);
    }
}
function* completedSaga({ params, callback }) {
    try {
        yield put(Action.completedSuccess(params));
        if (params.completed === true) {
            callback();
        }
    } catch (error) {
        yield put(Action.completedError(error));
        console.log(error);
    }
}
function* sortSaga({ params, callback }) {
    try {
        yield put(Action.sortSuccess(params));
        callback();
    } catch (error) {
        yield put(Action.sortError(error));
        console.log(error);
    }
}

function* searchSaga({ params }) {
    console.log(params);
    try {
        yield put(Action.searchSuccess(params));
    } catch (error) {
        yield put(Action.searchError(error));
        console.log(error);
    }
}
export function* todosSaga() {
    yield takeEvery(Types.ADD_REQUEST, addSaga);
    yield takeEvery(Types.UPDATE_REQUEST, updateSaga);
    yield takeEvery(Types.DELETE_REQUEST, deleteSaga);
    yield takeEvery(Types.COMPLETED_REQUEST, completedSaga);
    yield takeEvery(Types.SORT_REQUEST, sortSaga);
    yield takeEvery(Types.SEARCH_REQUEST, searchSaga);
}
