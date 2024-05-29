import { Box, Container, Flex, Heading, Text, VStack, Link, HStack, Spacer, Button, useColorMode, useColorModeValue, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure } from "@chakra-ui/react";
import { FaTwitter, FaGithub, FaLinkedin, FaSun, FaMoon, FaTrash } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState(null);
  const cancelRef = useRef();

  const handleDelete = (post) => {
    setSelectedPost(post);
    onOpen();
  };

  const confirmDelete = () => {
    const updatedPosts = posts.filter((post) => post !== selectedPost);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    onClose();
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Box bg={bg} color={color} minH="100vh">
      {/* Navigation Bar */}
      <Box as="nav" bg={useColorModeValue("brand.800", "gray.900")} color="white" py={4}>
        <Container maxW="container.lg">
          <Flex align="center">
            <Heading as="h1" size="lg">My Blog</Heading>
            <Spacer />
            <HStack spacing={4}>
              <Link as={RouterLink} to="/" color="white">Home</Link>
              <Link as={RouterLink} to="#about" color="white">About</Link>
              <Link as={RouterLink} to="#contact" color="white">Contact</Link>
              <Button as={RouterLink} to="/add-post" colorScheme="teal" size="sm">Add Post</Button>
              <IconButton
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                isRound
                size="sm"
                onClick={toggleColorMode}
                aria-label="Toggle Dark Mode"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="xl">Welcome to My Blog</Heading>
            <Text mt={4}>This is a place where I share my thoughts and experiences. Stay tuned for more updates!</Text>
          </Box>
          <Box>
            <Heading as="h3" size="lg">Latest Posts</Heading>
            <VStack spacing={4} mt={4} align="stretch">
              {posts.map((post, index) => (
                <Box key={index} p={4} shadow="md" borderWidth="1px">
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Heading as="h4" size="md">{post.title}</Heading>
                      <Text mt={2}>{post.content}</Text>
                      <Text mt={2} fontSize="sm" color="gray.500">Tags: {post.tags.join(", ")}</Text>
                    </Box>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleDelete(post)}
                      aria-label="Delete Post"
                    />
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>

      {/* Footer */}
      <Box as="footer" bg={useColorModeValue("brand.800", "gray.900")} color="white" py={4} mt={8}>
        <Container maxW="container.lg">
          <Flex align="center" justify="space-between">
            <Text>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</Text>
            <HStack spacing={4}>
              <Link href="https://twitter.com" isExternal>
                <FaTwitter />
              </Link>
              <Link href="https://github.com" isExternal>
                <FaGithub />
              </Link>
              <Link href="https://linkedin.com" isExternal>
                <FaLinkedin />
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Index;