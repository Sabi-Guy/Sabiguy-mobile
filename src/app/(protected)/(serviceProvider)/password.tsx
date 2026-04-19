import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  defaultHidden?: boolean;
  error?: string;
};

function PasswordField({ label, value, onChangeText, placeholder, defaultHidden = true, error }: PasswordFieldProps) {
  const [hidden, setHidden] = useState(defaultHidden);

  return (
    <View>
      <Text className="mb-1.5 text-[12px] leading-[13px] text-[#747B86]">{label}</Text>
      <View
        className={`h-10 flex-row items-center rounded-md border px-3 ${
          error ? "border-[#D94848] bg-[#FFF4F4]" : "border-[#E7E7E7] bg-[#EEEEEE]"
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          placeholder={placeholder}
          placeholderTextColor="#9097A0"
          className="flex-1 text-[12px] text-[#5F6772]"
          style={{ height: 40, lineHeight: 14, paddingVertical: 0, transform: [{ translateY: -1 }] }}
        />
        <Pressable onPress={() => setHidden((prev) => !prev)}>
          <Ionicons name={hidden ? "eye-off-outline" : "eye-outline"} size={14} color="#8F96A0" />
        </Pressable>
      </View>
      {!!error && <Text className="mt-1 text-[10px] text-[#D94848]">{error}</Text>}
    </View>
  );
}

export default function PasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("Phil Crook");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ current?: string; new?: string; confirm?: string }>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFeedback = () => {
    setSubmitError("");
    setSubmitSuccess("");
  };

  const validate = () => {
    const nextErrors: { current?: string; new?: string; confirm?: string } = {};

    if (!currentPassword.trim()) {
      nextErrors.current = "Current password is required.";
    }

    if (!newPassword.trim()) {
      nextErrors.new = "New password is required.";
    } else if (newPassword.length < 8) {
      nextErrors.new = "New password must be at least 8 characters.";
    } else if (newPassword.trim() === currentPassword.trim()) {
      nextErrors.new = "New password must be different from current password.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirm = "Please confirm your new password.";
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirm = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleResetPassword = async () => {
    clearFeedback();
    if (!validate()) {
      setSubmitError("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);

    setSubmitSuccess("Password reset successfully.");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <View className="flex-1 bg-[#F6F7F3]">
      <View className="border-b border-[#EFEFEF] bg-white px-4 pb-3 pt-6">
        <View className="relative items-center justify-center">
          <Pressable className="absolute left-0" onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color="#231F20" />
          </Pressable>
          <Text className="text-[13px] font-semibold text-[#231F20]">Password</Text>
        </View>
      </View>

      <View className="mt-[24px] w-[345px] self-center gap-5">
        <PasswordField
          label="Current Password"
          value={currentPassword}
          onChangeText={(value) => {
            setCurrentPassword(value);
            setErrors((prev) => ({ ...prev, current: undefined }));
            clearFeedback();
          }}
          defaultHidden={false}
          error={errors.current}
        />
        <PasswordField
          label="New Password"
          value={newPassword}
          onChangeText={(value) => {
            setNewPassword(value);
            setErrors((prev) => ({ ...prev, new: undefined }));
            clearFeedback();
          }}
          placeholder="Enter new password"
          error={errors.new}
        />
        <PasswordField
          label="Confirm new password"
          value={confirmPassword}
          onChangeText={(value) => {
            setConfirmPassword(value);
            setErrors((prev) => ({ ...prev, confirm: undefined }));
            clearFeedback();
          }}
          placeholder="Confirm new password"
          error={errors.confirm}
        />

        <Pressable
          className={`mt-4 h-[45px] w-[345px] items-center justify-center rounded-[8px] p-[10px] ${
            isSubmitting ? "bg-[#8CB89D]" : "bg-[#2E7B4F]"
          }`}
          disabled={isSubmitting}
          onPress={handleResetPassword}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text className="text-[13px] font-semibold text-white">Reset Password</Text>
          )}
        </Pressable>

        {!!submitError && <Text className="text-[10px] text-[#D94848]">{submitError}</Text>}
        {!!submitSuccess && <Text className="text-[10px] text-[#2E7B4F]">{submitSuccess}</Text>}
      </View>
    </View>
  );
}
