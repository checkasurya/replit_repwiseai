import { useState, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Save, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FeedbackEditorProps {
  reportId: string;
  initialFeedback?: string;
  onSave?: (feedback: string) => void;
}

export default function FeedbackEditor({ reportId, initialFeedback = '', onSave }: FeedbackEditorProps) {
  const [feedback, setFeedback] = useLocalStorage(`feedback-${reportId}`, initialFeedback);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    if (feedback !== initialFeedback) {
      setIsAutoSaving(true);
      const timeoutId = setTimeout(() => {
        setLastSaved(new Date());
        setIsAutoSaving(false);
        toast({
          title: 'Draft auto-saved',
          description: 'Your feedback has been automatically saved.',
        });
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [feedback, initialFeedback, toast]);

  const handleSave = () => {
    onSave?.(feedback);
    setLastSaved(new Date());
    toast({
      title: 'Feedback saved',
      description: 'Your feedback has been saved successfully.',
    });
  };

  const formatLastSaved = () => {
    if (!lastSaved) return 'Never';
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - lastSaved.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    return lastSaved.toLocaleTimeString();
  };

  const insertFormatting = (format: string) => {
    // Simple formatting helper - in a real app, you'd use a rich text editor
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = feedback.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'underline':
        formattedText = `_${selectedText || 'underlined text'}_`;
        break;
      case 'list':
        formattedText = `\n• ${selectedText || 'list item'}`;
        break;
      case 'numbered':
        formattedText = `\n1. ${selectedText || 'numbered item'}`;
        break;
    }

    const newFeedback = feedback.substring(0, start) + formattedText + feedback.substring(end);
    setFeedback(newFeedback);
    
    // Restore focus and cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  return (
    <Card className="material-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1049e3]">Manager Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Rich Text Toolbar */}
        <div className="border border-gray-300 rounded-md">
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <div className="flex items-center space-x-2 text-gray-600">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('bold')}
                aria-label="Bold"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('italic')}
                aria-label="Italic"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Italic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('underline')}
                aria-label="Underline"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <Underline className="w-4 h-4" />
              </Button>
              <div className="w-px h-4 bg-gray-300"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('list')}
                aria-label="Bullet list"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting('numbered')}
                aria-label="Numbered list"
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add your coaching feedback here..."
            className="h-48 resize-none focus:outline-none border-0 rounded-t-none"
            aria-label="Manager feedback text area"
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500 flex items-center">
            <Save className="w-4 h-4 mr-1" />
            {isAutoSaving ? 'Auto-saving...' : `Last saved: ${formatLastSaved()}`}
          </p>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-500">
              <History className="w-4 h-4 mr-1" />
              View History
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-1" />
              Save Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
