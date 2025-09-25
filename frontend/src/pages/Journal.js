import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  PenTool, 
  Download, 
  Search, 
  Calendar,
  BookOpen,
  Lightbulb,
  Target,
  ArrowRight
} from "lucide-react";
import { mockJournalEntries } from "../mock/data";
import { useToast } from "../hooks/use-toast";

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newEntry, setNewEntry] = useState({
    moduleTitle: "",
    reflections: "",
    keyLearnings: "",
    challenges: "",
    nextSteps: "",
  });
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const { toast } = useToast();

  const filteredEntries = mockJournalEntries.filter(entry =>
    entry.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.reflections.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (format) => {
    // Mock export functionality
    toast({
      title: `Exporting Journal as ${format.toUpperCase()}`,
      description: "Your journal entries are being prepared for download.",
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Journal exported successfully as ${format.toUpperCase()}.`,
      });
    }, 2000);
  };

  const handleAddEntry = () => {
    if (!newEntry.moduleTitle || !newEntry.reflections) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least the module title and reflections.",
        variant: "destructive",
      });
      return;
    }

    // Mock adding entry
    toast({
      title: "Entry Added",
      description: "Your journal entry has been saved successfully.",
    });
    
    setNewEntry({
      moduleTitle: "",
      reflections: "",
      keyLearnings: "",
      challenges: "",
      nextSteps: "",
    });
    setIsAddingEntry(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Journal</h1>
            <p className="text-muted-foreground">
              Document your cybersecurity learning journey and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddingEntry(true)}>
              <PenTool className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Search and Export */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search journal entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("html")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export HTML
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="entries" className="w-full">
          <TabsList>
            <TabsTrigger value="entries">Journal Entries ({filteredEntries.length})</TabsTrigger>
            <TabsTrigger value="add" disabled={!isAddingEntry}>Add New Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="space-y-4">
            {filteredEntries.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No journal entries found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms." : "Start documenting your learning journey by creating your first entry."}
                  </p>
                  {!searchTerm && (
                    <Button onClick={() => setIsAddingEntry(true)}>
                      <PenTool className="h-4 w-4 mr-2" />
                      Create First Entry
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{entry.moduleTitle}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(entry.date)}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">Entry</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Reflections */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center">
                          <PenTool className="h-4 w-4 mr-1" />
                          Reflections
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {entry.reflections.length > 200 
                            ? entry.reflections.substring(0, 200) + "..."
                            : entry.reflections
                          }
                        </p>
                      </div>

                      {/* Key Learnings */}
                      {entry.keyLearnings && entry.keyLearnings.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center">
                            <Lightbulb className="h-4 w-4 mr-1" />
                            Key Learnings
                          </h4>
                          <ul className="space-y-1">
                            {entry.keyLearnings.slice(0, 3).map((learning, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {learning}
                              </li>
                            ))}
                            {entry.keyLearnings.length > 3 && (
                              <li className="text-xs text-muted-foreground italic">
                                +{entry.keyLearnings.length - 3} more learnings...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Challenges & Next Steps */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        {entry.challenges && (
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h5 className="font-medium text-red-800 dark:text-red-200 mb-1">Challenges</h5>
                            <p className="text-red-700 dark:text-red-300 leading-relaxed">
                              {entry.challenges.substring(0, 100)}...
                            </p>
                          </div>
                        )}
                        {entry.nextSteps && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1 flex items-center">
                              <Target className="h-3 w-3 mr-1" />
                              Next Steps
                            </h5>
                            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                              {entry.nextSteps.substring(0, 100)}...
                            </p>
                          </div>
                        )}
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        View Full Entry
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add">
            {isAddingEntry && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Journal Entry</CardTitle>
                  <CardDescription>
                    Document your learning experience and insights from a recent module
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Module Title *</label>
                    <Input
                      placeholder="e.g., SQL Injection Fundamentals"
                      value={newEntry.moduleTitle}
                      onChange={(e) => setNewEntry({ ...newEntry, moduleTitle: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Reflections *</label>
                    <Textarea
                      placeholder="What did you learn? How did it change your understanding of cybersecurity?"
                      value={newEntry.reflections}
                      onChange={(e) => setNewEntry({ ...newEntry, reflections: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Key Learnings</label>
                    <Textarea
                      placeholder="List the most important concepts you learned (one per line)"
                      value={newEntry.keyLearnings}
                      onChange={(e) => setNewEntry({ ...newEntry, keyLearnings: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Challenges</label>
                      <Textarea
                        placeholder="What concepts were difficult to understand?"
                        value={newEntry.challenges}
                        onChange={(e) => setNewEntry({ ...newEntry, challenges: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Next Steps</label>
                      <Textarea
                        placeholder="What do you want to learn or practice next?"
                        value={newEntry.nextSteps}
                        onChange={(e) => setNewEntry({ ...newEntry, nextSteps: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleAddEntry}>
                      <PenTool className="h-4 w-4 mr-2" />
                      Save Entry
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Journal;