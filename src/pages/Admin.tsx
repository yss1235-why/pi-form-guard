import React, { useState, useEffect } from "react";
import { isPiBrowser } from "@/utils/browserDetection";
import { getSubmissions, clearSubmissions, Submission } from "@/utils/dataStorage";
import BrowserGate from "@/components/BrowserGate";
import PiLogo from "@/components/PiLogo";
import { Database, Trash2, RefreshCw, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  if (!isPiBrowser()) {
    return <BrowserGate />;
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = getSubmissions();
      setSubmissions(data);
      setIsLoading(false);
    }, 300);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all submissions? This action cannot be undone.")) {
      clearSubmissions();
      setSubmissions([]);
      toast({
        title: "Data Cleared",
        description: "All submissions have been permanently removed.",
        className: "border-destructive/50 bg-destructive/10",
      });
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <PiLogo size="md" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and review all form submissions
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/70 rounded-2xl shadow-glass border border-white/20 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Database className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Submissions</h2>
                <p className="text-sm text-muted-foreground">
                  Total: {submissions.length} {submissions.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={loadSubmissions}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="border-destructive/30 hover:bg-destructive/10 text-destructive"
                disabled={submissions.length === 0}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Submissions Yet</h3>
              <p className="text-muted-foreground text-sm">
                Submissions will appear here once users submit the form
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[500px] rounded-lg border border-border">
              <Table>
                <TableHeader className="bg-muted/30 sticky top-0">
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        ID
                      </div>
                    </TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="w-[200px]">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Timestamp
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id} className="hover:bg-muted/20">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{submission.id.slice(-6)}
                      </TableCell>
                      <TableCell className="font-medium">{submission.content}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(submission.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/" 
            className="text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            ← Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;
