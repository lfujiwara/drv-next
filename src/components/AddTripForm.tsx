import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import React from "react";
import NumberFormat from "react-number-format";
import * as Yup from "yup";
import SelectCustomer from "./SelectCustomer";

export interface AddTripFormValues {
  customer?: { id: number; name: string; phoneNumber: string };
  date?: string;
  origin?: string;
  destination?: string;
  fare?: number;
  distance?: number;
  obs?: string;
}

const AddCustomerFormSchema = Yup.object().shape({
  customer: Yup.object().shape({
    id: Yup.number().integer().required("Selecione um cliente"),
  }),
  date: Yup.date(),
  origin: Yup.string()
    .min(1, "Origem deve ter entre 1 e 128 caracteres")
    .max(128, "Origem deve ter entre 1 e 128 caracteres")
    .required("Origem é obrigatória"),
  destination: Yup.string()
    .min(1, "Destino deve ter entre 1 e 128 caracteres")
    .max(128, "Destino deve ter entre 1 e 128 caracteres")
    .required("Destino é obrigatória"),
  fare: Yup.number().positive().required("Tarifa é obrigatória"),
  distance: Yup.number().positive().required("Distância é obrigatória"),
  obs: Yup.string().max(128, "Observação deve ter até 128 caracteres"),
});

function AddTripInnerForm({
  getFieldProps,
  errors,
  isValidating,
  isSubmitting,
  isValid,
  handleChange,
  touched,
  values,
}: FormikProps<AddTripFormValues>) {
  const makeHandleChange =
    (name: string) =>
    ({ floatValue: value }: { floatValue: number }) =>
      handleChange({
        type: "change",
        target: { name, value },
      });

  const buildProps = (id: keyof AddTripFormValues) => ({
    isDisabled: isSubmitting,
    isInvalid: !!errors[id] && touched[id],
    ...getFieldProps(id),
    id,
    mb: 2,
  });

  return (
    <Form>
      <Box>
        <FormLabel>Cliente</FormLabel>
        <SelectCustomer
          value={values.customer}
          onChange={(value) =>
            handleChange({
              type: "change",
              target: { name: "customer", value },
            })
          }
          flexProps={{ mb: 2 }}
        />
        <Text color="red.400" fontSize="sm">
          {!!touched.customer && errors.customer}
        </Text>
      </Box>
      <FormControl {...buildProps("date")}>
        <FormLabel>Data</FormLabel>
        <Input type="datetime-local" />
        <FormErrorMessage>{errors.date}</FormErrorMessage>
      </FormControl>
      <FormControl {...buildProps("origin")}>
        <FormLabel>Origem</FormLabel>
        <Input />
        <FormErrorMessage>{errors.origin}</FormErrorMessage>
      </FormControl>
      <FormControl {...buildProps("destination")}>
        <FormLabel>Destino</FormLabel>
        <Input />
        <FormErrorMessage>{errors.destination}</FormErrorMessage>
      </FormControl>
      <FormControl {...buildProps("fare")} onChange={undefined}>
        <FormLabel>Tarifa</FormLabel>
        <Input
          as={NumberFormat}
          onValueChange={makeHandleChange("fare")}
          prefix="R$ "
          decimalScale={2}
        />
        <FormErrorMessage>{errors.fare}</FormErrorMessage>
      </FormControl>
      <FormControl {...buildProps("distance")} onChange={undefined}>
        <FormLabel>Distância</FormLabel>
        <Input
          as={NumberFormat}
          onValueChange={makeHandleChange("distance")}
          suffix=" Km"
          decimalScale={2}
        />
        <FormErrorMessage>{errors.distance}</FormErrorMessage>
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

export const AddTripForm = withFormik<
  {
    initial?: Partial<AddTripFormValues>;
    onSubmit?: (values: AddTripFormValues) => any | Promise<any>;
  },
  AddTripFormValues
>({
  mapPropsToValues: ({ initial }) => ({ ...initial }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    if (props.onSubmit) {
      await props.onSubmit(values);
    }

    setSubmitting(false);
  },
  validate: async (values) => {
    const err: FormikErrors<AddTripFormValues> = {};

    const yupErr = await AddCustomerFormSchema.validate(values, {
      recursive: true,
      abortEarly: false,
    })
      .then(() => ({}))
      .catch(({ inner }) =>
        inner.reduce(
          (
            acc: FormikErrors<AddTripFormValues>,
            curr: { path: keyof AddTripFormValues; message: string }
          ) => {
            acc[curr.path.split(".")[0] as keyof AddTripFormValues] =
              curr.message;
            return acc;
          },
          {}
        )
      );

    return { ...yupErr, ...err };
  },
})(AddTripInnerForm);
