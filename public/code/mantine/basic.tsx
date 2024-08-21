"use client";

import { Button, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";

export default function Demo() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", email: "" },
    validate: {
      name: hasLength({ min: 3 }, "Must be at least 3 characters"),
      email: isEmail("Invalid email"),
    },
  });

  const handleSubmit = (
    values: typeof form.values,
    event: React.FormEvent | undefined,
  ) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    fetch("https://buttondown.com/api/emails/embed-subscribe/{username}", {
      method: "POST",
      body: data,
    }).then((response) => console.log(response));
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        {...form.getInputProps("name")}
        key={form.key("name")}
        label="Name"
        placeholder="Name"
      />
      <TextInput
        {...form.getInputProps("email")}
        key={form.key("email")}
        mt="md"
        label="Email"
        placeholder="Email"
      />
      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
}
