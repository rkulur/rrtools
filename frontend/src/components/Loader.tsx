const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="animate-spin w-fit">
        <div className="bg-black relative h-8 w-8 rounded-full before:absolute before:top-[3.5px] before:left-[3.7px] before:h-6 before:w-6 before:bg-white before:rounded-full after:absolute after:h-2 after:w-2 after:bg-white after:rotate-45 after:top-0.5 after:left-0.5 after:rounded-full"></div>
      </div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loader;
