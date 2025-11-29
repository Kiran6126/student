import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertCircle, CheckCircle } from "lucide-react";

export function SignupForm({ onSignupSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 5 || formData.age > 120) {
      newErrors.age = "Age must be between 5 and 120";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleGenderChange = (value) => {
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
    if (errors.gender) {
      setErrors(prev => ({
        ...prev,
        gender: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Get existing users from localStorage
      let users = [];
      try {
        const stored = localStorage.getItem("signupUsers");
        if (stored) {
          users = JSON.parse(stored);
        }
      } catch (e) {
        // ignore parse errors
      }

      // Check if email already exists
      if (users.some(u => u.email === formData.email)) {
        setErrors({ email: "Email already registered" });
        setIsLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        age: parseInt(formData.age),
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      };

      // Add new user to array
      users.push(newUser);

      // Save to localStorage
      localStorage.setItem("signupUsers", JSON.stringify(users));

      setSuccess(`Account created successfully for ${newUser.fullName}! You can now log in.`);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      // Call success callback if provided
      if (onSignupSuccess) {
        setTimeout(() => {
          onSignupSuccess(newUser);
        }, 1500);
      }
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign up to get started with the Student Outcome Tracker
          </p>
        </div>

        {success && (
          <div className="flex items-center gap-3 p-3 bg-green-100 text-green-800 rounded-md">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </div>
        )}

        {errors.submit && (
          <div className="flex items-center gap-3 p-3 bg-red-100 text-red-800 rounded-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="e.g., John"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="e.g., Doe"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="e.g., 20"
              value={formData.age}
              onChange={handleInputChange}
              min="5"
              max="120"
              className={errors.age ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.age && (
              <p className="text-xs text-red-600">{errors.age}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="e.g., 9876543210"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={errors.phoneNumber ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={handleGenderChange} disabled={isLoading}>
              <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-xs text-red-600">{errors.gender}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="e.g., john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter a password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
              disabled={isLoading}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <a href="/" className="text-primary hover:underline">
            Log in here
          </a>
        </p>
      </Card>
    </div>
  );
}
