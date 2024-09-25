import { Box, Button } from "native-base";
import { CustomIcon } from "../utils";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    if (startPage > 1) {
      buttons.push(
        <PaginationButton
          key={1}
          onPress={() => onPageChange(1)}
          variant={1 === currentPage ? "solid" : "outline"}
        >
          1
        </PaginationButton>
      );
    }

    if (startPage > 2) {
      buttons.push(
        <PaginationButton key="ellipsis-start" variant="outline" disabled>
          ...
        </PaginationButton>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          onPress={() => onPageChange(i)}
          disabled={i === currentPage}
          variant={i === currentPage ? "solid" : "outline"}
        >
          {i.toString()}
        </PaginationButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <PaginationButton key="ellipsis-end" variant="outline" disabled>
            ...
          </PaginationButton>
        );
      }
      buttons.push(
        <PaginationButton
          key={totalPages}
          onPress={() => onPageChange(totalPages)}
          variant={totalPages === currentPage ? "solid" : "outline"}
        >
          {totalPages.toString()}
        </PaginationButton>
      );
    }

    return buttons;
  };

  return (
    <Box
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <PaginationButton
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CustomIcon
          name={"arrow-back-ios-new"}
          type={2}
          size={6}
          color={"white"}
        />
      </PaginationButton>
      <Box
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {renderPageButtons()}
      </Box>
      <PaginationButton
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <CustomIcon
          name={"arrow-forward-ios"}
          type={2}
          size={6}
          color={"white"}
        />
      </PaginationButton>
    </Box>
  );
};

const PaginationButton = ({ onPress, disabled, variant, children }) => {
  return (
    <Button
      p={1.5}
      minW={8}
      onPress={onPress}
      disabled={disabled}
      variant={variant}
      bg={variant == "outline" ? "transparent" : "custom.mainBlue"}
      _pressed={{
        bg: variant == "outline" ? "transparent" : "custom.mainBlue",
        opacity: 0.3,
      }}
    >
      {children}
    </Button>
  );
};
export default CustomPagination;
