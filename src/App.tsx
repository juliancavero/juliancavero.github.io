import { QueryClient, QueryClientProvider } from "react-query";
import { TokenProvider } from "./utils/TokenContext";
import MainRouter from "./utils/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <MainRouter />
      </TokenProvider>
    </QueryClientProvider>
  );
}

export default App;
