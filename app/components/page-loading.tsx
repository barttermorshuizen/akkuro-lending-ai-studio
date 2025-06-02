import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="h-full w-full flex justify-center items-center bg-background">
      <Loader2 className="size-10 animate-spin text-white" />
    </div>
  );
}
