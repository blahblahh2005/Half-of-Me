import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Lock, Globe, Lightbulb, Users } from 'lucide-react';

interface Idea {
  id: string;
  title: string;
  content: string;
  isPublic: boolean;
  createdAt: Date;
  category: 'poem' | 'story' | 'code' | 'thought' | 'other';
}

const categories = [
  { value: 'poem', label: 'Poem', icon: '📝' },
  { value: 'story', label: 'Story', icon: '📚' },
  { value: 'code', label: 'Code', icon: '💻' },
  { value: 'thought', label: 'Thought', icon: '💭' },
  { value: 'other', label: 'Other', icon: '✨' },
] as const;

export default function IncompleteIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newIdea, setNewIdea] = useState({
    title: '',
    content: '',
    isPublic: false,
    category: 'thought' as Idea['category'],
  });

  const handleCreateIdea = () => {
    if (!newIdea.title.trim() || !newIdea.content.trim()) return;
    
    const idea: Idea = {
      id: Date.now().toString(),
      title: newIdea.title,
      content: newIdea.content,
      isPublic: newIdea.isPublic,
      category: newIdea.category,
      createdAt: new Date(),
    };
    
    setIdeas([idea, ...ideas]);
    setNewIdea({ title: '', content: '', isPublic: false, category: 'thought' });
    setIsCreating(false);
  };

  const handleGetAICompletion = (ideaId: string) => {
    // Placeholder for AI completion functionality
    console.log('Getting AI completion for idea:', ideaId);
    // This will be implemented with OpenAI integration
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Lightbulb className="w-8 h-8" />
            Incomplete Ideas
          </h2>
          <p className="text-muted-foreground mt-1">
            Your creative playground for unfinished thoughts
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="mood-button"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Idea
        </Button>
      </div>

      {isCreating && (
        <Card className="mood-card p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's on your mind?"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                className="mood-input"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setNewIdea({ ...newIdea, category: cat.value })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      newIdea.category === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Start writing your incomplete idea..."
                value={newIdea.content}
                onChange={(e) => setNewIdea({ ...newIdea, content: e.target.value })}
                className="mood-input min-h-32"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={newIdea.isPublic}
                onCheckedChange={(checked) => setNewIdea({ ...newIdea, isPublic: checked })}
              />
              <Label htmlFor="public" className="flex items-center gap-2">
                {newIdea.isPublic ? (
                  <>
                    <Globe className="w-4 h-4" />
                    Public - Others can contribute
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Private - Just for you
                  </>
                )}
              </Label>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateIdea} className="mood-button">
                Save Idea
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
        {ideas.length === 0 ? (
          <Card className="mood-card p-8 text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-2">No ideas yet</h3>
            <p className="text-muted-foreground">
              Start your creative journey by adding your first incomplete idea
            </p>
          </Card>
        ) : (
          ideas.map((idea) => (
            <Card key={idea.id} className="mood-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{idea.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">
                      {categories.find(c => c.value === idea.category)?.icon}{' '}
                      {categories.find(c => c.value === idea.category)?.label}
                    </Badge>
                    <Badge variant={idea.isPublic ? "default" : "outline"}>
                      {idea.isPublic ? (
                        <><Globe className="w-3 h-3 mr-1" /> Public</>
                      ) : (
                        <><Lock className="w-3 h-3 mr-1" /> Private</>
                      )}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {idea.createdAt.toLocaleDateString()}
                </div>
              </div>
              
              <p className="text-foreground whitespace-pre-wrap mb-4">
                {idea.content}
              </p>
              
              <div className="flex gap-2">
                {!idea.isPublic && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGetAICompletion(idea.id)}
                  >
                    ✨ Get AI Completion
                  </Button>
                )}
                {idea.isPublic && (
                  <Button variant="outline" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    View Contributions
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}