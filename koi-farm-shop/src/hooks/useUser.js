import { useSelector } from 'react-redux';

export const useUser = () => {
  const user = useSelector(state => state.auth.user);
  return {
    userId: user?.userId,
    role: user?.role,
    isAuthenticated: !!user?.token
  };
};

