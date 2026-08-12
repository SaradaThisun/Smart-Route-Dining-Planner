import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#1565C0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "bold",
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212121",
  },

  email: {
    fontSize: 16,
    color: "#757575",
    marginTop: 8,
    marginBottom: 40,
  },

  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});