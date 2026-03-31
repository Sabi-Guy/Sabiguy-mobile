import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type OTPProps = {
  length?: number;
  value?: string;
  onChangeCode?: (code: string) => void;
  onComplete?: (code: string) => void;
  isError?: boolean;
};

const ACTIVE_COLOR = "#005823CC";
const ERROR_COLOR = "#E90000";
const DEFAULT_COLOR = "#D1D5DB";

export default function OTP({
  length = 6,
  value: controlledValue,
  onChangeCode,
  onComplete,
  isError = false,
}: OTPProps) {
  const [internalCode, setInternalCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const onCompleteRef = useRef(onComplete);

  const code = useMemo(() => {
    const source = controlledValue ?? internalCode;
    return source.replace(/\D/g, "").slice(0, length);
  }, [controlledValue, internalCode, length]);

  const activeIndex = useMemo(() => {
    if (code.length >= length) {
      return length - 1;
    }

    return code.length;
  }, [code.length, length]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (code.length === length) {
      onCompleteRef.current?.(code);
    }
  }, [code, length]);

  const handleCodeChange = (value: string) => {
    const next = value.replace(/\D/g, "").slice(0, length);

    if (controlledValue === undefined) {
      setInternalCode(next);
    }

    onChangeCode?.(next);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={focusInput} className="items-center" accessibilityRole="button">
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleCodeChange}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        className="absolute h-0 w-0 opacity-0"
      />

      <View className="flex-row gap-2">
        {Array.from({ length }).map((_, index) => {
          const digit = code[index] ?? "";
          const isActive = index === activeIndex;
          const borderColor = isError ? ERROR_COLOR : isActive ? ACTIVE_COLOR : DEFAULT_COLOR;

          return (
            <View
              key={index}
              className="h-14 w-14 items-center justify-center rounded-xl border"
              style={{ borderColor }}
            >
              <Text className="text-xl font-semibold text-gray-900">{digit}</Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}
