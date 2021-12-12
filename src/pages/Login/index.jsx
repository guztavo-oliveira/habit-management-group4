import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Container, InputContainer, Bar, RegisterLogo } from "./styles";
import Button from "../../components/Button";

import { useLayoutEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import api from "../../services/api";
import { useAuth } from "../../providers/AuthContext";

const Login = () => {
  const history = useHistory();
  const { atualizarToken } = useAuth();
  const schema = yup.object().shape({
    username: yup
      .string()
      //   .email("E-mail inválido")
      .required("Utilize seu e-mail cadastrado"),
    password: yup.string().required("Campo obrigatório"),
    // .min(
    //   8,
    //   "A senha deve conter no mínimo 8 dígitos, entre números, letras maiúsculas e caracteres especiais (!@#$%^&*)"
    // )
    // .required()
    // .matches(/(?=.*[0-9])(?=.{8,})/, "Sem número")
    // .matches(/(?=.*[A-Z])(?=.{8,})/, "Sem letra maiúscula")
    // .matches(/(?=.*[!@#$%^&*])(?=.{8,})/, "Sem caractere especial"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addData = (response) => {
    const { access } = response.data;

    const { user_id } = jwt_decode(access);

    localStorage.setItem("@gestaodehabitos:id", user_id);
    localStorage.setItem("@gestaodehabitos:access", access);
    atualizarToken();
    history.push("/dashboard");
  };

  const handleSignIn = (data) => {
    api
      .post("/sessions/", data)
      .then((response) => {
        addData(response);
        console.log("success");
      })
      .catch((err) => console.log("invalid data"));
  };

  return (
    <>
      <Bar />
      <RegisterLogo />
      <Container>
        <InputContainer>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <h2>Login</h2>
            <TextField
              id="outlined-basic"
              label="Login"
              // type="email"
              variant="outlined"
              sx={{ marginTop: 5 }}
              fullWidth
              helperText={errors.username?.message}
              {...register("username")}
              error={!!errors.username}
            />
            <TextField
              id="outlined-basic"
              label="Senha"
              variant="outlined"
              sx={{ marginTop: 3 }}
              fullWidth
              helperText={errors.password?.message}
              {...register("password")}
              error={!!errors.password}
              type="password"
            />
            <Button>Entrar</Button>
            <p>Ainda não tem conta?</p>
            <Link to="/signup">Cadastre-se</Link>
          </form>
        </InputContainer>
      </Container>
    </>
  );
};

export default Login;
