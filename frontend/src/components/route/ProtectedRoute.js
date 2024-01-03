import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Route, Navigate, Routes } from 'react-router-dom'

const ProtectedRoute = ({  Component:Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    return (
      <Fragment>
        {loading === false && (
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to="/login" />;
              }

              return <Component {...props} />;
            }}
          />
        )}
      </Fragment>
    );
  };

// const ProtectedRoute = ({ children }) => {

//     const { loading, isAuthenticated, user } = useSelector(state => state.user)
//     const navigate = useNavigate()

    
//     if (isAuthenticated === false) {
//         return <Navigate to="/login" />
//     }
//     return children
// }

export default ProtectedRoute
