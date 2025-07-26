import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Moodometer, { type Mood } from "./Moodometer";
import IncompleteIdeas from "./IncompleteIdeas";
import Letters from "./Letters";
import Dashboard from "./Dashboard";

interface DiaryPage {
  id: string;
  title: string;
  component: ReactNode;
  icon?: ReactNode;
}

export const FlippableDiary = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [mood, setMood] = useState<Mood>("enthusiastic");
  const [showMoodTracker, setShowMoodTracker] = useState(false);

  // Apply mood theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-mood', mood);
  }, [mood]);

  const handleNavigate = (section: 'ideas' | 'letters') => {
    if (section === 'ideas') {
      flipToPage(2); // Ideas page
    } else if (section === 'letters') {
      flipToPage(3); // Letters page
    }
  };

  const pages: DiaryPage[] = [
    {
      id: "cover",
      title: "My Digital Diary",
      component: (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <BookOpen className="w-20 h-20 mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4 text-foreground">My Digital Diary</h1>
          <p className="text-xl text-muted-foreground mb-8">A space for your thoughts, moods, and memories</p>
          <Button 
            onClick={() => flipToPage(1)} 
            className="mood-button text-lg px-8 py-3"
          >
            Open Diary
          </Button>
        </div>
      ),
    },
    {
      id: "dashboard",
      title: "Dashboard",
      component: <Dashboard onNavigate={handleNavigate} />,
    },
    {
      id: "ideas",
      title: "Incomplete Ideas",
      component: <IncompleteIdeas />,
    },
    {
      id: "letters",
      title: "Letters & Time Capsules",
      component: <Letters />,
    },
  ];

  const flipToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < pages.length && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      flipToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      flipToPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" data-mood={mood}>
      <div className="relative max-w-6xl w-full">
        {/* Diary Book Container */}
        <div className="relative mx-auto" style={{ perspective: "2000px" }}>
          {/* Book Shadow */}
          <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-4 scale-95" />
          
          {/* Book Pages */}
          <div className="relative bg-card rounded-2xl shadow-2xl overflow-hidden book-container">
            {/* Book Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-primary/20 to-primary/40 border-r border-border" />
            
            {/* Set Mood Button - Always visible when diary is open */}
            {currentPage > 0 && (
              <div className="absolute top-4 right-4 z-10">
                <Button
                  onClick={() => setShowMoodTracker(!showMoodTracker)}
                  variant="outline"
                  size="sm"
                  className="mood-button"
                >
                  Set Mood
                </Button>
              </div>
            )}
            
            {/* Mood Tracker Popup */}
            {showMoodTracker && currentPage > 0 && (
              <div className="absolute top-16 right-4 z-20">
                <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border p-2 shadow-lg">
                  <Moodometer currentMood={mood} onMoodChange={(newMood) => {
                    setMood(newMood);
                    setShowMoodTracker(false);
                  }} />
                </div>
              </div>
            )}
            
            {/* Current Page */}
            <div 
              className={`diary-page ${isFlipping ? 'flipping' : ''}`}
              style={{
                transform: isFlipping ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                transformOrigin: 'left center',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="p-8 pl-16 min-h-[600px] h-full">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                  <h2 className="text-2xl font-semibold text-foreground">
                    {pages[currentPage]?.title}
                  </h2>
                </div>

                {/* Page Content */}
                <div className="h-full">
                  {pages[currentPage]?.component}
                </div>
              </div>
            </div>

            {/* Page Lines (Notebook Effect) */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-16 right-8 border-b border-border/20"
                  style={{ top: `${120 + i * 25}px` }}
                />
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 0 || isFlipping}
                className="mood-button"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              {/* Page Indicators */}
              <div className="flex items-center gap-2 px-4">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => flipToPage(index)}
                    disabled={isFlipping}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPage 
                        ? 'bg-primary scale-125' 
                        : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === pages.length - 1 || isFlipping}
                className="mood-button"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Navigation Tabs */}
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {pages.slice(1).map((page, index) => (
            <Button
              key={page.id}
              variant={currentPage === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => flipToPage(index + 1)}
              disabled={isFlipping}
              className="mood-button"
            >
              {page.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};