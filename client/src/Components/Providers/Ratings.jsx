import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../Providers/ProvidersCard.module.css";
import styles from "./Ratings.module.css";
import InContainer from "../GlobalCss/InContainer.module.css";
import NavBar from "../NavBar/NavBarShop";
import { Container } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import { NavLink } from "react-router-dom";

const Ratings = () => {
  const { user, isAuthenticated } = useAuth0();
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState(0);
  const [quantityReviews, setquantityReviews] = useState(0);
  useEffect(() => {
    if (isAuthenticated) {
      axios.get("https://proyecto-grupal.herokuapp.com/reviews").then((x) => {
        let myreviews = x.data.filter((x) => x.provider.email === user.email);

        if (myreviews.length) {
          setReviews(myreviews);
          myreviews = myreviews.map((x) => x.review);
          let numberEvaluations = myreviews.length;
          myreviews = myreviews.reduce((x, y) => x + y, 0);
          setStars(myreviews / numberEvaluations);
          setquantityReviews(numberEvaluations);
        }
      });
    }
  }, [isAuthenticated]);
  return (
    <div>
      <NavBar />
      <div className={style.container}>
        <div className={styles.container}>
          <div className={InContainer.container}>
            <NavLink to="/mi-perfil">
              <img
                src="/assets/img/arrow-left.svg"
                alt=""
                className={styles.leftArrow}
              />
            </NavLink>
            <Container>
              <div className={style.centerFlex}>
                <h2 style={{ display: "inline" }}>Mi calificación general: </h2>
                <div style={{ display: "inline" }}>
                  <p className={style.star}>{stars >= 1 ? "★" : "☆"}</p>
                  <p className={style.star}>{stars >= 2 ? "★" : "☆"}</p>
                  <p className={style.star}>{stars >= 3 ? "★" : "☆"}</p>
                  <p className={style.star}>{stars >= 4 ? "★" : "☆"}</p>
                  <p className={style.star}>{stars === 5 ? "★" : "☆"}</p>
                </div>
                <h3 style={{ display: "inline" }}> ({quantityReviews})</h3>
                <br />
                <br />
                <div style={{ marginBottom: 30 }}>
                  {reviews && reviews.length
                    ? reviews.map((x, y) => {
                        return (
                          <div key={y}>
                            <hr />
                            <div>
                              <p className={style.star}>
                                {x.review >= 1 ? "★" : "☆"}
                              </p>
                              <p className={style.star}>
                                {x.review >= 2 ? "★" : "☆"}
                              </p>
                              <p className={style.star}>
                                {x.review >= 3 ? "★" : "☆"}
                              </p>
                              <p className={style.star}>
                                {x.review >= 4 ? "★" : "☆"}
                              </p>
                              <p className={style.star}>
                                {x.review === 5 ? "★" : "☆"}
                              </p>
                            </div>
                            <h4 style={{ display: "inline" }}>
                              {x.owner.name} {x.owner.lastName}:
                            </h4>
                            <p style={{ display: "inline", color: "blue" }}>
                              {" "}
                              {x.message}
                            </p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ratings;
