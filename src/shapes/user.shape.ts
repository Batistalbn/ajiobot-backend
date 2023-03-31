import { hashSync } from "bcrypt";
import * as yup from "yup";

export const userShape = yup.object().shape({
  mail: yup.string().email().lowercase().required("Chave {mail} obrigatória."),
  name: yup.string().required("Chave {name} obrigatória."),
  cpf_cnpj: yup.string().required("Chave {cpf_cnpj} obrigatória."),
  phone: yup.string().required("Chave {phone} obrigatória."),
  password: yup
    .string()
    .required("Chave {password} obrigatório.")
    .transform((pw) => hashSync(pw, 8)),

  money: yup.number().default(() => 0.0),
  permission: yup.number().default(() => 1),
});

export const serializedUserShape = yup.object().shape({
  sector: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string(),
        description: yup.string(),
      })
    )
    .optional(),
  attendants: yup
    .array()
    .of(
      yup.object().shape({
        sector: yup.array().of(
          yup
            .object()
            .shape({
              id: yup.number(),
              name: yup.string(),
              description: yup.string(),
            })
            .required()
        ),
        permission: yup.number(),
        money: yup.number(),
        phone: yup.string(),
        cpf_cnpj: yup.string(),
        name: yup.string(),
        mail: yup.string(),
        id: yup.number(),
      })
    )
    .optional(),
  money: yup.number().required(),
  permission: yup.number().required(),
  phone: yup.string().required(),
  cpf_cnpj: yup.string().required(),
  name: yup.string().required(),
  mail: yup.string().required(),
  id: yup.number().required(),
});
