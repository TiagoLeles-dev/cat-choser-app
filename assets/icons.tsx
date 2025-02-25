import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <MaterialIcons name="pets" size={26} {...props} />,
    chat: (props) => <Ionicons name="chatbubble-outline" size={26} {...props} />,
    profile: (props) => <Feather name="user" size={26} {...props} />,
}