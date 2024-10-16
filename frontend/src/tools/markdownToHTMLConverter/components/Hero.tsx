import axios from "axios";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "./previewHtml.css";
import initialMd from "./initialMd";
import Loader from "../../../components/Loader";

const Hero = () => {
  const [resultState, setResultState] = useState<"preview" | "raw">("preview");
  const [htmlStr, setHtmlStr] = useState("");
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const textArea = useRef<null | HTMLTextAreaElement>(null);
  const previewHTML = useRef<null | HTMLDivElement>(null);

  const API = import.meta.env.VITE_TOOLS_API;

  const handleMarkdownToHTMLConversion = () => {
    const markdownContent = textArea.current?.value;
    setLoaderVisibility(true);
    if (previewHTML.current) {
      previewHTML.current.innerText = "";
      previewHTML.current.innerHTML = "";
    }
    axios
      .post(
        `${API}/mdtohtml`,
        {
          md: markdownContent,
        },
        {
          withCredentials: false,
        },
      )
      .then((res) => {
        const data = res.data as { success: boolean; htmlStr: string };
        setLoaderVisibility(false);
        setHtmlStr(data.htmlStr);
        if (previewHTML.current) {
          if (resultState === "preview") {
            previewHTML.current.innerHTML = data.htmlStr;
          } else {
            previewHTML.current.innerText = data.htmlStr;
          }
        }
      });
  };

  const handleTabInsertion = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      if (textArea.current) {
        const start = textArea.current.selectionStart;
        const end = textArea.current.selectionEnd;
        textArea.current.value =
          textArea.current.value.substring(0, start) +
          "\t" +
          textArea.current.value.substring(end);
        textArea.current.selectionStart = start + 1;
        textArea.current.selectionEnd = start + 1;
        textArea.current.focus();
      }
    }
  };

  const handleCopyFunctionality = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(htmlStr).then(() => {
        alert("HTML copied to Clipboard");
      });
    }
  };

  useEffect(() => {
    handleMarkdownToHTMLConversion();
  }, []);

  return (
    <main className="px-8 py-6 w-full min-h-5/6 h-full max-w-[1440px] lg:gap-8 md:mt-32 flex flex-col items-center justify-center">
      <div className="grid grid-row-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-4 lg:gap-10 h-fit w-full">
        <div className="relative border border-white">
          <p className="border-black border-x border-t w-fit px-4 py-2 rounded-t-md border-b border-b-white absolute bg-white top-0">
            Enter Markdown
          </p>
          <div className="p-4 border border-black min-h-52 h-[25rem] max-h-[30rem]  mt-[2.56rem] rounded-r-md rounded-b-md font-['JetBrains_Mono'] ">
            <textarea
              ref={textArea}
              defaultValue={initialMd}
              className="w-full h-full outline-none border border-gray-300 resize-none p-2 rounded-md"
              wrap="soft"
              onKeyDown={handleTabInsertion}
            ></textarea>
          </div>
        </div>
        <div className="h-16 grid place-items-center md:hidden">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 active:scale-95 "
            onClick={handleMarkdownToHTMLConversion}
          >
            Convert
          </button>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 flex">
            <p
              className={`w-fit px-4 py-2 rounded-t-md bg-white border-b z-10 border-black cursor-pointer select-none hover:bg-gray-200 ${resultState === "preview" && "border-black border-x border-t border-b-white"}`}
              onClick={() => {
                setResultState("preview");
                if (previewHTML.current) {
                  previewHTML.current.innerHTML = htmlStr;
                }
              }}
            >
              Preview
            </p>
            <p
              className={`w-fit px-4 py-2 rounded-t-md bg-white border-b z-10 border-black cursor-pointer select-none hover:bg-gray-200  ${resultState === "raw" && "border-black border-x border-t  border-b border-b-white"}`}
              onClick={() => {
                setResultState("raw");
                if (previewHTML.current) {
                  previewHTML.current.innerText = htmlStr;
                }
              }}
            >
              Raw
            </p>
          </div>
          <div className="p-4 border border-black min-h-52 h-[25rem] max-h-[30rem] mt-[2.56rem] rounded-r-md rounded-b-md relative">
            {loaderVisibility && (
              <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center font-bold text-2xl">
                <Loader />
              </div>
            )}
            <div
              ref={previewHTML}
              id="preview-html-container"
              className="border border-gray-300 h-full w-full break-words rounded-md overflow-auto p-2 text-wrap"
            ></div>
            {resultState === "raw" && (
              <button
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 active:scale-95 absolute top-[1.5rem] right-[2.28rem]"
                onClick={handleCopyFunctionality}
              >
                Copy
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden h-16 md:grid place-items-center">
        <button
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 active:scale-95"
          onClick={handleMarkdownToHTMLConversion}
        >
          Convert
        </button>
      </div>
    </main>
  );
};

export default Hero;
