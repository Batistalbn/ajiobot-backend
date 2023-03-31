import { hashSync } from "bcrypt";
import * as yup from "yup";

export const attendantShape = yup.object().shape({
  mail: yup.string().email().lowercase().required("e-mail obrigatório"),
  name: yup.string().required("nome obrigatório"),
  file: yup.string().optional(),
  cpf_cnpj: yup.string().required("cpf_cnpj obrigatório"),
  phone: yup.string().required("telefone obrigatório"),
  password: yup
    .string()
    .required("senha obrigatória")
    .transform((pw) => hashSync(pw, 8)),
  money: yup.number().default(() => 0.0),
  permission: yup.number().default(() => 0),
});

export const updateAttendatShape = yup.object().shape({
  mail: yup.string().email().lowercase().optional(),
  name: yup.string().optional(),
  cpf_cnpj: yup.string().optional(),
  phone: yup.string().optional(),
  password: yup
    .string()
    .optional()
    .transform((pw) => hashSync(pw, 8)),
  sector: yup.number().optional(),

  money: yup.number().optional(),
  permission: yup.number().optional(),
});

export const addSectorOrRemoveSectorShape = yup.object().shape({
  sector: yup.number().required(),
  isAdd: yup.boolean().required(),
});

export const serializedAttendantShape = yup.object().shape({
  sector: yup.array().of(
    yup
      .object()
      .shape({
        id: yup.number(),
        name: yup.string(),
        description: yup.string(),
      })
      
  ),
  src: yup.string().nullable(true),
  permission: yup.number().required(),
  money: yup.number().required(),
  phone: yup.string().required(),
  cpf_cnpj: yup.string().required(),
  name: yup.string().required(),
  mail: yup.string().required(),
  id: yup.number().required(),
});
