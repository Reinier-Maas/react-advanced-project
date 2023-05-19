import {
  Box,
  Heading,
  Text,
  Image,
  Square,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  useLoaderData,
  useParams,
  redirect,
  Link,
  useNavigate,
} from "react-router-dom";

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
  const body = JSON.stringify({ ...formData, eventId: params.eventId });
  await fetch("http://localhost:3000/events", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  return redirect(`/events/${params.eventId}`);
};

export const EventPage = () => {
  const { events, users, categories } = useLoaderData();
  const { eventId } = useParams();
  const navigate = useNavigate();

  const deleteEvent = async () => {
    if (window.confirm("Do you want to remove this event?") == true) {
      window.alert("Event is deleted");
      await fetch(`http://localhost:3000/events/${events.id}`, {
        method: "DELETE",
      });
      return navigate(`/`);
    } else window.alert("You canceled");
  };

  const displayUser = users
    .filter((user) => user.id.toString() === events.createdBy.toString())
    .map((user) => user.name);

  const displayCategory = categories
    .filter(
      (category) => category.id.toString() === events.categoryIds.toString()
    )
    .map((category) => category.name);

  console.log(displayCategory);

  return (
    <Flex flexDirection={"column"}>
      <Heading textAlign={"center"} color={"white"}>
        Event
      </Heading>
      <Box
        key={events.id === eventId}
        background={"red.500"}
        borderRadius={"10px"}
        padding={"10px"}
        margin={10}
        textAlign={"center"}
      >
        <Box borderBottom={("solid", "black", "2px")}>
          <Text
            fontSize={"1.7rem"}
            fontFamily={"heading"}
            fontWeight={"extrabold"}
            textAlign={"center"}
            color={"white"}
          >
            {events.title}
          </Text>
        </Box>
        <Box padding={2}>
          <Square justifyContent={"flex-start"}>
            <Text fontSize={"1rem"} paddingRight={2}>
              Description:
            </Text>
            <Text fontSize={"0.8rem"}>{events.description}</Text>
          </Square>

          <Square justifyContent={"flex-start"}>
            <Text fontSize={"1rem"} paddingRight={2}>
              Category:
            </Text>
            <Text fontSize={"0.8rem"}>{displayCategory}</Text>
          </Square>
        </Box>

        <Image
          src={events.image}
          width={"100%"}
          height={"500px"}
          objectFit={"cover"}
          borderRadius={"5px"}
        />
        <Square justifyContent={"space-around"}>
          <Square>
            <Text fontSize={"1.2rem"}>Starts at:</Text>
            <Box
              textAlign={"center"}
              marginTop={"10px"}
              marginLeft={"5px"}
              padding={"2px"}
              border={("solid", "black", "1px")}
            >
              <Text fontSize={"0.8rem"}>
                {events.startTime.substring(0, 10)}{" "}
                {events.startTime.substring(11, 16)}
              </Text>
              <Text fontSize={"1rem"}>untill</Text>
              <Text fontSize={"0.8rem"}>
                {events.endTime.substring(0, 10)}{" "}
                {events.endTime.substring(11, 16)}
              </Text>
            </Box>
          </Square>
          <Box>
            <Square>
              <Text paddingRight={1}>Created by:</Text>
              <Text fontSize={"0.8rem"}>{displayUser}</Text>
            </Square>
            <Square>
              <Link to={`/events/${events.id}/edit`}>
                <Button
                  color={"green.400"}
                  width={{ base: "60px", sm: "60px", md: "100px" }}
                  margin={1}
                >
                  Edit
                </Button>
              </Link>
              <Button
                color={"red.400"}
                width={{ base: "60px", sm: "60px", md: "100px" }}
                margin={1}
                onClick={deleteEvent}
              >
                Delete
              </Button>
            </Square>
          </Box>
        </Square>
      </Box>
    </Flex>
  );
};
