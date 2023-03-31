import { hashSync } from "bcrypt";
import * as yup from "yup";

const updateUserShape = yup.object().shape({
  mail: yup.string().email().lowercase().optional(),
  name: yup.string().optional(),
  cpf_cnpj: yup.string().optional(),
  phone: yup.string().optional(),
  password: yup
    .string()
    .optional()
    .transform((pw) => hashSync(pw, 8)),

  money: yup.number().optional(),
  permission: yup.number().optional(),
});

export default updateUserShape;
