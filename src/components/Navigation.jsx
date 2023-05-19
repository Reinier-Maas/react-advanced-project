import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex
      background={"red.500"}
      justifyItems={"flex-start"}
      justifyContent={"space-around"}
      boxShadow={"lg"}
      marginBottom={5}
    >
      <Box
        _hover={{ bg: "red.400" }}
        padding={2}
        width={"50%"}
        textAlign={"center"}
        borderRadius={5}
      >
        <Link to="/">
          <Text color={"white"} fontSize={"2xl"}>
            Events
          </Text>
        </Link>
      </Box>
      <Box
        _hover={{ bg: "red.400" }}
        padding={2}
        width={"50%"}
        textAlign={"center"}
        borderRadius={5}
      >
        <Link to="/events/new">
          <Text color={"white"} fontSize={"2xl"}>
            Add New Event
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};
