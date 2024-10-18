import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormularioPerfil.css";

const FormularioPerfil = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Debe ser un correo electrónico válido"),
    // No es necesario validar el archivo con Yup, ya que se maneja directamente
  });

  // Función para manejar el archivo seleccionado
  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file)); // Previsualización de la imagen
    setFieldValue("profileImage", file); // Almacenar el archivo en el estado de Formik
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (values) => {
    console.log("Formulario enviado:", values);
    // Aquí puedes hacer lo que necesites para enviar la imagen al servidor
    console.log("Archivo de imagen:", values.profileImage);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", profileImage: null }} // Agregar profileImage a los valores iniciales
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form id="formulario-editar-perfil">
          {/* Campo para cargar la imagen */}
          <div className="container-form-foto">
            <label htmlFor="profileImage">Cambiar Foto</label>
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              onChange={(event) => handleFileChange(event, setFieldValue)}
              accept="image/*"
            />
            {selectedImage && (
              <div className="container-foto-editar">
                <img
                  src={selectedImage}
                  alt="Previsualización de la imagen"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </div>
          <div className="container-dato">
            <label htmlFor="name">Nombre</label>
            <Field type="text" id="name" name="name" className="input-editar-perfil" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div className="container-dato">
            <label htmlFor="description">Descripción</label>
            <Field as="textarea" id="description" name="description" className="input-editar-perfil"/>
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: "red" }}
            />
          </div>
            <button className="cambiar-emojis-btn">Cambiar Emojis</button>
          <button type="submit" className="guardar-cambios-btn">Guardar cambios</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioPerfil;
