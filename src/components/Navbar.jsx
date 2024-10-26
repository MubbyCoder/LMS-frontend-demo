import { Flex, Box, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logoIcon from "./../assets/logoIcon.png";
// import profileIcon from "./../assets/profileIcon.png";
const Nav = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Flex
      fontFamily={"IBM Plex Sans"}
      justifyContent={"space-between"}
      p={4}
      bg={"#FFF"}
      boxShadow={"sm"}
      paddingX={{ base: 8, md: 20 }}
    >
      <Flex alignItems={"center"}>
        <Image src={logoIcon} alt="logo" boxSize="30px" mr={"5px"} />
        <Text fontSize={{ base: "16px", md: "24px" }} fontWeight={600}>
          <Link to="/">LMS</Link>
        </Text>
      </Flex>
      {isAuthenticated ? (
        <Flex alignItems={"center"} gap={4}>
          {/* <Box mr={6}>
            <Button
              borderColor="primary.500"
              color={"primary.500"}
              variant="outline"
            >
              <Link to={"/create"}>Create New</Link>
            </Button>
          </Box> */}
          <Flex alignItems={"center"} mr={{ base: 2, md: 6 }}>
            {/* <Image src={profileIcon} alt="profile" boxSize="20px" /> */}
            <Text
              ml={1}
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight={600}
            >
              <Link to={"/collections"}>Collections</Link>
            </Text>
          </Flex>
          <Flex alignItems={"center"} mr={{ base: 0, md: 6 }}>
            {/* <Image src={profileIcon} alt="profile" boxSize="20px" /> */}
            <Text
              ml={1}
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight={600}
            >
              <Link to={"/profile"}>Profile</Link>
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex alignItems={"center"} gap={4}>
          <Box mr={{ base: 2, md: 6 }}>
            <Button
              borderColor="primary.500"
              color={"primary.500"}
              variant="outline"
            >
              <Link to={"/Login"}>Login</Link>
            </Button>
          </Box>
          <Flex alignItems={"center"}>
            {/* <Image src={profileIcon} alt="profile" boxSize="20px" /> */}
            <Text
              ml={1}
              fontSize={{ base: "12px", md: "16px" }}
              fontWeight={600}
            >
              <Link to={"/register"}>Register</Link>
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Nav;