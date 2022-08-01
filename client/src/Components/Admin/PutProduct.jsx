import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import { putProduct } from "../../redux/actions/petshopActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { Widget } from "@uploadcare/react-widget";
import { getProducts } from "../../redux/actions/petshopActions";
import Swal from "sweetalert2";
import style from "./AdminDashboard.module.css";

export default function PutProduct(){

    const navigate = useNavigate()

    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getProducts())
    }, [])

    const selectedProduct = useSelector(state => state.selectedProduct)
    const allProducts = useSelector(state => state.products)
    const product = allProducts.find(prod => prod.id === selectedProduct)

    const formik = useFormik({
      initialValues: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        profilePicture: product.profilePicture,
        targetAnimal: product.targetAnimal,
        tradeMark: product.tradeMark,
        weight: product.weight,
        isActive: product.isActive
      },
      onSubmit: (formData) => {
        console.log("formData", formData);

        Swal.fire({
          title: '¿Estás seguro que querés modificar esta publicación?',
          showDenyButton: true,
          denyButtonText: `Cancelar`,
          confirmButtonText: 'Modificar'
        }).then(async(result) => {
          if (result.isConfirmed) {
            Swal.fire('¡La publicación fue modificada!', '', 'success')
            dispatch(putProduct(product.id,formData));
            navigate('/admin/listado-productos')
          } else if (result.isDenied) {
            Swal.fire('La publicación no fue modificada.', '', 'info')
          }
        })
      },
    });

    function backToTheList(){
      navigate('/admin/listado-productos')
    }
    
    const categoriesOptions = [
      { key: "alimento", value: "alimento", text: "alimento" }, { key: "accesorios", value: "accesorios", text: "accesorios" }, { key: "salud y bienestar", value: "salud y bienestar", text: "salud y bienestar" }
    ];

    const targetAnimalOptions = [
      { key: "perro", value: "perro", text: "perro" }, { key: "gato", value: "gato", text: "gato" }, { key: "tortuga", value: "tortuga", text: "tortuga" }, { key: "conejo", value: "conejo", text: "conejo" },{ key: "pez", value: "pez", text: "pez" },{ key: "hamster", value: "hamster", text: "hamster" },{ key: "pajaro", value: "pajaro", text: "pajaro" },{ key: "otro", value: "otro", text: "otro" }
    ];

    const tradeMarkOptions = [
      { key: "pro plan", value: "pro plan", text: "pro plan" }, { key: "pedigree", value: "pedigree", text: "pedigree" }, { key: "vital can", value: "vital can", text: "vital Can" }, { key: "eukanuba", value: "eukanuba", text: "eukanuba" }
    ];

    return (
      <div>
        <NavBar />
        <Container>
          <div className={style.put}>
            <h2>Modificar producto</h2>

            <Form onSubmit={formik.handleSubmit}>
              <div >
                <h5>Producto: {product.name}</h5>
                <Form.Input
                  type="string"
                  placeholder="Nombre del producto"
                  name="name"
                  onChange={formik.handleChange}
                ></Form.Input>
                
                <h5>Categoría: {product.category}</h5>
                  <Form.Dropdown
                  placeholder="Categoría"
                  options={categoriesOptions}
                  onChange={(e) => {
                    e.target.value = e.target.firstChild.textContent
                    e.target.name = "category"
                    formik.handleChange(e)
                  }}
                  selection={true}
                ></Form.Dropdown>    

                <h5>Precio: {product.price} </h5>
                <Form.Input
                  type="number"
                  placeholder="Precio"
                  name="price"
                  onChange={formik.handleChange}

                ></Form.Input>

              <h5>Stock disponible: {product.stock}</h5>
                <Form.Input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  onChange={formik.handleChange}
                ></Form.Input>

              <h5>Mascota (a la que está destinada el producto):{product.targetAnimal}</h5>
                  <Form.Dropdown
                  placeholder="Animal"
                  options={targetAnimalOptions}
                  onChange={(e) => {
                    e.target.value = e.target.firstChild.textContent
                    e.target.name = "targetAnimal"
                    formik.handleChange(e)
                  }}
                  selection={true}
                ></Form.Dropdown>                      

              <h5>Descripción: {product.description}</h5>
                <Form.Input
                  type="text"
                  placeholder="Descripción"
                  name="description"
                  onChange={formik.handleChange}
                ></Form.Input>

              <h5>Peso (para alimentos): {product.weight}</h5>
                <Form.Input
                  type="number"
                  placeholder="Peso (para alimentos)"
                  name="weight"
                  onChange={formik.handleChange}
                ></Form.Input>

              <h5>Marca: {product.tradeMark}</h5>
                <Form.Dropdown
                  placeholder="Marca"
                  options={tradeMarkOptions}
                  onChange={(e) => {
                    e.target.value = e.target.firstChild.textContent
                    e.target.name = "tradeMark"
                    formik.handleChange(e)
                  }}
                  selection={true}
                ></Form.Dropdown>                      


                <Button onClick={backToTheList}>Volver al listado</Button>
                <Button type="submit">Confirmar cambios</Button>
              </div>
            </Form>
          </div>
        </Container>
        <Footer />
      </div>
    );
}