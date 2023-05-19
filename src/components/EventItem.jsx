import { Text, Box, Image, Square } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";

export const EventItem = ({ event }) => {
  const { categories } = useLoaderData();

  const displayCategory = categories
    .filter(
      (category) => category.id.toString() === event.categoryIds.toString()
    )
    .map((category) => category.name);

  return (
    <>
      <Box
        key={event.id}
        background={"red.500"}
        maxWidth={{ base: "100%", sm: "100%", md: "450px", lg: "350px" }}
        width="100%"
        height="100%"
        padding={"10px"}
        margin={1}
        borderRadius={"10px"}
        flexDirection={"column"}
      >
        <Link to={`events/${event.id}`}>
          <Box borderBottom={"2px"} borderColor={"white"}>
            <Text
              fontSize={"1.7rem"}
              fontFamily={"heading"}
              fontWeight={"extrabold"}
              textAlign={"center"}
              color={"white"}
            >
              {event.title}
            </Text>
          </Box>
          <Box padding={2}>
            <Square justifyContent={"flex-start"}>
              <Text fontSize={"1rem"} paddingRight={2}>
                Description:
              </Text>
              <Text fontSize={"0.8rem"}>{event.description}</Text>
            </Square>

            <Square justifyContent={"flex-start"}>
              <Text fontSize={"1rem"} paddingRight={2}>
                Category:
              </Text>
              <Text fontSize={"0.8rem"}>{displayCategory}</Text>
            </Square>
          </Box>
          <Image
            src={event.image}
            width={"100%"}
            height={"250px"}
            objectFit={"cover"}
            borderRadius={"5px"}
          />
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
                {event.startTime.substring(0, 10)}{" "}
                {event.startTime.substring(11, 16)}
              </Text>
              <Text fontSize={"1rem"}>untill</Text>
              <Text fontSize={"0.8rem"}>
                {event.endTime.substring(0, 10)}{" "}
                {event.endTime.substring(11, 16)}
              </Text>
            </Box>
          </Square>
        </Link>
      </Box>
    </>
  );
};
