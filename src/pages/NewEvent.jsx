import {
  Box,
  Text,
  Heading,
  Input,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const users = await fetch("http://localhost:3000/users");
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newEvent = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/events/${newEvent}`);
};

export const NewEvent = () => {
  const { users, categories } = useLoaderData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Empty fields.
    setTitle("");
    setDescription("");
    setImage("");
    setStartTime("");
    setEndTime("");

    window.alert("Succesfully posted new event");
  };

  return (
    <Flex
      padding={10}
      flexDirection={"column"}
      textAlign={"center"}
      alignItems={"center"}
      onSubmit={handleSubmit}
    >
      <Heading color={"white"}>New Event</Heading>
      <Box
        background={"gray.200"}
        width={"400px"}
        borderRadius={"10px"}
        paddingTop={2}
        margin={2}
      >
        <Form method="post">
          <Text>User:</Text>
          <Select
            name="createdBy"
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
            placeholder="title"
            background={"white.100"}
            width={"350px"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Text>Description:</Text>
          <Input
            name="description"
            type="text"
            placeholder="description"
            background={"white.100"}
            width={"350px"}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Text>Image Url:</Text>
          <Input
            name="image"
            type="text"
            placeholder="example: https://image.com/image"
            background={"white.100"}
            width={"350px"}
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
          <Text>Category:</Text>

          <Select
            name="categoryIds"
            background={"white.100"}
            width={"350px"}
            textAlign={"center"}
            marginLeft={6}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Text>Starting Time:</Text>
          <Input
            name="startTime"
            type="datetime-local"
            placeholder="start time"
            background={"white.100"}
            width={"350px"}
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />

          <Text>End Time:</Text>
          <Input
            name="endTime"
            type="datetime-local"
            placeholder="end time"
            background={"white.100"}
            width={"350px"}
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />

          <Button type="submit" background={"green.300"} padding={4} margin={4}>
            Add event
          </Button>
        </Form>
      </Box>
    </Flex>
  );
};

/*

<Select
            name="categoryIds"
            background={"white.100"}
            width={"350px"}
            textAlign={"center"}
            marginLeft={6}
          >
            {categories.map((category) => (
              <option key={category.id} value={[category.id]}>
                {category.name}
              </option>
            ))}
          </Select>

          */

/*

           <Menu name="categoryIds">
            <MenuButton
              as={Button}
              width={"350px"}
              background={"white"}
              _hover={{ bg: "white" }}
            >
              Categories
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type="checkbox">
                <MenuItemOption value={"1"}>Sport</MenuItemOption>
                <MenuItemOption value={"2"}>Games</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          */

/*

          <CheckboxGroup>
            <Checkbox
              background={"white"}
              padding={1}
              name="categoryIds"
              value={"1"}
            >
              Sports
            </Checkbox>
            <Checkbox background={"white"} padding={1} name="categoryIds" value={"2"}>
              Games
            </Checkbox>
          </CheckboxGroup>

          */

/*

            <Select
            name="categoryIds"
            background={"white.100"}
            width={"350px"}
            textAlign={"center"}
            marginLeft={6}
            value={[" ", " "]}
          >
            <option value={1}>Sports</option>
            <option value={2}>Games</option>
          </Select>

          */
