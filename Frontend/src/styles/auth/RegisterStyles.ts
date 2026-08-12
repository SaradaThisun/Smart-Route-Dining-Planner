import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 25,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1565C0',
  },

  logo2: {
    color: '#26A69A',
  },

  content: {
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },

  subtitle: {
    color: '#757575',
    marginBottom: 30,
    fontSize: 15,
  },

  errorText: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 18,
  },

  registerButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  loginText: {
    color: '#757575',
  },

  loginLink: {
    color: '#1565C0',
    fontWeight: 'bold',
  },

});