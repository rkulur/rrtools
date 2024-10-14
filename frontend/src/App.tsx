import { Route, Routes } from "react-router-dom";
import MarkdownToHTMLConverterApp from "./tools/markdownToHTMLConverter/MarkdownToHTMLConverterApp";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./Home/components/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tools/markdowntohtmlconverter"
          element={<MarkdownToHTMLConverterApp />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
