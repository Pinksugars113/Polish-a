import { motion } from "framer-motion";
import { Trash2, Sparkles, Pencil } from "lucide-react";
import type { Polish } from "@shared/schema";
import { useDeletePolish } from "@/hooks/use-polishes";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getFinishStyles } from "@/lib/color-utils";

interface PolishCardProps {
  polish: Polish;
  index?: number;
}

export function PolishCard({ polish, index = 0 }: PolishCardProps) {
  const deleteMutation = useDeletePolish();
  const styles = getFinishStyles(polish.finish, polish.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white rounded-3xl p-6 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Color Swatch */}
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full shadow-inner border-4 ring-1 ring-black/5 overflow-hidden transition-colors"
            style={{ 
              backgroundColor: polish.color,
              borderColor: styles.isLight ? '#e5e7eb' : '#ffffff',
              ...(styles.isCateye ? { background: styles.background } : {}),
              opacity: styles.opacity ?? 1,
              filter: styles.filter ?? "none",
              boxShadow: styles.boxShadow ?? "inset 0 0 10px rgba(0,0,0,0.05)"
            }}
          >
            {(styles.backgroundImage) && (
              <div 
                className="absolute inset-0 opacity-40"
                style={{ 
                  backgroundImage: styles.backgroundImage,
                  backgroundSize: styles.backgroundSize 
                }}
              />
            )}
          </div>
          {/* Bottle shine effect */}
          {styles.showShine && (
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/30 blur-sm pointer-events-none" />
          )}
        </div>

        <div className="w-full space-y-1">
          <h3 className="font-display text-xl font-bold text-gray-900 truncate">{polish.name}</h3>
          <p className="text-sm font-medium text-primary uppercase tracking-wider">{polish.brand}</p>
        </div>
        
        <Badge variant="secondary" className="rounded-full px-4 py-1 bg-secondary/50 text-secondary-foreground border-transparent">
          {polish.finish}
        </Badge>

        {polish.notes && (
          <p className="text-xs text-muted-foreground line-clamp-2 px-2 italic">
            "{polish.notes}"
          </p>
        )}

        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link href={`/edit/${polish.id}`}>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display">Remove Polish?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove <span className="font-semibold text-foreground">{polish.name}</span> from your collection permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteMutation.mutate(polish.id)}
                  className="bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}
