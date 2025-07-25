import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Mail, Heart, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalIdeas: number;
  publicIdeas: number;
  totalLetters: number;
  scheduledLetters: number;
  currentStreak: number;
  totalEntries: number;
}

interface DashboardProps {
  onNavigate: (section: 'ideas' | 'letters') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  // Mock stats - in real app, these would come from actual data
  const [stats] = useState<DashboardStats>({
    totalIdeas: 0,
    publicIdeas: 0,
    totalLetters: 0,
    scheduledLetters: 0,
    currentStreak: 1,
    totalEntries: 0,
  });

  const quickActions = [
    {
      title: 'Quick Idea',
      description: 'Capture a fleeting thought',
      icon: Lightbulb,
      action: () => onNavigate('ideas'),
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Write Letter',
      description: 'Message your future self',
      icon: Mail,
      action: () => onNavigate('letters'),
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Your Digital Diary</h1>
        <p className="text-xl text-muted-foreground">
          A sanctuary for your thoughts, dreams, and future messages
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="mood-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalIdeas}</div>
          <div className="text-sm text-muted-foreground">Ideas Captured</div>
        </Card>
        <Card className="mood-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalLetters}</div>
          <div className="text-sm text-muted-foreground">Letters Written</div>
        </Card>
        <Card className="mood-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.scheduledLetters}</div>
          <div className="text-sm text-muted-foreground">Time Capsules</div>
        </Card>
        <Card className="mood-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{stats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="mood-card p-6 cursor-pointer hover:scale-105 transition-all duration-300" onClick={action.action}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Inspiration Section */}
      <Card className="mood-card p-8 text-center">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-2">Today's Inspiration</h3>
        <p className="text-lg text-muted-foreground italic mb-4">
          "The best time to plant a tree was 20 years ago. The second best time is now."
        </p>
        <p className="text-sm text-muted-foreground">
          Start your creative journey today. Every idea, every letter, every moment matters.
        </p>
      </Card>

      {/* Recent Activity Preview */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <Card className="mood-card p-8 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold mb-2">Your digital garden awaits</h3>
          <p className="text-muted-foreground mb-6">
            Start creating to see your recent activity here
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => onNavigate('ideas')} className="mood-button">
              <Lightbulb className="w-4 h-4 mr-2" />
              Create First Idea
            </Button>
            <Button onClick={() => onNavigate('letters')} variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Write First Letter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}