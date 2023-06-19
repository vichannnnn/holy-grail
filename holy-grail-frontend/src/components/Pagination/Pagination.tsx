import { Button, HStack, Text } from "@chakra-ui/react";
import debounce from "lodash/debounce";

interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  styles?: { mt: string };
}

export const Pagination = ({
  pageInfo,
  handlePageChange,
  styles,
}: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);

  return (
    <HStack
      spacing={4}
      justifyContent="center"
      mt={styles?.mt ? styles.mt : "10%"}
    >
      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page - 1)}
        isDisabled={pageInfo.page === 1}
      >
        Prev
      </Button>
      <Text>
        Page {pageInfo.page} of {pageInfo.pages > 0 ? pageInfo.pages : 1}
      </Text>
      <Button
        onClick={() => debouncedHandlePageChange(pageInfo.page + 1)}
        isDisabled={pageInfo.page === pageInfo.pages || pageInfo.pages === 0}
      >
        Next
      </Button>
    </HStack>
  );
};
