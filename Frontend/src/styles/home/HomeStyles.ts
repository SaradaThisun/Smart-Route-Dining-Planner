import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  greeting: {
    fontSize: 18,
    color: "#757575",
    marginTop: 20,
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1565C0",
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#757575",
    marginTop: 10,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#424242",
  },

  selector: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },

  selectorText: {
    fontSize: 15,
    color: "#212121",
  },

  findButton: {
    backgroundColor: "#1565C0",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  findButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 15,
    marginTop: 10,
  },

  placeCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },

  placeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },

  quickCard: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    elevation: 2,
  },

  quickIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  quickText: {
    fontWeight: "600",
    color: "#212121",
  },

});