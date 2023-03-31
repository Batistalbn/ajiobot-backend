import * as yup from "yup";

const loginShape = yup.object().shape({
  mail: yup.string().email().required("e-mail obrigatório").lowercase(),
  password: yup.string().required("senha obrigatória"),
});

export default loginShape;
