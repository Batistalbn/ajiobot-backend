import * as yup from "yup";

const phoneRegExp = /^\d{13}$/;

export const MessageShape = yup.object().shape({
  type: yup.string().required("type obrigatória"),
  text: yup.string().required("text obrigatória"),
  destination: yup.string().required("destination obrigatória"),
  sender: yup.string().required("sender obrigatória"),
  from: yup.string().required("from obrigatória"),
  chat: yup.number(),
  customer: yup.number().required("customer obrigatória"),
  is_customer_message: yup
    .boolean()
    .required("is_customer_message obrigatória"),
  date_time: yup.date().default(new Date(Date.now())),
  phone: yup
    .string()
    .matches(phoneRegExp, "phone invalido")
    .required("phone obrigatória"),
});
