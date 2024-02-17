import { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import Header from "../Header/header";
import Bags from "../Bags/bags";
import "./home.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    products: null,
    errorMsg: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        products: null,
        errorMsg: null,
      });
      const apiUrl =
        "https://dev-tspxfl4hvvkbbss.api.raw-labs.com/mock/json-api";
      const options = {
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.success,
          products: data,
        }));
      } else {
        setApiResponse((prevData) => ({
          ...prevData,
          status: apiStatusConstants.failure,
          errorMsg: data.error_msg,
        }));
      }
    };
    getProduct();
  }, []);

  const renderSuccess = () => {
    const { products } = apiResponse;
    return (
      <>
        <div className="home-header-container">
          <p>
            Bags
            <span>
              <img
                src="https://res.cloudinary.com/df5wssoz1/image/upload/v1708140096/saleAssist.ai/Ellipse_35_sn4l77.png"
                alt="Ellipse"
              />
            </span>
            Backpacks
          </p>
          <div className="product-count">
            <p>
              {products.length} products
              <span>
                <img
                  src="https://res.cloudinary.com/df5wssoz1/image/upload/v1708140431/saleAssist.ai/Vector_4_hbptzn.png"
                  alt="vector"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="product-details-container">
          {products.map((each) => (
            <div className="product-cards">
              <img src={each.image} alt={each.title} />
              <p>{each.title}</p>
              <div className="product-amount">
                <p>
                  <span>&#x20B9;</span>
                  {each.salePrice}
                </p>
                <sub>
                  <p>
                    {each.price}
                    <span>({each.discount})</span>
                  </p>
                </sub>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderLoader = () => {
    return (
      <div className="loader-container">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  };

  const renderFailure = () => {
    const { errorMsg } = apiResponse;
  };

  const renderProductDetails = () => {
    const { status } = apiResponse;

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoader();
      case apiStatusConstants.success:
        return renderSuccess();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <section className="main-container">
      <Header />
      <Bags />
      <div className="home-container">{renderProductDetails()}</div>
    </section>
  );
};

export default Home;
