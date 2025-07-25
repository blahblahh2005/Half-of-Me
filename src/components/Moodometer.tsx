import { useState } from 'react';
import { Card } from '@/components/ui/card';

export type Mood = 'enthusiastic' | 'anxious' | 'annoyed' | 'romantic' | 'distant' | 'guilt';

interface MoodOption {
  id: Mood;
  emoji: string;
  label: string;
  description: string;
}

const moods: MoodOption[] = [
  { id: 'enthusiastic', emoji: '🟡', label: 'Enthusiastic', description: 'Energized and hopeful' },
  { id: 'anxious', emoji: '🟠', label: 'Anxious', description: 'Worried and restless' },
  { id: 'annoyed', emoji: '🔴', label: 'Annoyed', description: 'Frustrated and irritated' },
  { id: 'romantic', emoji: '🌸', label: 'Romantic', description: 'Tender and affectionate' },
  { id: 'distant', emoji: '🔵', label: 'Distant', description: 'Detached and contemplative' },
  { id: 'guilt', emoji: '🟢', label: 'Guilt', description: 'Regretful and seeking peace' },
];

interface MoodometerProps {
  currentMood: Mood | null;
  onMoodChange: (mood: Mood) => void;
}

export default function Moodometer({ currentMood, onMoodChange }: MoodometerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoodSelect = (mood: Mood) => {
    onMoodChange(mood);
    setIsExpanded(false);
  };

  const currentMoodData = moods.find(m => m.id === currentMood);

  return (
    <Card className="mood-card p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">How are you feeling?</h2>
        <p className="text-muted-foreground mb-6">Your mood shapes your digital sanctuary</p>
        
        {currentMoodData && !isExpanded && (
          <div className="mb-4">
            <div className="text-6xl mb-2">{currentMoodData.emoji}</div>
            <h3 className="text-xl font-semibold">{currentMoodData.label}</h3>
            <p className="text-sm text-muted-foreground">{currentMoodData.description}</p>
          </div>
        )}

        {(!currentMoodData || isExpanded) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className="p-4 rounded-lg border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-sm font-medium">{mood.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{mood.description}</div>
              </button>
            ))}
          </div>
        )}

        {currentMoodData && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="mood-button px-6 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300"
          >
            Change Mood
          </button>
        )}
      </div>
    </Card>
  );
}