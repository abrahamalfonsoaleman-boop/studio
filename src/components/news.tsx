"use client"
import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { getSummary } from "@/app/actions"
import { Newspaper, Sparkles } from "lucide-react"

type Article = {
  title: string;
  image: string;
  image_hint: string;
  description: string;
  content: string;
};

const newsData: Article[] = [
  {
    title: "Club Secures Victory in Thrilling Derby",
    image: "https://placehold.co/600x400.png",
    image_hint: "team celebration",
    description: "A last-minute goal sealed the win against our rivals...",
    content: "In a nail-biting encounter that had fans on the edge of their seats, Club de Lago clinched a dramatic 2-1 victory over their fiercest rivals, the City Rovers. The match, played under the floodlights of the Grand Stadium, was a testament to the team's resilience and tactical prowess. The first half saw both teams locked in a tight battle, with few clear-cut chances. The deadlock was broken in the 55th minute when our star striker, Leo Martinez, capitalized on a defensive error to put us ahead. However, the Rovers responded quickly, equalizing from a set-piece just ten minutes later. The game seemed destined for a draw until the 92nd minute, when substitute midfielder, Clara Jensen, unleashed a stunning long-range shot that found the top corner of the net, sending the home crowd into a frenzy. Coach David Chen praised the team's 'unwavering spirit' and dedicated the win to the loyal supporters who filled the stadium.",
  },
  {
    title: "New Training Facility Opens",
    image: "https://placehold.co/600x400.png",
    image_hint: "training facility",
    description: "The club unveils its state-of-the-art training center...",
    content: "Club de Lago has officially opened its new, multi-million dollar training facility, a project that signals the club's ambition for future success. The 'Lago Performance Center' boasts two full-size pitches, a world-class gym, a hydrotherapy pool, and advanced sports science laboratories. The opening ceremony was attended by club officials, players, and local dignitaries. Club President, Maria Sanchez, described the facility as 'a game-changer' that will provide our players with the best possible environment to develop and excel. The center will not only serve the first team but also the club's youth academy, nurturing the next generation of talent. This investment underscores the club's commitment to long-term growth and establishing itself as a powerhouse in the sport.",
  },
];

export function News() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!selectedArticle) return;
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await getSummary(selectedArticle.content);
      if(result.summary) {
        setSummary(result.summary);
      } else {
        throw new Error("Failed to generate summary.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not generate summary. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDialog = (article: Article) => {
    setSelectedArticle(article);
    setSummary(null);
    setIsLoading(false);
  }

  return (
    <section id="news" className="w-full">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Latest News</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Stay up-to-date with the latest stories from Club de Lago.
        </p>
      </div>
      <div className="mx-auto mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {newsData.map((article, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <Image
                src={article.image}
                alt={article.title}
                data-ai-hint={article.image_hint}
                width={600}
                height={400}
                className="rounded-t-lg object-cover aspect-[3/2]"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => openDialog(article)} className="w-full">
                <Newspaper className="mr-2 h-4 w-4" />
                Read More & Summarize
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={!!selectedArticle} onOpenChange={(isOpen) => !isOpen && setSelectedArticle(null)}>
        <DialogContent className="sm:max-w-3xl">
          {selectedArticle && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline">{selectedArticle.title}</DialogTitle>
                <DialogDescription>Full article below. Use our AI tool to get a quick summary.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Full Story</h3>
                  <ScrollArea className="h-72 pr-4">
                    <p className="text-sm text-muted-foreground">{selectedArticle.content}</p>
                  </ScrollArea>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold mb-2">AI Summary</h3>
                  <div className="flex-grow rounded-md border border-dashed p-4 flex flex-col justify-center items-center bg-muted/50">
                    {isLoading ? (
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    ) : summary ? (
                      <p className="text-sm">{summary}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center">Click the button to generate a summary.</p>
                    )}
                  </div>
                  <Button onClick={handleSummarize} disabled={isLoading} className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isLoading ? "Generating..." : "Summarize with AI"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
