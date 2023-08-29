import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

function Dashboard() {
  const [auth] = useAuth();
  return (
    <Layout title={"Ecommerce App"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>NAME: {auth?.user?.name}</h3>
              <h3>EMAIL:{auth?.user?.email}</h3>
              <h3>ADDRESS:{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
