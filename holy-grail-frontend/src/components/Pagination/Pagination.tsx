import { Button, HStack, Text } from "@chakra-ui/react";
import debounce from "lodash/debounce";

interface HStackStyles {
  spacing?: number;
  mt?: string;
}
interface PaginationProps {
  pageInfo: { page: number; size: number; total: number; pages: number };
  handlePageChange: (newPage: number) => void;
  HStackStyles?: HStackStyles;
}

export const Pagination = ({
  pageInfo,
  handlePageChange,
  HStackStyles,
}: PaginationProps) => {
  const debouncedHandlePageChange = debounce(handlePageChange, 100);

  return (
    <HStack
      spacing={HStackStyles ? HStackStyles?.spacing : 4}
      justifyContent="center"
      mt={HStackStyles ? HStackStyles?.mt : "10%"}
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
