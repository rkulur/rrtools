import Card from "./Card";
import tools from "../../tools";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Navbar title="RR Tools" />
        <main className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-6 py-8 gap-4 justify-items-center">
          {tools.map((tool) => (
            <Card title={tool.title} imgSrc={tool.imgSrc} path={tool.path} />
          ))}
        </main>
      </div>
    </>
  );
};

export default Home;
