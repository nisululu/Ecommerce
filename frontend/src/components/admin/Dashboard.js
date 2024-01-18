import React, { useEffect, Fragment } from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Doughnut } from "react-chartjs-2"
import Chart, { CategoryScale } from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { getAdminProduct } from '../../actions/productAction'
import load from '../images/loading.gif'
import MetaData from '../layout/MetaData'
import { ordersAdmin } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'

Chart.register(CategoryScale)

const Dashboard = () => {

  const alert = useAlert()
  const dispatch = useDispatch()

  const { products, loading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.user)
  const { orders } = useSelector(state => state.orders)
  const { users } = useSelector(state => state.allUsers)

  useEffect(() => {
    dispatch(getAdminProduct())
    dispatch(ordersAdmin())
    dispatch(getAllUsers())
  }, [dispatch, alert])

  let outOfStock = 0

  products && products.map(el => {
    return(
      el.stock === 0 ? outOfStock += 1 : null
    )
  })

  // const lineState = {
  //   labels: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'Total Amount',
  //       data: [0, 100000],
  //       backgroundColor: ["#00a676"],
  //     }
  //   ],
  // };

  const doughnutState = {
    labels: ['Out of Stock', 'In Stock'],
    datasets: [
      {
        label: 'Total Numbers',
        data: [outOfStock, products && products.length - outOfStock],
        backgroundColor: ["#ff0066", "#00a676"],
      }
    ],
  }

  return (

    <Fragment>
      <MetaData title={`${user && user.name}'s Dashboard`} />
      <div className='dashboard'>
        <Sidebar />
        {
          loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <img src={load} alt='loading' />
            </div>
          ): (
        <div className='dashboardContainer'>
          <h1>Dashboard</h1>
          <div className='dashboardSummary'>
            <div>
              <p>
                Total Amount <br /> Rs. 100000
              </p>
            </div>
            <div className='dashboardSummaryBox2'>
              <Link to="/admin/products">
                <p>Products</p>
                <p><b>{products && products.length}</b></p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p><b>{orders && orders.length}</b></p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p><b>{users && users.length}</b></p>
              </Link>
            </div>
          </div>

          {/* <div className='lineChart'>
            <Line data={lineState} />
          </div> */}

          <div className='DoughnutChart'>
            <Doughnut data={doughnutState} />
          </div>
        </div>
        )
                }
      </div>
    </Fragment>
  )
}

export default Dashboard
