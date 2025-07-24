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
  const [posts, setPosts] = useState([]);
  const [orgPosts, setOrgPosts] = useState([]);
  const [postsOrder, setPostsOrder] = useState('latest');
  const [orgPostsOrder, setOrgPostsOrder] = useState('latest');

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

  const getFriendProfile = useCallback(async (id) => {
    const res = await api.get(`/friends/${id}`);
    return res.data;
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

  const removeFriend = async (id) => {
    await api.delete(`/friends/${id}`);
    await refreshFriends();
  };

  const refreshPosts = useCallback(
    async (order = postsOrder) => {
      const res = await api.get('/posts', { params: { order } });
      setPosts(res.data);
      setPostsOrder(order);
    },
    [postsOrder]
  );

  const refreshOrgPosts = useCallback(
    async (orgId = currentOrg, order = orgPostsOrder) => {
      if (!orgId) { setOrgPosts([]); return; }
      const res = await api.get(`/organizations/${orgId}/posts`, { params: { order } });
      setOrgPosts(res.data);
      setOrgPostsOrder(order);
    },
    [currentOrg, orgPostsOrder]
  );

  const createPost = async (data) => {
    await api.post('/posts', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await refreshPosts();
  };

  const createOrgPost = async (data, orgId = currentOrg) => {
    if (!orgId) return;
    await api.post(`/organizations/${orgId}/posts`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    await refreshOrgPosts(orgId);
  };

  const likePost = async (id) => {
    await api.post(`/posts/${id}/like`);
    await refreshPosts();
  };

  const likeOrgPost = async (id, orgId = currentOrg) => {
    await api.post(`/posts/${id}/like`);
    await refreshOrgPosts(orgId);
  };

  const upvotePost = async (id, orgId) => {
    await api.post(`/posts/${id}/upvote`);
    if (orgId) await refreshOrgPosts(orgId); else await refreshPosts();
  };

  const downvotePost = async (id, orgId) => {
    await api.post(`/posts/${id}/downvote`);
    if (orgId) await refreshOrgPosts(orgId); else await refreshPosts();
  };

  const creditPost = async (id, amount, orgId = currentOrg) => {
    await api.post(`/posts/${id}/credit`, { amount, orgId });
    if (orgId) await Promise.all([refreshOrgPosts(orgId), refreshBalance(orgId)]);
    else await refreshPosts();
  };

  const addComment = async (postId, content, parentId) => {
    await api.post(`/posts/${postId}/comments`, { content, parentId });
  };

  const addReply = async (commentId, content) => {
    await api.post(`/comments/${commentId}/replies`, { content });
  };

  const getReplies = async (commentId) => {
    const res = await api.get(`/comments/${commentId}/replies`);
    return res.data;
  };

  const reactToComment = async (id, emoji) => {
    const res = await api.post(`/comments/${id}/reactions`, { emoji });
    return res.data;
  };

  const upvoteComment = async (id, orgId = currentOrg) => {
    await api.post(`/comments/${id}/upvote`);
    if (orgId) await refreshBalance(orgId);
  };

  const downvoteComment = async (id, orgId = currentOrg) => {
    await api.post(`/comments/${id}/downvote`);
    if (orgId) await refreshBalance(orgId);
  };

  const creditComment = async (id, amount, orgId = currentOrg) => {
    await api.post(`/comments/${id}/credit`, { amount, orgId });
    if (orgId) await refreshBalance(orgId);
  };

  const getComments = async (postId) => {
    const res = await api.get(`/posts/${postId}/comments`);
    return res.data;
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
      removeFriend,
      getFriendProfile,
      posts,
      refreshPosts,
      createPost,
      orgPosts,
      refreshOrgPosts,
      createOrgPost,
      likePost,
      likeOrgPost,
      upvotePost,
      downvotePost,
      creditPost,
      addComment,
      addReply,
      upvoteComment,
      downvoteComment,
      creditComment,
      reactToComment,
      getComments,
      getReplies,
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
