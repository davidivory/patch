import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Shield, Eye, EyeOff, AlertTriangle, BookOpen, Code, Target } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { mockWalkthroughs } from "../mock/data";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const walkthrough = mockWalkthroughs.find(w => w.id === "wt_006");
  const vulnerabilities = walkthrough ? walkthrough.vulnerabilities : [];

  // Get walkthrough steps (simplified version from Walkthrough.js)
  const getWalkthroughSteps = () => {
    return [
      {
        title: "Introduction to Registration Vulnerabilities",
        type: "theory",
        content: "User registration forms are a common attack vector for cybercriminals. Understanding these vulnerabilities is crucial for building secure authentication systems. We'll examine five common weak authentication flaws in registration processes.",
        overview: walkthrough ? walkthrough.description : "",
      },
      {
        title: "Weak Password Policy",
        type: "theory",
        content: "Weak password policies make it easy for attackers to guess or brute-force user credentials. Password strength requirements should enforce minimum complexity, length, and diversity.",
        vulnerability: "Accepting any password combination, no minimum requirements for length or character types.",
        example: "Password: 'password' - easily crackable",
        prevention: ["Enforce minimum length (12+ characters)", "Require uppercase/lowercase/numbers/symbols", "Use password strength meters", "Implement breach checking"],
      },
      {
        title: "No Email Verification",
        type: "theory",
        content: "Email verification ensures the email address provided belongs to the user. Without it, attackers can create unlimited accounts and conduct phishing or spam campaigns.",
        vulnerability: "Accounts created without verifying email ownership, no link sent to confirm.",
        risks: ["Unlimited account creation", "Phishing campaigns", "Spam distribution", "Credential stuffing"],
        prevention: ["Send verification emails", "Require email confirmation", "Use temporary accounts for unverified users", "Implement rate limiting"],
      },
      {
        title: "Passwords Stored in Plaintext",
        type: "theory",
        content: "Storing passwords in plaintext means they're readable by anyone with database access. This is catastrophic if the database is breached. Passwords must be hashed using secure algorithms.",
        vulnerability: "password = request.password  # Stored as plain text in database",
        badExample: "user.password = \"$2b$12$plaintextpassword\"",
        goodExample: "user.password = bcrypt.hash(request.password, 12)",
        prevention: ["Use bcrypt, Argon2id, or PBKDF2", "Apply salt + pepper", "Never store passwords reversibly", "Use slow hashing algorithms"],
      },
      {
        title: "No Input Validation",
        type: "practical",
        content: "Input validation ensures user data meets expected formats and doesn't contain malicious content. Without proper validation, attackers can inject harmful data or bypass business logic.",
        vulnerability: "No checks on username, email, or password formats.",
        attacks: ["SQL injection in username fields", "XSS via username", "Invalid email formats", "Long input DoS"],
        prevention: ["Validate on server-side (client-side is insufficient)", "Use appropriate data types", "Sanitize inputs", "Enforce maximum lengths"],
      },
      {
        title: "Susceptible to User Enumeration",
        type: "practical",
        content: "User enumeration occurs when the application reveals whether a username or email exists. This helps attackers target valid accounts and refine social engineering attacks.",
        vulnerability: "Different responses for existing vs non-existing users expose account information.",
        example: "Existing user: 'Account created successfully'\nNon-existing: 'Invalid email format' - subtle leak",
        prevention: ["Use consistent error messages", "Rate limit registration attempts", "Don't reveal account existence", "Use time-delayed responses"],
        task: "Test the registration form with both existing and non-existing usernames to identify enumeration leaks."
      },
      {
        title: "Secure Registration Implementation",
        type: "exercise",
        content: "Now that you've learned about registration vulnerabilities, implement a secure registration process.",
        checklist: [
          "Enforce strong password requirements",
          "Implement email verification",
          "Hash passwords with bcrypt",
          "Validate all inputs on server-side",
          "Prevent user enumeration attacks",
          "Add rate limiting and CAPTCHA if needed"
        ]
      }
    ];
  };

  const steps = getWalkthroughSteps();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }),
      });
      const data = await response.json();

      if (data.id) {
        toast({
          title: "Registration Successful! ⚠️",
          description: "Account created with weak security measures for educational purposes.",
        });

        navigate("/login");
      } else {
        toast({
          title: "Registration Failed",
          description: "Error creating account.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const currentStepData = steps[currentStep];
  const getStepIcon = (type) => {
    switch (type) {
      case "theory": return <BookOpen className="h-5 w-5" />;
      case "practical": return <Code className="h-5 w-5" />;
      case "exercise": return <Target className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Vulnerable Registration</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Educational demonstration of insecure user registration with guided learning
          </p>
        </div>

        <Alert className="mb-8 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20 max-w-4xl mx-auto">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Educational Notice:</strong> This registration form contains intentional security flaws.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="register" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Register Account</TabsTrigger>
            <TabsTrigger value="learn">Learn Vulnerabilities</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-6">
            <div className="flex justify-center">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Register for the PATCH cybersecurity training platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  No verification required (vulnerability)
                </p>
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Any password accepted (weak policy)
                </p>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

                  <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm text-primary hover:underline">
                      Already have an account? Sign in here
                    </Link>
                  </div>
                </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 max-w-md">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-200 text-sm">
                  Security Vulnerabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-xs text-red-700 dark:text-red-300">
                  {vulnerabilities.map((vuln, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {vuln}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Steps ({steps.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {steps.map((step, index) => (
                      <Button
                        key={index}
                        variant={index === currentStep ? "default" : "ghost"}
                        className="w-full justify-start text-left"
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className="flex items-center">
                          {getStepIcon(step.type)}
                          <div className="flex-1 ml-2 min-w-0">
                            <div className="text-sm font-medium break-words overflow-hidden">{step.title}</div>
                            <div className="text-xs text-muted-foreground capitalize">{step.type}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStepIcon(currentStepData.type)}
                        <CardTitle className="ml-2">{currentStepData.title}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {currentStepData.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-base leading-relaxed">{currentStepData.content}</p>

                    {currentStepData.vulnerability && (
                      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-red-800 dark:text-red-200 text-sm flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Vulnerability Example
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm font-mono bg-red-100 dark:bg-red-900/40 p-3 rounded border overflow-x-auto">
                            <code>{currentStepData.vulnerability}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}

                    {currentStepData.example && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center">
                            <Code className="h-4 w-4 mr-2" />
                            Example
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <pre className="text-sm font-mono bg-muted p-3 rounded border overflow-x-auto">
                            <code>{currentStepData.example}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    )}

                    {currentStepData.prevention && (
                      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-green-800 dark:text-green-200 text-sm flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Prevention Techniques
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {currentStepData.prevention.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {currentStepData.task && (
                      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-blue-800 dark:text-blue-200 text-sm flex items-center">
                            <Target className="h-4 w-4 mr-2" />
                            Task
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{currentStepData.task}</p>
                          <Button size="sm" className="mt-2">
                            Mark Complete
                          </Button>
                        </CardContent>
                      </Card>
                    )}

                    {currentStepData.checklist && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Secure Implementation Checklist</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {currentStepData.checklist.map((item, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <input type="checkbox" className="mr-2" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                    Previous Step
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Register;
