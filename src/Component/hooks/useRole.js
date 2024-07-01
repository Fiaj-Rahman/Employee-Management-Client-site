import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: googleRole = '', isLoading: googleLoading } = useQuery({
    queryKey: ['googleRole', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/googleUsers/${user?.email}`);
      return data.role;
    },
  });

  const { data: signUpRole = '', isLoading: signUpLoading } = useQuery({
    queryKey: ['signUpRole', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/signUpUsers/${user?.email}`);
      return data.role;
    },
  });

  // Return user roles and loading states
  return [googleRole || signUpRole, googleLoading || signUpLoading];
};

export default useRole;
