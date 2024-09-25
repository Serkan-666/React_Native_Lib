import React from "react";
import { Box, HStack, VStack, Text } from "native-base";

const CustomGrid = ({ columns, gap, px, py, items, renderItem, cover }) => {
  const rows = Math.ceil(items.length / columns);

  return (
    <VStack space={gap} px={px || 0} py={py || 0}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <HStack key={rowIndex} space={gap}>
          {Array.from({ length: columns }).map((_, colIndex) => {
            const itemIndex = rowIndex * columns + colIndex;
            const item = items[itemIndex];

            return item ? (
              <Box key={itemIndex} flex={1}>
                {renderItem(item)}
              </Box>
            ) : cover ? null : (
              <Box key={-1} flex={1} />
            );
          })}
        </HStack>
      ))}
    </VStack>
  );
};

export default CustomGrid;
