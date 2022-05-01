import * as C from "./Login.styles";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FormikHelpers, useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import { loginDTO } from "../../model/LoginDTO";
const Login = () => {
  const { setIsLogged, handleLogin } = useContext<any>(AuthContext);

  const [pass, setPass] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const formikProps = useFormik({
    initialValues: {
      usuario: "admin@dbccompany.com.br",
      senha: "String@123",
    },
    validationSchema: Yup.object().shape({
      usuario: Yup.string().required("Preencha o campo de usuario!"),
      senha: Yup.string().required("Preencha o campo de senha!"),
    }),
    onSubmit: async (
      values: loginDTO,
      { setSubmitting }: FormikHelpers<loginDTO>
    ) => {
      handleLogin(formikProps.values);
    },
  });

  return (
    <C.ContainerLogin>
      <C.ContainerForm onSubmit={formikProps.handleSubmit}>
        <C.DivLogo>
          <C.TitleLogin>Login VemCV</C.TitleLogin>
        </C.DivLogo>
        <C.DivForm>
          <C.Label htmlFor="usuario">Usuario</C.Label>
          <C.Input
            name="usuario"
            id="usuario"
            placeholder="Digite seu usuario"
            value={formikProps.values.usuario}
            onChange={formikProps.handleChange}
          />
          {formikProps.errors.usuario && formikProps.touched.usuario ? (
            <C.Error>{formikProps.errors.usuario}</C.Error>
          ) : null}
        </C.DivForm>
        <C.DivForm>
          <C.Label htmlFor="senha">Senha</C.Label>
          <C.Input
            type={pass ? "password" : "text"}
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            value={formikProps.values.senha}
            onChange={formikProps.handleChange}
          />
          <C.TrocarSenha onClick={() => setPass(!pass)}>
            {pass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </C.TrocarSenha>
          {formikProps.errors.senha && formikProps.touched.senha ? (
            <C.Error>{formikProps.errors.senha}</C.Error>
          ) : null}
        </C.DivForm>
        <C.Botao type="submit">Login</C.Botao>
      </C.ContainerForm>
    </C.ContainerLogin>
  );
};

export default Login;
