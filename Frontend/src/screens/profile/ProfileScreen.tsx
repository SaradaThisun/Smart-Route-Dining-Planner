import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from "@react-navigation/native";
import { changePassword } from '../../services/authService';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const [user, setUser] = useState<any>(null);
  const [accountVisible, setAccountVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const logout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            navigation.replace("Login");
          },
        },
      ]
    );
  };

  const submitPasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing details', 'Please complete all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Invalid password', 'New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Password mismatch', 'New passwords do not match.');
      return;
    }

    try {
      setSavingPassword(true);
      await changePassword(oldPassword, newPassword);
      setPasswordVisible(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Success', 'Your password was updated.');
    } catch (error: any) {
      Alert.alert(
        'Unable to update password',
        error?.response?.data?.message || 'The old password may be incorrect.',
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return (

    


    <SafeAreaView style={{flex: 1}} edges={['top', 'bottom']}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={60}
            color="#1565C0"
          />
        </View>

        <Text style={styles.name}>
          {user?.fullName}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statTitle}>
            Trips
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>35</Text>
          <Text style={styles.statTitle}>
            Places
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>4.9</Text>
          <Text style={styles.statTitle}>
            Rating
          </Text>
        </View>

      </View>

      <View style={styles.menu}>

        <MenuItem
          icon="person-outline"
          title="My Account"
          onPress={() => setAccountVisible(true)}
        />

        <MenuItem
          icon="lock-closed-outline"
          title="Change Password"
          onPress={() => setPasswordVisible(true)}
        />

        <MenuItem
          icon="information-circle-outline"
          title="About"
        />

        <MenuItem
          icon="log-out-outline"
          title="Logout"
          onPress={logout}
          color="#E53935"
        />

      </View>

      <Modal
        visible={accountVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAccountVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAccountVisible(false)}
              accessibilityLabel="Close account details"
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>My Account</Text>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.accountValue}>{user?.email || 'Not available'}</Text>
            <Text style={styles.fieldLabel}>Password</Text>
            <Text style={styles.accountValue}>••••••••</Text>
            <Text style={styles.securityNote}>
              Your password is protected and cannot be displayed.
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={passwordVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPasswordVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPasswordVisible(false)}
              accessibilityLabel="Close change password"
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Change Password</Text>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput style={styles.input} value={user?.email || ''} editable={false} />
            <Text style={styles.fieldLabel}>Old Password</Text>
            <TextInput
              style={styles.input}
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Enter old password"
              placeholderTextColor="#111827"
            />
            <Text style={styles.fieldLabel}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor="#111827"
            />
            <Text style={styles.fieldLabel}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Repeat new password"
              placeholderTextColor="#111827"
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={submitPasswordChange}
              disabled={savingPassword}
            >
              <Text style={styles.updateButtonText}>
                {savingPassword ? 'Updating...' : 'Update Password'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({
  icon,
  title,
  onPress,
  color = "#333",
}: any) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={24}
      color={color}
    />

    <Text
      style={[
        styles.menuText,
        { color },
      ]}
    >
      {title}
    </Text>

    <Ionicons
      name="chevron-forward"
      size={20}
      color="#AAA"
    />
  </TouchableOpacity>
);

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#1565C0",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
  },

  email: {
    color: "#E3F2FD",
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginHorizontal: 20,
  },

  statBox: {
    backgroundColor: "#FFF",
    width: 100,
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1565C0",
  },

  statTitle: {
    color: "#666",
    marginTop: 5,
  },

  menu: {
    marginTop: 35,
    marginHorizontal: 20,
  },

  menuItem: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
  },

  menuText: {
    flex: 1,
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "600",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 22,
    elevation: 8,
  },

  closeButton: {
    position: "absolute",
    right: 14,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  closeText: {
    color: "#1565C0",
    fontSize: 28,
    lineHeight: 30,
  },

  modalTitle: {
    color: "#1565C0",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    marginRight: 45,
  },

  fieldLabel: {
    color: "#374151",
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },

  accountValue: {
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    padding: 13,
    color: "#1F2937",
  },

  securityNote: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#F4F7FB",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: "#1F2937",
  },

  updateButton: {
    backgroundColor: "#1565C0",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 22,
  },

  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
