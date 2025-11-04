/**
 * Password Strength Validation Utility
 * 
 * Requirements:
 * - Minimum 8 characters
 * - At least 1 uppercase letter (A-Z)
 * - At least 1 lowercase letter (a-z)
 * - At least 1 number (0-9)
 * - At least 1 special character (@$!%*?&)
 */

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  specialChars: '@$!%*?&'
}

/**
 * Validates password strength
 * @param password - The password to validate
 * @returns Object with isValid boolean and error message if invalid
 */
export function validatePassword(password: string): { 
  isValid: boolean
  message?: string 
} {
  if (!password) {
    return { 
      isValid: false, 
      message: 'Password is required' 
    }
  }

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long` 
    }
  }

  if (!/[a-z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one lowercase letter' 
    }
  }

  if (!/[A-Z]/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter' 
    }
  }

  if (!/\d/.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one number' 
    }
  }

  if (!/[@$!%*?&]/.test(password)) {
    return { 
      isValid: false, 
      message: `Password must contain at least one special character (${PASSWORD_REQUIREMENTS.specialChars})` 
    }
  }

  if (!PASSWORD_REGEX.test(password)) {
    return { 
      isValid: false, 
      message: 'Password contains invalid characters' 
    }
  }

  return { isValid: true }
}

/**
 * Gets password strength indicator
 * @param password - The password to check
 * @returns Strength level: 'weak', 'medium', 'strong', or 'very-strong'
 */
export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' | 'very-strong' {
  if (!password) return 'weak'
  
  let strength = 0
  
  // Length check
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (password.length >= 16) strength++
  
  // Character variety
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[@$!%*?&]/.test(password)) strength++
  
  if (strength <= 3) return 'weak'
  if (strength <= 5) return 'medium'
  if (strength <= 6) return 'strong'
  return 'very-strong'
}

/**
 * Returns a user-friendly list of password requirements
 */
export function getPasswordRequirementsList(): string[] {
  return [
    'At least 8 characters long',
    'One uppercase letter (A-Z)',
    'One lowercase letter (a-z)',
    'One number (0-9)',
    `One special character (${PASSWORD_REQUIREMENTS.specialChars})`
  ]
}
