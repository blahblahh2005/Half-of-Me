import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Mail, Clock, Send, Heart, User } from 'lucide-react';

interface Letter {
  id: string;
  subject: string;
  body: string;
  recipient: string;
  deliveryDate?: Date;
  isTimeCapsule: boolean;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  createdAt: Date;
}

export default function Letters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [letterType, setLetterType] = useState<'unposted' | 'timecapsule'>('unposted');
  const [newLetter, setNewLetter] = useState({
    subject: '',
    body: '',
    recipient: '',
    deliveryDate: '',
  });

  const handleCreateLetter = () => {
    if (!newLetter.subject.trim() || !newLetter.body.trim()) return;
    
    const letter: Letter = {
      id: Date.now().toString(),
      subject: newLetter.subject,
      body: newLetter.body,
      recipient: newLetter.recipient || 'myself',
      deliveryDate: newLetter.deliveryDate ? new Date(newLetter.deliveryDate) : undefined,
      isTimeCapsule: letterType === 'timecapsule',
      status: letterType === 'timecapsule' ? 'scheduled' : 'draft',
      createdAt: new Date(),
    };
    
    setLetters([letter, ...letters]);
    setNewLetter({ subject: '', body: '', recipient: '', deliveryDate: '' });
    setIsCreating(false);
  };

  const handleSendNow = (letterId: string) => {
    // Placeholder for Gmail integration
    console.log('Sending letter now:', letterId);
    setLetters(letters.map(letter => 
      letter.id === letterId 
        ? { ...letter, status: 'sent' as const }
        : letter
    ));
  };

  const getStatusIcon = (status: Letter['status']) => {
    switch (status) {
      case 'draft': return <User className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'sent': return <Send className="w-4 h-4" />;
      case 'failed': return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Letter['status']) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'scheduled': return 'default';
      case 'sent': return 'default';
      case 'failed': return 'destructive';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="w-8 h-8" />
            Letters
          </h2>
          <p className="text-muted-foreground mt-1">
            Unposted messages and time capsules for your future self
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="mood-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          Write Letter
        </Button>
      </div>

      {isCreating && (
        <Card className="mood-card p-6">
          <div className="space-y-4">
            <div>
              <Label>Letter Type</Label>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setLetterType('unposted')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    letterType === 'unposted'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2 inline" />
                  Unposted Letter
                </button>
                <button
                  onClick={() => setLetterType('timecapsule')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    letterType === 'timecapsule'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  <Clock className="w-4 h-4 mr-2 inline" />
                  Time Capsule
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="recipient">
                {letterType === 'unposted' ? 'To (optional)' : 'Recipient Email'}
              </Label>
              <Input
                id="recipient"
                placeholder={letterType === 'unposted' ? 'Leave empty for yourself' : 'your-future-self@email.com'}
                value={newLetter.recipient}
                onChange={(e) => setNewLetter({ ...newLetter, recipient: e.target.value })}
                className="mood-input"
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What's this letter about?"
                value={newLetter.subject}
                onChange={(e) => setNewLetter({ ...newLetter, subject: e.target.value })}
                className="mood-input"
              />
            </div>
            
            {letterType === 'timecapsule' && (
              <div>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  type="datetime-local"
                  value={newLetter.deliveryDate}
                  onChange={(e) => setNewLetter({ ...newLetter, deliveryDate: e.target.value })}
                  className="mood-input"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="body">Message</Label>
              <Textarea
                id="body"
                placeholder="Dear future me..."
                value={newLetter.body}
                onChange={(e) => setNewLetter({ ...newLetter, body: e.target.value })}
                className="mood-input min-h-40"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateLetter} className="mood-button">
                {letterType === 'timecapsule' ? 'Schedule Letter' : 'Save Letter'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4">
        {letters.length === 0 ? (
          <Card className="mood-card p-8 text-center">
            <div className="text-4xl mb-4">💌</div>
            <h3 className="text-xl font-semibold mb-2">No letters yet</h3>
            <p className="text-muted-foreground">
              Write your first letter to yourself or schedule a message for the future
            </p>
          </Card>
        ) : (
          letters.map((letter) => (
            <Card key={letter.id} className="mood-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{letter.subject}</h3>
                    <Badge variant={getStatusColor(letter.status)}>
                      {getStatusIcon(letter.status)}
                      {letter.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>To: {letter.recipient}</p>
                    {letter.deliveryDate && (
                      <p>Deliver: {letter.deliveryDate.toLocaleString()}</p>
                    )}
                    <p>Created: {letter.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-foreground whitespace-pre-wrap mb-4 line-clamp-3">
                {letter.body}
              </p>
              
              <div className="flex gap-2">
                {letter.status === 'draft' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendNow(letter.id)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Full Letter
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}