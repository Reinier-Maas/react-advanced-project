import { Input } from "@chakra-ui/react";

export const TextInput = ({ onChange, ...props }) => (
  <Input placeholder="Search..." onChange={onChange} {...props} />
);
