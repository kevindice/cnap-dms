export const REQUEST_AGAVE_FILE_SYSTEMS = 'REQUEST_AGAVE_FILE_SYSTEMS';
export const RECEIVE_AGAVE_FILE_SYSTEMS = 'RECEIVE_AGAVE_FILE_SYSTEMS';
export const INVALIDATE_AGAVE_FILE_SYSTEMS = 'INVALIDATE_AGAVE_FILE_SYSTEMS';

export function requestAgaveFileSystems() {
  return {
    type: REQUEST_AGAVE_FILE_SYSTEMS
  }
}

export function receiveAgaveFileSystems(json) {
  return {
    type: RECEIVE_AGAVE_FILE_SYSTEMS,
    systems: json.result,
    receivedAt: Date.now()
  }
}

export function invalidateAgaveFileSystems() {
  return {
    type: INVALIDATE_AGAVE_FILE_SYSTEMS
  }
}

function fetchAgaveFileSystems() {
  return dispatch => {
    dispatch(requestAgaveFileSystems());
    return fetch(`/agave/systems/v2/`, {
      credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(json => dispatch(receiveAgaveFileSystems(json)));
  }
}

function shouldFetchAgaveFileSystems(state) {
  const agaveFileSystems = state.agaveFileSystems;
  if (agaveFileSystems.isFetching) {
    return false;
  } else if (agaveFileSystems.systems.length === 0) {
    return true;
  } else {
    return agaveFileSystems.didInvalidate;
  }
}

export function fetchAgaveFileSystemsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAgaveFileSystems(getState())) {
      return dispatch(fetchAgaveFileSystems());
    }
  }
}