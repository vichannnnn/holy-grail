import { Button, HStack, Text } from "@chakra-ui/react";

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number };
  handlePageChange: (newPage: number) => void;
}

export const Pagination = ({ pageInfo, handlePageChange }: PaginationProps) => {
  return (
    <HStack spacing={4} justifyContent="center" mt="10%">
      <Button
        onClick={() => handlePageChange(pageInfo.page - 1)}
        isDisabled={pageInfo.page === 1}
      >
        Prev
      </Button>
      <Text>
        Page {pageInfo.page} of{" "}
        {Math.ceil(pageInfo.total / pageInfo.size) > 0
          ? Math.ceil(pageInfo.total / pageInfo.size)
          : 1}
      </Text>
      <Button
        onClick={() => handlePageChange(pageInfo.page + 1)}
        isDisabled={
          pageInfo.page === Math.ceil(pageInfo.total / pageInfo.size) ||
          Math.ceil(pageInfo.total / pageInfo.size) === 0
        }
      >
        Next
      </Button>
    </HStack>
  );
};
