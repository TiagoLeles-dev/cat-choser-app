import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

export const icons = {
    index: (props: any) => <MaterialIcons name="pets" size={20} {...props} />,
    chat: (props: any) => <Ionicons name="chatbubble-outline" size={20} {...props} />,
    profile: (props: any) => <Feather name="user" size={20} {...props} />,
}