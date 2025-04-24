const TitleHeader = ({ title, sub, className = "" }) => {
  return (
    <div className={`mb-20 text-center ${className}`}>
      <span className="text-blue-400 font-medium uppercase tracking-wider mb-3 inline-block">
        {title}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        {sub}
      </h2>
      <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"/>
    </div>
  );
};

export default TitleHeader;
