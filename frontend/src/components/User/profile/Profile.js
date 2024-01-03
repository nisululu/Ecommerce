import React, { Fragment, useEffect } from 'react'
import MetaData from '../../layout/MetaData'
import { useSelector } from 'react-redux'
import load from '../../images/loading.gif'
import { Link, useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = () => {

  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  return (
    <Fragment>
      {
        loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <img src={load} alt='loading' />
          </div>
        ) : (
          <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='profile-container'>
              <div>
                <h3>Profile Details</h3>
                <img src={user.avatar.url} alt='profile' />
                <Link to='/me/update'>Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Name:</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On:</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to='/order'>My Orders</Link>
                  <Link to='/password/update'>Change Password</Link>
                </div>
              </div>
            </div>
          </Fragment>
        )
      }
    </Fragment>
  )
}

export default Profile
