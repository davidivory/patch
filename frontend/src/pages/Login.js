import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simulated vulnerable login for educational purposes
  const vulnerabilities = [
    "No input sanitization",
    "Weak password requirements",
    "No rate limiting",
    "Potential SQL injection",
    "No CSRF protection",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.session_id) {
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("isLoggedIn", "true");

        toast({
          title: "Login Successful! ⚠️",
          description: "Welcome to the vulnerable system. This login has multiple security flaws for educational purposes.",
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
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

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Vulnerable Login</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Educational demonstration of insecure authentication
          </p>
        </div>

        <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Educational Notice:</strong> This is an intentionally vulnerable login form for cybersecurity training.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter any credentials to access the training platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Try: admin, user, ' OR '1'='1
                </p>
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
                  Try: password, 123456, admin
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/register" className="text-sm text-primary hover:underline">
                Don't have an account? Register here
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-200 text-sm">
              Identified Vulnerabilities
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
    </div>
  );
};

export default Login;
