import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Text,
  Box,
} from "@chakra-ui/react";
import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const action = async ({ request, params }) => {
  const formData = Object.fromEntries(await request.formData());
  const editedEvent = await fetch(
    `http://localhost:3000/events/${params.eventId}`,
    {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/events/${editedEvent}`);
};

export const EditEvent = () => {
  const { events, categories, users } = useLoaderData();

  return (
    <Flex
      padding={10}
      flexDirection={"column"}
      textAlign={"center"}
      alignItems={"center"}
    >
      <Heading color={"white"}>Edit Event</Heading>
      <Box
        background={"gray.200"}
        width={"400px"}
        borderRadius={"10px"}
        paddingTop={2}
        margin={2}
      >
        <Form method="put" key={events.id}>
          <Select
            name="createdBy"
            defaultValue={events.createdBy}
            background={"white.100"}
            width={"350px"}
            textAlign={"center"}
            marginLeft={6}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Text>Title:</Text>
          <Input
            name="title"
            type="text"
            defaultValue={events.title}
            background={"white.100"}
            width={"350px"}
          />
          <Text>Description:</Text>
          <Input
            name="description"
            type="text"
            defaultValue={events.description}
            background={"white.100"}
            width={"350px"}
          />
          <Text>Image Url:</Text>
          <Input
            name="image"
            type="text"
            defaultValue={events.image}
            background={"white.100"}
            width={"350px"}
          />
          <Text>Category:</Text>
          <Select
            name="categoryIds"
            defaultValue={events.categoryIds}
            background={"white.100"}
            width={"350px"}
            textAlign={"center"}
            marginLeft={6}
          >
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </Select>
          <Text>Starting Time:</Text>
          <Input
            name="startTime"
            type="datetime-local"
            defaultValue={events.startTime}
            background={"white.100"}
            width={"350px"}
          />
          <Text>End Time:</Text>
          <Input
            name="endTime"
            type="datetime-local"
            defaultValue={events.endTime}
            background={"white.100"}
            width={"350px"}
          />
          <Button type="submit" background={"green.300"} padding={4} margin={4}>
            Edit event
          </Button>
        </Form>
      </Box>
    </Flex>
  );
};
