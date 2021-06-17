import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import React from "react";
import NumberFormat from "react-number-format";
import * as Yup from "yup";

interface AddCustomerFormValues {
  name?: string;
  phoneNumber?: string;
}

const AddCustomerFormSchema = Yup.object().shape({
  name: Yup.string()
    .transform((s: string) => s.trim())
    .min(1, "Nome deve ter entre 1 e 128 caracteres")
    .max(128, "Nome deve ter entre 1 e 128 caracteres")
    .required("Nome é obrigatório"),
  phoneNumber: Yup.string()
    .matches(
      /^\+55 \([1-9][1-9]\) 9?[1-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/,
      "Insira um telefone brasileiro válido."
    )
    .required("Telefone é obrigatório"),
});

function AddCustomerInnerForm({
  getFieldProps,
  errors,
  isValidating,
  isSubmitting,
  isValid,
}: FormikProps<AddCustomerFormValues>) {
  return (
    <Form>
      <FormControl
        isDisabled={isSubmitting}
        isInvalid={!!errors.name}
        {...getFieldProps("name")}
        id="name"
        mb="2"
      >
        <FormLabel>Nome</FormLabel>
        <Input />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl
        isDisabled={isSubmitting}
        isInvalid={!!errors.phoneNumber}
        {...getFieldProps("phoneNumber")}
        id="phoneNumber"
        mb="2"
      >
        <FormLabel>Telefone (WhatsApp)</FormLabel>
        <Input format="+55 (##) #####-####" mask="_" as={NumberFormat} />
        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
      </FormControl>
      <Flex justify="flex-end" mt="4">
        <Button
          colorScheme="teal"
          isLoading={isValidating || isSubmitting}
          disabled={!isValid}
          type="submit"
        >
          Enviar
        </Button>
      </Flex>
    </Form>
  );
}

export const AddCustomerForm = withFormik<
  {
    initial?: Partial<AddCustomerFormValues>;
    verifyPhoneNumber?: (phoneNumber?: string) => Promise<boolean>;
    onSubmit?: (values: AddCustomerFormValues) => any | Promise<any>;
  },
  AddCustomerFormValues
>({
  mapPropsToValues: ({ initial }) => ({
    name: initial?.name || "",
    phoneNumber: initial?.phoneNumber || "",
  }),
  handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
    if (props.onSubmit) await props.onSubmit(values);

    resetForm();
    setSubmitting(false);
  },
  validate: async (values, { verifyPhoneNumber }) => {
    const err: FormikErrors<AddCustomerFormValues> = {};

    if (verifyPhoneNumber && !(await verifyPhoneNumber(values.phoneNumber)))
      err.phoneNumber = "Telefone já cadastrado";

    const yupErr = await AddCustomerFormSchema.validate(values, {
      abortEarly: false,
    })
      .then(() => ({}))
      .catch(({ inner }) =>
        inner.reduce(
          (
            acc: FormikErrors<AddCustomerFormValues>,
            curr: { path: keyof AddCustomerFormValues; message: string }
          ) => {
            acc[curr.path] = curr.message;
            return acc;
          },
          {}
        )
      );

    return { ...yupErr, ...err };
  },
})(AddCustomerInnerForm);
