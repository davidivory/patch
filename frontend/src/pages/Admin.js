import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Users, 
  Activity, 
  Database, 
  Server,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Shield,
  RefreshCw,
  Download
} from "lucide-react";
import { mockAdminData } from "../mock/data";

const Admin = () => {
  const stats = [
    {
      title: "Total Users",
      value: mockAdminData.totalUsers,
      icon: Users,
      color: "text-blue-500",
      change: "+12%"
    },
    {
      title: "Active Users",
      value: mockAdminData.activeUsers,
      icon: Activity,
      color: "text-green-500",
      change: "+5%"
    },
    {
      title: "Completed Modules",
      value: mockAdminData.completedModules,
      icon: TrendingUp,
      color: "text-purple-500",
      change: "+8%"
    },
    {
      title: "Average Progress",
      value: `${mockAdminData.averageProgress}%`,
      icon: Shield,
      color: "text-orange-500",
      change: "+3%"
    },
  ];

  const getStatusColor = (status) => {
    return status === "Online" ? "text-green-500" : "text-red-500";
  };

  const getStatusIcon = (status) => {
    return status === "Online" ? CheckCircle : AlertTriangle;
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            System overview and management tools for PATCH platform
          </p>
        </div>

        {/* Security Warning */}
        <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription className="text-yellow-800 dark:text-yellow-200">
            <strong>Educational Notice:</strong> This admin panel demonstrates common security vulnerabilities found in real systems. 
            In production, this would require proper authentication, authorization, and input validation.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest user actions on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAdminData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            {" "}
                            <span className="text-muted-foreground">{activity.action}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Activity
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    System Status
                  </CardTitle>
                  <CardDescription>
                    Current status of system components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(mockAdminData.systemStatus).map(([component, status], index) => {
                      const StatusIcon = getStatusIcon(status);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`h-4 w-4 ${getStatusColor(status)}`} />
                            <span className="font-medium capitalize">
                              {component.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                          <Badge 
                            variant={status === "Online" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage registered users and their access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">All Users</h3>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Users
                    </Button>
                  </div>
                  
                  {/* Mock user table */}
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-3 bg-muted font-medium text-sm">
                      <div>Username</div>
                      <div>Progress</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    {["student123", "learner456", "hacker789", "security101"].map((user, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-3 border-t">
                        <div className="font-medium">{user}</div>
                        <div>{65 + index * 5}%</div>
                        <Badge variant="default" className="w-fit">Active</Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Database Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Backup Database
                    </Button>
                    <Button variant="outline" className="w-full">
                      Optimize Database
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Reset Database
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Last backup: 2 hours ago</p>
                    <p>Database size: 245 MB</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    Server Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Restart Server
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Logs
                    </Button>
                    <Button variant="outline" className="w-full">
                      Update System
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Uptime: 15 days, 4 hours</p>
                    <p>CPU Usage: 23%</p>
                    <p>Memory Usage: 67%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Vulnerabilities
                </CardTitle>
                <CardDescription>
                  Identified vulnerabilities in this admin panel for educational purposes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "No authentication required to access admin panel",
                    "No authorization checks for admin functions",
                    "Direct database operations without sanitization",
                    "Exposed system information and logs",
                    "No CSRF protection on admin actions",
                    "Lack of input validation on admin forms",
                    "No audit logging for admin activities",
                  ].map((vulnerability, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-800 dark:text-red-200">{vulnerability}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Recommended Fixes:
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Implement robust authentication (OAuth, SAML, MFA)</li>
                    <li>• Add role-based access control (RBAC)</li>
                    <li>• Use parameterized queries and input validation</li>
                    <li>• Implement proper session management</li>
                    <li>• Add comprehensive audit logging</li>
                    <li>• Enable CSRF tokens for all forms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;