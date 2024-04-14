import { QueryClient, QueryClientProvider } from "react-query";
import MainRouter from "./utils/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
}

export default App;
