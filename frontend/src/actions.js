import api from './api';

export const loadOrganizations = () => async dispatch => {
  const res = await api.get('/organizations');
  dispatch({ type: 'SET_ORGS', payload: res.data });
};

export const createOrganization = name => async dispatch => {
  const res = await api.post('/organizations', { name });
  dispatch({ type: 'ADD_ORG', payload: { id: res.data.orgId, name, members: 1, invites: 0 } });
};

export const updateOrganization = (id, name) => async dispatch => {
  await api.patch(`/organizations/${id}`, { name });
  dispatch({ type: 'UPDATE_ORG', id, data: { name } });
};

export const deleteOrganization = id => async dispatch => {
  await api.delete(`/organizations/${id}`);
  dispatch({ type: 'DELETE_ORG', id });
};

export const loadRoles = orgId => async dispatch => {
  if (!orgId) { dispatch({ type: 'SET_ROLES', payload: [] }); return; }
  const res = await api.get('/roles', { params: { orgId } });
  dispatch({ type: 'SET_ROLES', payload: res.data });
};

export const createRole = (code, name, orgId) => async dispatch => {
  const res = await api.post('/roles', { code, name, orgId });
  dispatch({ type: 'ADD_ROLE', payload: { id: res.data.id, code, name, system: false } });
};

export const updateRole = (id, data) => async dispatch => {
  await api.patch(`/roles/${id}`, data);
  dispatch({ type: 'UPDATE_ROLE', id, data });
};

export const deleteRole = id => async dispatch => {
  await api.delete(`/roles/${id}`);
  dispatch({ type: 'DELETE_ROLE', id });
};
