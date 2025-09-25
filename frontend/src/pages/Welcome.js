import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Shield, BookOpen, PenTool, Users, ArrowRight, CheckCircle } from "lucide-react";

const Welcome = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Walkthroughs",
      description: "Learn cybersecurity concepts through hands-on guided exercises and real-world scenarios.",
    },
    {
      icon: PenTool,
      title: "Reflective Journal",
      description: "Document your learning journey and export your insights for future reference.",
    },
    {
      icon: Shield,
      title: "Vulnerability Training",
      description: "Practice identifying and fixing common security vulnerabilities in a safe environment.",
    },
    {
      icon: Users,
      title: "Self-Paced Learning",
      description: "Progress at your own speed with personalized tracking and achievement system.",
    },
  ];

  const quickStart = [
    "Create your account or log in to get started",
    "Choose from available cybersecurity modules",
    "Complete interactive walkthroughs at your own pace",
    "Document your learning in the reflection journal",
    "Track your progress on the dashboard",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">PATCH</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Practical App for Training Cybersecurity Hardening
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master cybersecurity fundamentals through interactive walkthroughs, hands-on exercises, 
              and reflective learning in a safe, controlled environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PATCH?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines theoretical knowledge with practical experience to build real cybersecurity skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
            <p className="text-muted-foreground text-lg">
              Follow these simple steps to begin your cybersecurity learning journey.
            </p>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {quickStart.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base">{step}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/register">
                <Button size="lg">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Welcome;