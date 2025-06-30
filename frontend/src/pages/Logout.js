import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate('/');
  }, []);
  return null;
}
