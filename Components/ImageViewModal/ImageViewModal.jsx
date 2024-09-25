import { Box } from "native-base";
import ImageView from "react-native-image-viewing";
const ImageViewModal = ({
  images,
  imageIndex,
  onImageIndexChange,
  visible,
  onRequestClose,
}) => {
  return (
    <ImageView
      images={images}
      imageIndex={imageIndex}
      onImageIndexChange={(index) => {
        onImageIndexChange && onImageIndexChange(index);
      }}
      FooterComponent={({ imageIndex }) => (
        <Box
          safeAreaBottom
          flexDirection="row"
          justifyContent="center"
          gap={1}
          py={3}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              bg={index === imageIndex ? "custom.mainBlue" : "coolGray.200"}
              h={2}
              w={2}
              borderRadius="full"
            />
          ))}
        </Box>
      )}
      visible={visible}
      onRequestClose={onRequestClose}
    />
  );
};

export default ImageViewModal;
