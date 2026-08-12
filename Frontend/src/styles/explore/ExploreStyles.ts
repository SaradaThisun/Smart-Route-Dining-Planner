import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  ccontainer: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    width: "100%",
    height: 220,
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  greeting: {
    fontSize: 16,
    color: "#666",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1565C0",
    marginTop: 5,
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 25,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});

export default styles;