import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children, loggedinUser, loading}) => {
    if(loading) return <div> Loading </div>
    if(!loggedinUser){
        return <Navigate to="/login" replace />
    }
    return children;
}
export default ProtectedRoute