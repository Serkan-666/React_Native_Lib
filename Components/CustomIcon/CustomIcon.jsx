import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";

export default function CustomIcon({
  size = 6,
  type = 1,
  style,
  name,
  color,
  ...rest
}) {
  //type 1 Material, 2 MaterialCommunity
  if (type === 1) {
    return (
      <Icon
        as={MaterialCommunityIcons}
        name={name}
        size={size}
        style={[style]}
        color={color}
        {...rest}
      />
    );
  }
  if (type === 2) {
    return (
      <Icon
        as={MaterialIcons}
        name={name}
        size={size}
        style={[style]}
        color={color}
        {...rest}
      />
    );
  }
}
