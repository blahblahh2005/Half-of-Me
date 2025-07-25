import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Moodometer, { type Mood } from '@/components/Moodometer';
import Dashboard from '@/components/Dashboard';
import IncompleteIdeas from '@/components/IncompleteIdeas';
import Letters from '@/components/Letters';
import { Home, Lightbulb, Mail, Settings } from 'lucide-react';

type ActiveSection = 'dashboard' | 'ideas' | 'letters';

const Index = () => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  // Apply mood theme to document
  useEffect(() => {
    if (currentMood) {
      document.documentElement.setAttribute('data-mood', currentMood);
    } else {
      document.documentElement.removeAttribute('data-mood');
    }
  }, [currentMood]);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'ideas', label: 'Ideas', icon: Lightbulb },
    { id: 'letters', label: 'Letters', icon: Mail },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case 'ideas':
        return <IncompleteIdeas />;
      case 'letters':
        return <Letters />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <Card className="mood-card p-4 mb-6">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Card>

            {/* Moodometer in Sidebar */}
            <Moodometer 
              currentMood={currentMood} 
              onMoodChange={setCurrentMood} 
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
