import * as yup from "yup";

const phoneRegExp = /^\d{13}$/;

export const ChatCreateShape = yup.object().shape({
  custumerPhone: yup
    .string()
    .matches(phoneRegExp, "custumerPhone invalido")
    .required("custumerPhone obrigatório")
    .lowercase(),
});

export const ChatUpdateShape = yup.object().shape({
  concluded: yup.boolean(),
  active: yup.boolean(),
  attendant: yup.number(),
  sector: yup.number(),
});
