import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Button,
  Avatar,
  Typography,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ApiContext } from '../ApiContext';
import { AuthContext } from '../AuthContext';
import { ToastContext } from '../ToastContext';
import { API_ROOT } from '../api';
import { styles } from '../styles';

export default function OrganizationFeed() {
  const {
    orgPosts,
    refreshOrgPosts,
    createOrgPost,
    likeOrgPost,
    upvotePost,
    downvotePost,
    creditPost,
    getComments,
    addComment,
    addReply,
    getReplies,
    upvoteComment,
    downvoteComment,
    creditComment,
    reactToComment,
    balance,
    refreshBalance
  } = useContext(ApiContext);
  const { currentOrg } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [replies, setReplies] = useState({});
  const [replyInput, setReplyInput] = useState({});
  const [reactionInput, setReactionInput] = useState({});
  const [postCreditInput, setPostCreditInput] = useState({});
  const [commentCreditInput, setCommentCreditInput] = useState({});
  const [order, setOrder] = useState('latest');

  useEffect(() => {
    refreshOrgPosts(currentOrg, order);
    refreshBalance();
  }, [refreshOrgPosts, refreshBalance, currentOrg, order]);

  const submit = async e => {
    e.preventDefault();
    if (!content.trim() && !image) {
      showToast('Post content required', 'error');
      return;
    }
    const data = new FormData();
    data.append('content', content.trim());
    if (image) data.append('image', image);
    try {
      await createOrgPost(data);
      showToast('Post created', 'success');
      setContent('');
      setImage(null);
      setPreview('');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error creating post', 'error');
    }
  };

  const toggleLike = async id => {
    try {
      await likeOrgPost(id);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleUpvotePost = async id => {
    try {
      await upvotePost(id, currentOrg);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDownvotePost = async id => {
    try {
      await downvotePost(id, currentOrg);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleCreditPost = async id => {
    const amount = parseFloat(postCreditInput[id]);
    if (!postCreditInput[id] || isNaN(amount) || amount <= 0) {
      showToast('Invalid amount', 'error');
      return;
    }
    try {
      await creditPost(id, amount, currentOrg);
      setPostCreditInput(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const loadComments = async id => {
    if (comments[id]) {
      setComments(prev => ({ ...prev, [id]: null }));
      return;
    }
    try {
      const res = await getComments(id);
      setComments(prev => ({ ...prev, [id]: res }));
    } catch (err) {
      showToast('Failed to load comments', 'error');
    }
  };

  const submitComment = async (e, id) => {
    e.preventDefault();
    const text = commentInput[id]?.trim();
    if (!text) return;
    try {
      await addComment(id, text);
      const res = await getComments(id);
      setComments(prev => ({ ...prev, [id]: res }));
      setCommentInput(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleUpvoteComment = async (id, postId) => {
    try {
      await upvoteComment(id);
      const res = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: res }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDownvoteComment = async (id, postId) => {
    try {
      await downvoteComment(id);
      const res = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: res }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleCreditComment = async (id, postId) => {
    const amount = parseFloat(commentCreditInput[id]);
    if (!commentCreditInput[id] || isNaN(amount) || amount <= 0) {
      showToast('Invalid amount', 'error');
      return;
    }
    try {
      await creditComment(id, amount, currentOrg);
      const res = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: res }));
      setCommentCreditInput(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const loadReplies = async commentId => {
    if (replies[commentId]) {
      setReplies(prev => ({ ...prev, [commentId]: null }));
      return;
    }
    try {
      const res = await getReplies(commentId);
      setReplies(prev => ({ ...prev, [commentId]: res }));
    } catch (err) {
      showToast('Failed to load replies', 'error');
    }
  };

  const submitReply = async (e, commentId, postId) => {
    e.preventDefault();
    const text = replyInput[commentId]?.trim();
    if (!text) return;
    try {
      await addReply(commentId, text);
      const res = await getReplies(commentId);
      setReplies(prev => ({ ...prev, [commentId]: res }));
      const commentsRes = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: commentsRes }));
      setReplyInput(prev => ({ ...prev, [commentId]: '' }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleReact = async (commentId, emoji, postId) => {
    if (!emoji) return;
    try {
      await reactToComment(commentId, emoji);
      const commentsRes = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: commentsRes }));
      setReactionInput(prev => ({ ...prev, [commentId]: '' }));
    } catch (err) {
      showToast('Failed to react', 'error');
    }
  };

  return (
    <Box>
      {balance !== null && (
        <Typography sx={{ mb: 1 }}>Balance: {balance}</Typography>
      )}
      <Box component="form" onSubmit={submit} noValidate>
        <Stack spacing={2} sx={styles.formStack}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={e => {
                const f = e.target.files[0];
                setImage(f);
                if (f) {
                  const reader = new FileReader();
                  reader.onload = ev => setPreview(ev.target.result);
                  reader.readAsDataURL(f);
                } else {
                  setPreview('');
                }
              }}
            />
          </Button>
          {preview && (
            <Box component="img" src={preview} sx={{ maxWidth: '100%' }} />
          )}
          <Button type="submit" variant="contained">Post</Button>
        </Stack>
      </Box>
      <TextField
        select
        label="Sort by"
        value={order}
        onChange={e => setOrder(e.target.value)}
        sx={{ mt: 4, mb: 2, width: 200 }}
      >
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="relevance">Relevance</MenuItem>
        <MenuItem value="upvotes">Upvotes</MenuItem>
      </TextField>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {orgPosts.map(p => (
          <Box key={p.id} sx={styles.swaggerPost}>
            <Stack direction="row" spacing={2} alignItems="center">
              {p.author.profilePicture && (
                <Avatar src={p.author.profilePicture.startsWith('http') ? p.author.profilePicture : `${API_ROOT}${p.author.profilePicture}`} />
              )}
              <Typography variant="subtitle1">
                {p.author.firstName} {p.author.lastName} ({p.author.balance})
              </Typography>
              <Typography variant="caption" sx={{ ml: 'auto' }}>{new Date(p.createdAt).toLocaleString()}</Typography>
            </Stack>
            <Typography sx={{ mt: 1, mb: 1 }}>{p.content}</Typography>
            {p.image && (
              <Box component="img" src={p.image.startsWith('http') ? p.image : `${API_ROOT}${p.image}`} sx={{ maxWidth: '100%', maxHeight: 400 }} />
            )}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
              <IconButton onClick={() => toggleLike(p.id)} color="error">
                {p.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography>{p.likes}</Typography>
              <IconButton onClick={() => handleUpvotePost(p.id)}>
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <Typography>{p.upvotes}</Typography>
              <IconButton onClick={() => handleDownvotePost(p.id)}>
                <ThumbDownIcon fontSize="small" />
              </IconButton>
              <Typography>{p.downvotes}</Typography>
              <TextField
                variant="standard"
                size="small"
                value={postCreditInput[p.id] || ''}
                onChange={e =>
                  setPostCreditInput(prev => ({ ...prev, [p.id]: e.target.value }))
                }
                placeholder="Amount"
                sx={{ width: 60 }}
              />
              <IconButton onClick={() => handleCreditPost(p.id)}>
                <AttachMoneyIcon fontSize="small" />
              </IconButton>
              <Typography>{p.credits}</Typography>
              <Button onClick={() => loadComments(p.id)}>Comments</Button>
            </Stack>
            {comments[p.id] && (
              <Box sx={{ mt: 1 }}>
                {comments[p.id].map(c => (
                  <Box key={c.id} sx={styles.swaggerComment}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      {c.author.profilePicture && (
                        <Avatar
                          src={c.author.profilePicture.startsWith('http') ? c.author.profilePicture : `${API_ROOT}${c.author.profilePicture}`}
                          sx={{ width: 24, height: 24, mt: 0.5 }}
                        />
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2">
                            {c.author.firstName} {c.author.lastName} ({c.author.balance})
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 'auto' }}>
                            {new Date(c.createdAt).toLocaleString()}
                          </Typography>
                        </Stack>
                        <Typography sx={{ mt: 0.5 }}>{c.content}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                          <IconButton onClick={() => handleUpvoteComment(c.id, p.id)}>
                            <ThumbUpIcon fontSize="small" />
                          </IconButton>
                          <Typography>{c.upvotes}</Typography>
                          <IconButton onClick={() => handleDownvoteComment(c.id, p.id)}>
                            <ThumbDownIcon fontSize="small" />
                          </IconButton>
                          <Typography>{c.downvotes}</Typography>
                          <TextField
                            variant="standard"
                            size="small"
                            value={commentCreditInput[c.id] || ''}
                            onChange={e =>
                              setCommentCreditInput(prev => ({
                                ...prev,
                                [c.id]: e.target.value
                              }))
                            }
                            placeholder="Amount"
                            sx={{ width: 60 }}
                          />
                          <IconButton onClick={() => handleCreditComment(c.id, p.id)}>
                            <AttachMoneyIcon fontSize="small" />
                          </IconButton>
                          <Typography>{c.credits}</Typography>
                          {Object.entries(c.reactions).map(([emo, cnt]) => (
                            <Button key={emo} size="small" onClick={() => handleReact(c.id, emo, p.id)}>
                              {emo} {cnt}
                            </Button>
                          ))}
                          <TextField
                            variant="standard"
                            size="small"
                            value={reactionInput[c.id] || ''}
                            onChange={e =>
                              setReactionInput(prev => ({ ...prev, [c.id]: e.target.value }))
                            }
                            placeholder="😀"
                            sx={{ width: 40 }}
                          />
                          <Button onClick={() => handleReact(c.id, reactionInput[c.id], p.id)}>React</Button>
                          <Button onClick={() => loadReplies(c.id)}>Replies ({c.repliesCount})</Button>
                        </Stack>
                        {replies[c.id] && (
                          <Box sx={{ mt: 1, ml: 2 }}>
                            {replies[c.id].map(r => (
                              <Box key={r.id} sx={styles.swaggerComment}>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                  {r.author.profilePicture && (
                                    <Avatar
                                      src={r.author.profilePicture.startsWith('http') ? r.author.profilePicture : `${API_ROOT}${r.author.profilePicture}`}
                                      sx={{ width: 24, height: 24, mt: 0.5 }}
                                    />
                                  )}
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                      <Typography variant="subtitle2">
                                        {r.author.firstName} {r.author.lastName}
                                      </Typography>
                                      <Typography variant="caption" sx={{ ml: 'auto' }}>
                                        {new Date(r.createdAt).toLocaleString()}
                                      </Typography>
                                    </Stack>
                                    <Typography sx={{ mt: 0.5 }}>{r.content}</Typography>
                                  </Box>
                                </Stack>
                              </Box>
                            ))}
                            <Box component="form" onSubmit={e => submitReply(e, c.id, p.id)} sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={1}>
                                <TextField
                                  variant="standard"
                                  size="small"
                                  fullWidth
                                  placeholder="Reply"
                                  value={replyInput[c.id] || ''}
                                  onChange={e =>
                                    setReplyInput(prev => ({ ...prev, [c.id]: e.target.value }))
                                  }
                                />
                                <Button type="submit">Send</Button>
                              </Stack>
                            </Box>
                          </Box>
                        )}
                      </Box>
                      </Box>
                    </Stack>
                  </Box>
                ))}
                <Box component="form" onSubmit={e => submitComment(e, p.id)} sx={{ mt: 1, ml: 2 }}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      variant="standard"
                      size="small"
                      fullWidth
                      placeholder="Add a comment"
                      value={commentInput[p.id] || ''}
                      onChange={e =>
                        setCommentInput(prev => ({ ...prev, [p.id]: e.target.value }))
                      }
                    />
                    <Button type="submit">Send</Button>
                  </Stack>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
