import { useLoaderData } from "react-router-dom";
import { EventItems } from "../components/EventItems";
import { useState } from "react";
import { TextInput } from "../components/ui/TextInput";
import { Box, Center, Heading } from "@chakra-ui/react";

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

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  const [searchField, setSearchField] = useState("");

  const matchedEvents = events.filter((event) => {
    const searchQuery = searchField.toLowerCase();
    const eventTitle = event.title.toLowerCase();

    const categoriesBySearchQuery = categories
      .filter((category) => category.name.toLowerCase().includes(searchQuery))
      .map((category) => category.id);

    if (eventTitle.includes(searchQuery)) {
      return true;
    }

    return categoriesBySearchQuery.some((value) =>
      event.categoryIds.includes(value)
    );
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Center>
        <Box>
          <Heading color={"white"}>List of events</Heading>

          <TextInput
            onChange={handleChange}
            w={{ base: 180, sm: 185, md: 220 }}
            mb={8}
            background="white.100"
          />
        </Box>
      </Center>
      <EventItems events={matchedEvents} />
    </>
  );
};
