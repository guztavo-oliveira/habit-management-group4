import api from "../../services/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Container, InputContainer } from "./styles";
import Button from "../../components/Button";

const Register = () => {
  const schema = yup.object().shape({
    username: yup
      .string()
      //   .email("E-mail inválido")
      .required("Utilize seu e-mail cadastrado"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    // .min(
    //   8,
    //   "A senha deve conter no mínimo 8 dígitos, entre números, letras maiúsculas e caracteres especiais (!@#$%^&*)"
    // )
    // .required()
    // .matches(/(?=.*[0-9])(?=.{8,})/, "Sem número")
    // .matches(/(?=.*[A-Z])(?=.{8,})/, "Sem letra maiúscula")
    // .matches(/(?=.*[!@#$%^&*])(?=.{8,})/, "Sem caractere especial"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não conferem"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmitForm = (data) => {
    api
      .post("/users/", data)
      .then((response) => {
        console.log(response.data);
        history.push("/login");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Container>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <h2>Registrar</h2>
          <TextField
            id="outlined-basic"
            label="Nome"
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
            label="E-mail"
            variant="outlined"
            sx={{ marginTop: 10 }}
            fullWidth
            name="email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
            sx={{ marginTop: 3 }}
            fullWidth
            name="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />
          <TextField
            id="outlined-basic"
            label="Confirmar senha"
            variant="outlined"
            sx={{ marginTop: 3 }}
            fullWidth
            name="passwordConfirm"
            {...register("passwordConfirm")}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            type="password"
          />
          <Button>Registrar</Button>
          <p>Já tem conta?</p>
          <Link to="/login">Entrar</Link>
        </form>
      </InputContainer>
    </Container>
  );
};

export default Register;
