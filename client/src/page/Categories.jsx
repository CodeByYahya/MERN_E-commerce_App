import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategroy";
import Layout from "../components/Layout/Layout";
import "../styles/category.css"
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
    
<div className=" d-flex justify-content-center flex-wrap w-100 " style={{ marginTop: "100px" }}>
          {categories.map((c) => (
                <Link className=" btn categoryName btn-light m-2" to={`/category/${c.slug}` }>
                   {c.name}

                 </Link>
        
          ))}
          </div>

        
    </Layout>
  );
};

export default Categories;
