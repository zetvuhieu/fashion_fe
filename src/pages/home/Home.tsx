import SlideShow from "./components/slide";
import { LazyOutStanding } from "@/lazy/home/lazyOutstanding";
import { LazyDealHot } from "@/lazy/home/lazyDealHot";
import PolicyComponent from "./components/policy";

function App() {
  return (
    <>
      <SlideShow />
      <LazyOutStanding />
      <LazyDealHot />
      <PolicyComponent />
    </>
  );
}

export default App;
