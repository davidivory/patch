import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Trophy, 
  Target, 
  TrendingUp,
  Users,
  Shield,
  PenTool,
  ArrowRight
} from "lucide-react";
import { mockUser, mockWalkthroughs } from "../mock/data";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "Student";
  
  const stats = [
    {
      title: "Modules Completed",
      value: mockUser.completedModules,
      total: mockUser.totalModules,
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Overall Progress",
      value: `${mockUser.progress}%`,
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      title: "Current Level",
      value: mockUser.level,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Days Active",
      value: Math.floor((new Date() - new Date(mockUser.joinDate)) / (1000 * 60 * 60 * 24)),
      icon: Target,
      color: "text-purple-500",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const recentActivity = [
    "Completed SQL Injection module",
    "Started XSS Defense walkthrough", 
    "Added journal entry for Authentication module",
    "Earned 'Security Fundamentals' badge",
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {username}!</h1>
          <p className="text-muted-foreground">
            Continue your cybersecurity learning journey with PATCH.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  {stat.total && (
                    <p className="text-xs text-muted-foreground">
                      of {stat.total} total
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Available Walkthroughs
                </CardTitle>
                <CardDescription>
                  Continue your cybersecurity training with these modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockWalkthroughs.map((walkthrough) => (
                  <div
                    key={walkthrough.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{walkthrough.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {walkthrough.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {walkthrough.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {walkthrough.exercises} exercises
                          </span>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(walkthrough.difficulty)}>
                        {walkthrough.difficulty}
                      </Badge>
                    </div>

                    {walkthrough.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{walkthrough.progress}%</span>
                        </div>
                        <Progress value={walkthrough.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {walkthrough.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/walkthrough/${walkthrough.id}`}>
                        <Button 
                          size="sm" 
                          variant={walkthrough.completed ? "outline" : "default"}
                        >
                          {walkthrough.completed ? "Review" : walkthrough.progress > 0 ? "Continue" : "Start"}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {mockUser.progress}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Overall completion
                  </p>
                </div>
                <Progress value={mockUser.progress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {mockUser.completedModules} of {mockUser.totalModules} modules completed
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/journal" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <PenTool className="h-4 w-4 mr-2" />
                    View Journal
                  </Button>
                </Link>
                <Link to="/admin" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;