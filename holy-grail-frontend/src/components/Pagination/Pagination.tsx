import { Button, HStack, Text } from "@chakra-ui/react";

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
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
        Page {pageInfo.page} of {pageInfo.pages > 0 ? pageInfo.pages : 1}
      </Text>
      <Button
        onClick={() => handlePageChange(pageInfo.page + 1)}
        isDisabled={pageInfo.page === pageInfo.pages || pageInfo.pages === 0}
      >
        Next
      </Button>
    </HStack>
  );
};
