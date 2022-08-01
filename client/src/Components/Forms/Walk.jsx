import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { putProvider } from "../../redux/actions/ownProvActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "./Walk.module.css";
import InContainer from "../GlobalCss/InContainer.module.css";
import Swal from "sweetalert2";

export default function Walk() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [infoProvider, setInfoProvider] = useState({
    email: user.email,
  });
  console.log("user", user);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.given_name,
      lastName: user.family_name,
      dogsPerWalk: "",
      price: "",
      description: "",
    },
    //   validationSchema:yup.object({
    //       city:yup.string().required(),
    //       state:yup.string().required(),
    //       road:yup.string().required(),
    //   }),

    onSubmit: (formData) => {
      Swal.fire({
        title: "¿Estás seguro que querés guardar los cambios?",
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("¡Los cambios fueron guardados con éxito!", "", "success");
          dispatch(putProvider(formData));
          console.log("formData", formData);
          navigate("/mi-perfil");
        } else if (result.isDenied) {
          Swal.fire("Los cambios no fueron guardados.", "", "info");
        }
      });
    },
  });

  return (
    <div>
      <NavBar />
      <div className={InContainer.container}>
      <NavLink to="/servicio">
          <img
            src="/assets/img/arrow-left.svg"
            alt=""
            className={styles.leftArrow}
          />
        </NavLink>
        <Container>
          <div className={styles.container}>
            <h2>Contanos más acerca de lo que ofrecés</h2>
            <Form onSubmit={formik.handleSubmit}>
              <div className={styles.formCont}>
                <Form.Input
                  type="number"
                  placeholder="¿Cuál es la cantidad máxima de mascotas que podés pasear?"
                  name="dogsPerWalk"
                  onChange={formik.handleChange}
                  //   error={formik.errors.city}
                ></Form.Input>
                <Form.Input
                  type="number"
                  placeholder="Indicanos un precio por hora"
                  name="price"
                  onChange={formik.handleChange}
                  //   error={formik.errors.state}
                ></Form.Input>
                <Form.Input
                  type="text"
                  placeholder="Ahora... ¡contanos por qué deberían elegirte!"
                  name="description"
                  onChange={formik.handleChange}
                  //   error={formik.errors.state}
                ></Form.Input>
                <button className="primaryButton" type="submit">
                  Confirmar
                </button>
                <div className={styles.margintop}>
                  <Link to="/mi-perfil">
                    <button className="secondaryButton">Cancelar</button>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
