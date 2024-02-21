import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms"

export const isStrongPassword = (controlForm: FormControl): ValidationErrors | null => {
  const password: string = controlForm.value;

  const isStrongPasswordResults = {
    hasMinLength: password.length >= 6,
    hasSpecialCharacters: /.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\`~\-='"].*/.test(password),
    hasNumbers: /.*[0-9].*/.test(password),
    hasUpperCase: /.*[A-Z].*/.test(password),
    hasLowerCase: /.*[a-z].*/.test(password)
  }

  if (isStrongPasswordResults.hasMinLength &&
    isStrongPasswordResults.hasSpecialCharacters &&
    isStrongPasswordResults.hasNumbers &&
    isStrongPasswordResults.hasUpperCase &&
    isStrongPasswordResults.hasLowerCase)
    return null;
  else
    return isStrongPasswordResults
}

export const arePasswordsEquals = (group: AbstractControl): ValidationErrors | null => {
  const pass: string | null = group.get('password')?.value;
  const confirmPass: string | null = group.get('passwordCopy')?.value
  if (pass !== null && confirmPass !== null && pass === confirmPass)
    return null
  else {
    group.get('passwordCopy')?.setErrors({ passwordAreEquals: false })
    return { passwordAreEquals: false }
  }
}