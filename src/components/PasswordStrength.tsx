import { Check, Circle } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  met: boolean;
}

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const requirements: PasswordRequirement[] = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8
    },
    {
      label: 'One uppercase letter (A-Z)',
      met: /[A-Z]/.test(password)
    },
    {
      label: 'One lowercase letter (a-z)',
      met: /[a-z]/.test(password)
    },
    {
      label: 'One number (0-9)',
      met: /[0-9]/.test(password)
    },
    {
      label: 'One special character (!@#$%^&*)',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ];

  const allMet = requirements.every(req => req.met);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[#3E2723]">Password must contain:</p>
      <div className="space-y-1.5">
        {requirements.map((requirement, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
              requirement.met ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {requirement.met ? (
              <Check size={16} className="flex-shrink-0" />
            ) : (
              <Circle size={16} className="flex-shrink-0" />
            )}
            <span>{requirement.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function validatePassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  );
}
