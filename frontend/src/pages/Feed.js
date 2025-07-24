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
import CheckIcon from '@mui/icons-material/Check';
import { ApiContext } from '../ApiContext';
import { ToastContext } from '../ToastContext';
import { API_ROOT } from '../api';
import { styles } from '../styles';

export default function Feed() {
  const {
    posts,
    refreshPosts,
    createPost,
    likePost,
    upvotePost,
    downvotePost,
    creditPost,
    getComments,
    addComment,
    upvoteComment,
    downvoteComment,
    creditComment
  } = useContext(ApiContext);
  const { showToast } = useContext(ToastContext);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [postCreditInput, setPostCreditInput] = useState({});
  const [commentCreditInput, setCommentCreditInput] = useState({});
  const [showPostCredit, setShowPostCredit] = useState({});
  const [showCommentCredit, setShowCommentCredit] = useState({});
  const [order, setOrder] = useState('latest');

  useEffect(() => {
    refreshPosts(order);
  }, [refreshPosts, order]);

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
      await createPost(data);
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
      await likePost(id);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleUpvotePost = async id => {
    try {
      await upvotePost(id);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  const handleDownvotePost = async id => {
    try {
      await downvotePost(id);
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
      await creditPost(id, amount);
      setPostCreditInput(prev => ({ ...prev, [id]: '' }));
      setShowPostCredit(prev => ({ ...prev, [id]: false }));
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
      await creditComment(id, amount);
      const res = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: res }));
      setCommentCreditInput(prev => ({ ...prev, [id]: '' }));
      setShowCommentCredit(prev => ({ ...prev, [id]: false }));
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    }
  };

  return (
    <Box>
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
        {posts.map(p => (
          <Box
            key={p.id}
            sx={{ ...styles.swaggerPost, ...(p.liked && styles.likedPost) }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {p.author.profilePicture && (
                <Avatar src={p.author.profilePicture.startsWith('http') ? p.author.profilePicture : `${API_ROOT}${p.author.profilePicture}`} />
              )}
              <Typography variant="subtitle1">{p.author.firstName} {p.author.lastName}</Typography>
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
              {showPostCredit[p.id] ? (
                <>
                  <TextField
                    variant="standard"
                    size="small"
                    value={postCreditInput[p.id] || ''}
                    onChange={e =>
                      setPostCreditInput(prev => ({
                        ...prev,
                        [p.id]: e.target.value
                      }))
                    }
                    placeholder="Amount"
                    sx={{ width: 60 }}
                  />
                  <IconButton onClick={() => handleCreditPost(p.id)}>
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  onClick={() =>
                    setShowPostCredit(prev => ({ ...prev, [p.id]: true }))
                  }
                >
                  <AttachMoneyIcon fontSize="small" />
                </IconButton>
              )}
              <Typography>{p.credits}</Typography>
              <Button onClick={() => loadComments(p.id)}>Comments</Button>
            </Stack>
            {comments[p.id] && (
              <Box sx={{ mt: 1 }}>
                  {comments[p.id].map(c => (
                    <Box
                      key={c.id}
                      sx={{
                        ...styles.swaggerComment,
                        ...(c.upvoted && styles.likedComment)
                      }}
                    >
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
                            {c.author.firstName} {c.author.lastName}
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
                          {showCommentCredit[c.id] ? (
                            <>
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
                                <CheckIcon fontSize="small" />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              onClick={() =>
                                setShowCommentCredit(prev => ({ ...prev, [c.id]: true }))
                              }
                            >
                              <AttachMoneyIcon fontSize="small" />
                            </IconButton>
                          )}
                          <Typography>{c.credits}</Typography>
                        </Stack>
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
