import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Hero from "./components/Hero";

const MarkdownToHTMLConverterApp = () => {
  useEffect(() => {
    document.title = "Markdown to HTML converter";

    const existingIcon = document.querySelector("link[rel='icon']");
    const existingIconCopy = existingIcon;
    if (existingIcon) {
      existingIcon.remove();
    }

    const newIcon = document.createElement("link");
    newIcon.rel = "icon";
    newIcon.href = "../../../public/mdtohtmllogo.png";
    document.head.appendChild(newIcon);

    return () => {
      newIcon.remove();
      if (existingIconCopy) {
        document.head.appendChild(existingIconCopy);
      }
    };
  }, []);
  return (
    <>
      <Navbar title="Markdown to HTML converter"></Navbar>
      <div className="flex flex-col items-center">
        <Hero />
      </div>
    </>
  );
};

export default MarkdownToHTMLConverterApp;
