import { Center, SimpleGrid } from "@chakra-ui/react";
import { EventItem } from "./EventItem";

export const EventItems = ({ events }) => {
  return (
    <Center h="100%" minHeight="100vh" flexDir="column">
      <SimpleGrid minChildWidth={250} spacing={10} width="100%" padding={10}>
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Center>
  );
};
