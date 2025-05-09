import "./App.css";
import "@xyflow/react/dist/style.css";
import Canvas from "./components/canvas/canvas";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/query-client";
import DialogProvider from "./app/DialogProvider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DialogProvider>
        <Canvas />
      </DialogProvider>
    </QueryClientProvider>
  );
}

export default App;
