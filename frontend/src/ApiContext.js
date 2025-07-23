import React, { createContext, useState, useContext, useCallback } from 'react';
import api from './api';
import { AuthContext } from './AuthContext';

export const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const { currentOrg, loadProfile } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [invites, setInvites] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const refreshBalance = useCallback(async (orgId = currentOrg) => {
    if (!orgId) { setBalance(null); return; }
    const res = await api.get('/balance', { params: { orgId } });
    setBalance(res.data.balance);
  }, [currentOrg]);

  const transfer = useCallback(async (toUsername, amount, orgId = currentOrg) => {
    await api.post('/transfer', { toUsername, amount, orgId });
    await refreshBalance(orgId);
    await loadProfile();
  }, [currentOrg, refreshBalance, loadProfile]);

  const refreshUsers = useCallback(async (orgId = currentOrg) => {
    const params = orgId ? { params: { orgId } } : {};
    const res = await api.get('/users', params);
    setUsers(res.data);
  }, [currentOrg]);

  const refreshRoles = useCallback(async (orgId = currentOrg) => {
    if (!orgId) { setRoles([]); return; }
    const res = await api.get('/roles', { params: { orgId } });
    setRoles(res.data);
  }, [currentOrg]);

  const refreshInvites = useCallback(async (orgId = currentOrg) => {
    if (!orgId) { setInvites([]); return; }
    const res = await api.get(`/organizations/${orgId}/invites`);
    setInvites(res.data);
  }, [currentOrg]);

  const refreshFriends = useCallback(async () => {
    const res = await api.get('/friends');
    setFriends(res.data);
  }, []);

  const refreshFriendRequests = useCallback(async () => {
    const res = await api.get('/friends/requests');
    setFriendRequests(res.data);
  }, []);

  const sendFriendRequest = async (email) => {
    await api.post('/friends/request', { email });
    await refreshFriendRequests();
  };

  const acceptFriendRequest = async (id) => {
    await api.post(`/friends/requests/${id}/accept`);
    await Promise.all([refreshFriends(), refreshFriendRequests()]);
  };

  const register = async (form) => {
    await api.post('/register', form);
  };

  const changePassword = async (oldPassword, newPassword) => {
    await api.post('/password/change', { oldPassword, newPassword });
  };

  const forgotPassword = async (username) => {
    const res = await api.post('/password/forgot', { username });
    return res.data.token;
  };

  const resetPassword = async (token, newPassword) => {
    await api.post('/password/reset', { token, newPassword });
  };

  const updateProfile = async (data) => {
    await api.patch('/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await loadProfile();
  };

  const deleteAccount = async () => {
    await api.delete('/profile');
  };

  return (
    <ApiContext.Provider value={{
      balance,
      refreshBalance,
      transfer,
      users,
      refreshUsers,
      roles,
      refreshRoles,
      invites,
      refreshInvites,
      friends,
      refreshFriends,
      friendRequests,
      refreshFriendRequests,
      sendFriendRequest,
      acceptFriendRequest,
      register,
      changePassword,
      forgotPassword,
      resetPassword,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </ApiContext.Provider>
  );
}
