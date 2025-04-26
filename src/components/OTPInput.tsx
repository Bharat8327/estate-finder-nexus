
import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

const OTPInput = ({ length = 6, onComplete }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only allow one digit
    if (value.length > 1) {
      return;
    }

    // Make sure it's a number
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const currentOtp = newOtp.join("");
    if (currentOtp.length === length) {
      onComplete(currentOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();
    
    // Make sure pasted content is all digits and correct length
    if (pasteData && /^\d+$/.test(pasteData)) {
      const digits = pasteData.slice(0, length).split("");
      
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < length) {
          newOtp[idx] = digit;
          if (inputRefs.current[idx]) {
            inputRefs.current[idx]!.value = digit;
          }
        }
      });
      
      setOtp(newOtp);
      
      // Focus on the next empty input or last input
      const lastFilledIndex = Math.min(digits.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
      
      // If OTP is complete, trigger onComplete
      if (digits.length >= length) {
        onComplete(newOtp.join(""));
      }
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-primary"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
