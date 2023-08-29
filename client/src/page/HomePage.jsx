import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { Prices } from "./../components/Price";
import { useCart } from "../context/cart";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Aos Animation
  useEffect(() => {
    AOS.init();
  }, []);


  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>

      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-aos="zoom-in-down">
        <div className="carousel-inner">
        <div className="carousel-item active">
            <img className="d-block w-100 banner-img" src="https://img.freepik.com/free-photo/image-happy-woman-shopaholic-showing-her-plastic-credit-card-holding-shopping-bags-wearing-summer-clothes-standing-against-blue-background_1258-70444.jpg?w=826&t=st=1693326411~exp=1693327011~hmac=88cbabd44acfcc48a5fad3268ac6a3d7baba553d4918d620027a31feea56f089" alt="..." />
          </div>
          <div className="carousel-item ">
            <img className="d-block w-100 banner-img" src="https://img.freepik.com/free-photo/image-happy-young-woman-carry-lots-shopping-bags-buying-things-spring-discounts-standing-blue-background_1258-122063.jpg?w=900&t=st=1693326496~exp=1693327096~hmac=f3121129336fdf103734c90771c0639ad941e4385b9efc31e5b8c357b1722f7a" alt="..." />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 banner-img" src="https://img.freepik.com/free-photo/beautiful-smiling-young-blonde-woman-pointing-sunglasses-holding-shopping-bags-credit-card-pink-wall_496169-1506.jpg?w=826&t=st=1693326675~exp=1693327275~hmac=ba0de2793558fc20232afa3b9caf5376b391277fb2f95ac6647f5792e34a422e" alt="..." />
          </div>
          <div className="carousel-item ">
            <img className="d-block w-100 banner-img" src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?w=900&t=st=1693326561~exp=1693327161~hmac=a62607b8c57bb6091b72c0614fec76a387d5105c42527e206a178f2dc492e0b1" alt="..." />
          </div>
          <div className="carousel-item ">
            <img className="d-block w-100 banner-img" src="https://img.freepik.com/free-photo/closeup-shot-two-pretty-afro-american-girls-using-their-phones-while-holding-shopping-bags_181624-46178.jpg?w=826&t=st=1693326636~exp=1693327236~hmac=c5fa2c05e89915b307a6a7185d6773bd435a80687bc290a022ef1d4223a20e4e" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container-fluid row mt-3 mx-0 home-page" >
        <div className="col-md-3 filters">
          <h4 className="text-center" data-aos="zoom-in-down">Filter By Category</h4>
          <div className="d-flex  flex-column ms-1" data-aos="zoom-in-down">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4" data-aos="zoom-in-down">Filter By Price</h4>
          <div className="d-flex flex-column" data-aos="zoom-in-down">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p, index) => (
                <div key={p.name}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex justify-content-center flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" data-aos="zoom-in-down" key={p._id}>
                <img
                  src={`https://ecommerce-website-t7lu43q0c-codewithkainat.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body p-3">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : <>Loadmore</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
