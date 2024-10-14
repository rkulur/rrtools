import Navbar from "../../components/Navbar";
import Hero from "./components/Hero";

const MarkdownToHTMLConverterApp = () => {
  return (
    <>
      <Navbar title="Markdown to HTML converter">
        <p className="hidden lg:block 3xl:hidden absolute top-[1.6rem] left-[37.4%] text-[10px]">
          Simple
        </p>
      </Navbar>
      <div className="flex flex-col items-center">
        <Hero />
      </div>
    </>
  );
};

export default MarkdownToHTMLConverterApp;
