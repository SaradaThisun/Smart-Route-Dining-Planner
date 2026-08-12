import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 20,
  },

  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#757575',
    marginBottom: 30,
  },

  errorText: {
    backgroundColor: '#FFEBEE',
    color: '#D32F2F',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#424242',
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#212121',
  },

  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },

  forgotText: {
    color: '#1565C0',
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },

  dividerText: {
    marginHorizontal: 10,
    color: '#757575',
  },

  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  googleButtonText: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#212121',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  signupText: {
    color: '#757575',
  },

  signupLink: {
    color: '#1565C0',
    fontWeight: 'bold',
  },

});