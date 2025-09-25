import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  PlayCircle, 
  BookOpen, 
  Code, 
  Shield,
  AlertTriangle,
  Lightbulb,
  Target
} from "lucide-react";
import { mockWalkthroughs } from "../mock/data";

const Walkthrough = () => {
  const { id } = useParams();
  const walkthrough = mockWalkthroughs.find(w => w.id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  if (!walkthrough) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Walkthrough Not Found</CardTitle>
            <CardDescription>
              The requested walkthrough could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/dashboard">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock walkthrough content based on the module
  const getWalkthroughSteps = (walkthroughId) => {
    const commonSteps = {
      wt_001: [
        {
          title: "Introduction to SQL Injection",
          type: "theory",
          content: "SQL injection is a code injection technique that might destroy your database. It occurs when user input is not properly sanitized before being included in SQL queries.",
          example: "SELECT * FROM users WHERE username = '$username' AND password = '$password'",
          vulnerability: "If username contains: admin' --\nThe query becomes: SELECT * FROM users WHERE username = 'admin' --' AND password = '$password'"
        },
        {
          title: "Identifying Injection Points",
          type: "practical",
          content: "Learn to identify potential SQL injection vulnerabilities in web applications.",
          task: "Examine the following login form and identify potential injection points.",
          fillInBlank: "The vulnerable parameter in this login form is the _____ field because it lacks proper input validation."
        },
        {
          title: "Union-Based Injection",
          type: "practical",
          content: "UNION attacks allow attackers to extract data from other tables in the database.",
          example: "' UNION SELECT username, password FROM admin_users --",
          task: "Complete the UNION injection to extract user data."
        },
        {
          title: "Prevention Techniques",
          type: "theory",
          content: "Learn the primary defenses against SQL injection attacks.",
          prevention: ["Parameterized queries", "Input validation", "Stored procedures", "Escape special characters"]
        },
        {
          title: "Hands-on Exercise",
          type: "exercise",
          content: "Practice fixing a vulnerable code snippet.",
          code: "// Vulnerable code\nString query = \"SELECT * FROM users WHERE id = \" + userId;",
          task: "Rewrite this code using parameterized queries to prevent SQL injection."
        }
      ],
      wt_002: [
        {
          title: "Understanding XSS Attacks",
          type: "theory",
          content: "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web applications.",
          types: ["Reflected XSS", "Stored XSS", "DOM-based XSS"]
        },
        {
          title: "XSS Attack Vectors",
          type: "practical",
          content: "Learn common XSS injection points and payloads.",
          example: "<script>alert('XSS')</script>",
          task: "Identify which input fields are vulnerable to XSS in the sample application."
        },
        {
          title: "Output Encoding",
          type: "theory",
          content: "Proper output encoding is essential for preventing XSS attacks.",
          encoding: ["HTML entity encoding", "JavaScript encoding", "URL encoding", "CSS encoding"]
        },
        {
          title: "Content Security Policy",
          type: "practical",
          content: "Implement CSP headers to mitigate XSS risks.",
          example: "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'"
        }
      ]
    };

    return commonSteps[walkthroughId] || [
      {
        title: "Module Introduction",
        type: "theory",
        content: "Welcome to this cybersecurity training module. This walkthrough will guide you through key concepts and practical exercises.",
      },
      {
        title: "Practical Exercise",
        type: "practical",
        content: "Apply what you've learned in this hands-on exercise.",
      }
    ];
  };

  const steps = getWalkthroughSteps(walkthrough.id);
  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
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

  const getStepIcon = (type) => {
    switch (type) {
      case "theory": return <BookOpen className="h-5 w-5" />;
      case "practical": return <Code className="h-5 w-5" />;
      case "exercise": return <Target className="h-5 w-5" />;
      default: return <PlayCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">{walkthrough.title}</h1>
          <p className="text-muted-foreground mb-4">{walkthrough.description}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <Badge className={walkthrough.difficulty === "Beginner" ? "bg-green-100 text-green-800" : 
                             walkthrough.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" : 
                             "bg-red-100 text-red-800"}>
              {walkthrough.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">{walkthrough.duration}</span>
            <span className="text-sm text-muted-foreground">{walkthrough.exercises} exercises</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress: Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Steps</CardTitle>
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
                      {completedSteps.has(index) ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        getStepIcon(step.type)
                      )}
                      <div className="flex-1 mr-2">
                        <div className="text-sm font-medium truncate">{step.title}</div>
                        <div className="text-xs text-muted-foreground capitalize">{step.type}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Step Content */}
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
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="exercise">Exercise</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-base leading-relaxed">{currentStepData.content}</p>
                      
                      {currentStepData.example && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <h4 className="flex items-center mb-2">
                            <Code className="h-4 w-4 mr-2" />
                            Example
                          </h4>
                          <pre className="text-sm font-mono bg-background p-3 rounded border overflow-x-auto">
                            <code>{currentStepData.example}</code>
                          </pre>
                        </div>
                      )}
                      
                      {currentStepData.vulnerability && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <h4 className="flex items-center mb-2 text-red-800 dark:text-red-200">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Vulnerability Example
                          </h4>
                          <pre className="text-sm font-mono bg-red-100 dark:bg-red-900/40 p-3 rounded border overflow-x-auto">
                            <code>{currentStepData.vulnerability}</code>
                          </pre>
                        </div>
                      )}
                      
                      {currentStepData.prevention && (
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <h4 className="flex items-center mb-2 text-green-800 dark:text-green-200">
                            <Shield className="h-4 w-4 mr-2" />
                            Prevention Techniques
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {currentStepData.prevention.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exercise" className="space-y-4">
                    {currentStepData.task ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <h4 className="flex items-center mb-2 text-blue-800 dark:text-blue-200">
                            <Target className="h-4 w-4 mr-2" />
                            Task
                          </h4>
                          <p className="text-sm">{currentStepData.task}</p>
                        </div>
                        
                        {currentStepData.fillInBlank && (
                          <div className="p-4 border rounded-lg">
                            <p className="text-sm mb-2">{currentStepData.fillInBlank}</p>
                            <Button size="sm" onClick={handleStepComplete}>
                              Submit Answer
                            </Button>
                          </div>
                        )}
                        
                        {currentStepData.code && (
                          <div className="space-y-2">
                            <h5 className="font-medium">Code to Fix:</h5>
                            <pre className="text-sm font-mono bg-muted p-3 rounded border overflow-x-auto">
                              <code>{currentStepData.code}</code>
                            </pre>
                            <Button size="sm" onClick={handleStepComplete}>
                              Submit Solution
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        <Lightbulb className="h-8 w-8 mx-auto mb-2" />
                        <p>No exercises for this step. Review the content and continue.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="resources">
                    <div className="space-y-4">
                      <h4 className="font-medium">Additional Resources</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• OWASP Top 10 Security Risks</li>
                        <li>• Cybersecurity Best Practices Guide</li>
                        <li>• Interactive Security Labs</li>
                        <li>• Community Discussion Forum</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {!completedSteps.has(currentStep) && currentStepData.type !== "theory" && (
                    <Button onClick={handleStepComplete}>
                      Mark Complete
                    </Button>
                  )}
                  
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;