import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../Navbar/LoadingSpinner'
const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'hr') return children
  return <Navigate to='/dashboard' />
}

export default HostRoute

HostRoute.propTypes = {
  children: PropTypes.element,
}