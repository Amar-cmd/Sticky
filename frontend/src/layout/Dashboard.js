import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { BiRupee, BiMenu } from "react-icons/bi";
import { MdBorderColor } from "react-icons/md";
import { TbSticker } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../actions/productAction";
import { getAllOrders } from "../actions/orderAction";
import { getAllUsers } from "../actions/userAction";
import MetaData from "./MetaData";

function Dashboard() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const showSidebar = () => {
    setToggle((toggle) => !toggle);
  };
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["0", "Earned: ₹" + totalAmount.toFixed(0)],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#FE8F9C", "#0DF1A3"],
        hoverBackgroundColor: ["#FE5D70", "#0AC282"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],

    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <DashboardPage>
      <MetaData title="Dashboard - Sticky" />
      <button className="menuToggleBtn" onClick={showSidebar}>
        <BiMenu />
      </button>
      {window.innerWidth <= 1000 ? toggle ? <Sidebar /> : null : <Sidebar />}

      <div className="dashboardContainer">
        <div className="topDashboard">
          <div className="leftDashboard">
            <div className="dashboardRevenueSummary">
              <div className="top">
                <div className="left">
                  <h2>₹ {totalAmount.toFixed(2)}</h2>
                  <p>All Earnings</p>
                </div>
                <div className="right">
                  <BiRupee className="icon" />
                </div>
              </div>
              <div className="bottom">
                <h3>Revenue</h3>
              </div>
            </div>
            <Link to="/admin/orders">
              <div className="dashboardOrdersSummary">
                <div className="top">
                  <div className="left">
                    <h2>{orders && orders.length}</h2>
                    <p>All Orders</p>
                  </div>
                  <div className="right">
                    <MdBorderColor className="icon" />
                  </div>
                </div>
                <div className="bottom">
                  <h3>Orders</h3>
                </div>
              </div>
            </Link>

            <Link to="/admin/products">
              <div className="dashboardProductsSummary">
                <div className="top">
                  <div className="left">
                    <h2>{products && products.length}</h2>
                    <p>All Products</p>
                  </div>
                  <div className="right">
                    <TbSticker className="icon" />
                  </div>
                </div>
                <div className="bottom">
                  <h3>Products</h3>
                </div>
              </div>
            </Link>

            <Link to="/admin/users">
              <div className="dashboardUsersSummary">
                <div className="top">
                  <div className="left">
                    <h2>{users && users.length}</h2>
                    <p>All Users</p>
                  </div>
                  <div className="right">
                    <FaUserFriends className="icon" />
                  </div>
                </div>
                <div className="bottom">
                  <h3>Users</h3>
                </div>
              </div>
            </Link>
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} className="donut" />
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>
      </div>
    </DashboardPage>
  );
}

const DashboardPage = styled.div`
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;
  background: #f5f6fb;
  height: 100%;

  .menuToggleBtn {
    display: none;
  }

  .topDashboard {
    margin-top: 3vmax;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #f5f6fb;
  }

  .leftDashboard {
    display: flex;
    flex-direction: column;
    width: 21vmax;
  }
  .dashboardRevenueSummary {
    width: 20vmax;
    height: 10vmax;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    margin-bottom: 1vmax;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .top {
      width: 20vmax;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      h2 {
        color: #fe5d70;
        font-family: Poppins;
      }

      .icon {
        font-size: 2.4rem;
        color: #fe5d70;
      }
    }

    .bottom {
      width: 20vmax;
      padding: 0.5vmax;
      background-image: linear-gradient(to right, #fe5d70, #fe8f9c);
      display: flex;
      align-items: center;

      h3 {
        margin-left: 3rem;
        font-weight: 400;
        font-family: Poppins;
        color: white;
      }
    }
  }
  .dashboardOrdersSummary {
    width: 20vmax;
    height: 10vmax;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    overflow: hidden;
    margin-bottom: 1vmax;

    .top {
      width: 20vmax;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      h2 {
        color: #0ac282;
        font-family: Poppins;
      }

      p {
        color: black;
      }

      .icon {
        font-size: 2.4rem;
        color: #0ac282;
      }
    }

    .bottom {
      width: 20vmax;
      padding: 0.5vmax;
      background-image: linear-gradient(to right, #0ac282, #0df2a3);
      display: flex;
      align-items: center;

      h3 {
        margin-left: 3rem;
        font-weight: 400;
        font-family: Poppins;
        color: white;
      }
    }
  }
  .dashboardProductsSummary {
    width: 20vmax;
    height: 10vmax;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    margin-bottom: 1vmax;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .top {
      width: 20vmax;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      h2 {
        color: #fe9365;
        font-family: Poppins;
      }

      p {
        color: black;
      }

      .icon {
        font-size: 2.4rem;
        color: #fe9365;
      }
    }

    .bottom {
      width: 20vmax;
      padding: 0.5vmax;
      background-image: linear-gradient(to right, #fe9365, #feb798);
      display: flex;
      align-items: center;

      h3 {
        margin-left: 3rem;
        font-weight: 400;
        font-family: Poppins;
        color: white;
      }
    }
  }
  .dashboardUsersSummary {
    width: 20vmax;
    height: 10vmax;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    margin-bottom: 1vmax;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .top {
      width: 20vmax;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      h2 {
        color: #8865fe;
        font-family: Poppins;
      }

      p {
        color: black;
      }

      .icon {
        font-size: 2.4rem;
        color: #8865fe;
      }
    }

    .bottom {
      width: 20vmax;
      padding: 0.5vmax;
      background-image: linear-gradient(to right, #8865fe, #af98fe);
      display: flex;
      align-items: center;

      h3 {
        margin-left: 3rem;
        font-weight: 400;
        font-family: Poppins;
        color: white;
      }
    }
  }

  .doughnutChart {
    width: 30vmax;
    padding: 6.5vmax;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
  }

  .donut {
    width: 100%;
    height: 100%;
  }
  .lineChart {
    width: 80%;
    margin: 1vmax auto;
    border: 0.25px solid rgba(0, 0, 0, 0.2);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.16);
    padding: 3vmax;
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;

    .menuToggleBtn {
      display: block;
      padding: 1rem;
      font-size: 2rem;
      z-index: 111;
      background: #45bfb8;
      color: white;
      border: none;
      outline: none;
    }

    .topDashboard {
      flex-direction: column;
    }
    .leftDashboard {
      width: 80vw;
    }

    .dashboardRevenueSummary,
    .dashboardOrdersSummary,
    .dashboardProductsSummary,
    .dashboardUsersSummary {
      width: 90%;
      height: 100%;
      margin-bottom: 3vmax;
      background: white;

      .top {
        width: 80vw;
        height: 100%;

        h2,
        p {
          padding: 1vmax;
        }
        .icon {
          padding: 1vmax;
        }
      }
      .bottom {
        width: 80vw;
        padding: 1vmax;
      }
    }

    .doughnutChart {
      margin: 1.5rem 0;
    }

    .lineChart {
      width: 80%;
      padding: 3vmax;
    }
  }
`;

export default Dashboard;
