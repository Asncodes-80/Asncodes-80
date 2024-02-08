const Content: React.FC<{
  title: string;
  content: string;
  onClick: () => void;
}> = ({ title, content, onClick }) => {
  return (
    <div className="mb-[30px] rounded-md gallery-item" onClick={onClick}>
      <h5 className="text-large text-secondary-foreground mb-[20px]">
        {title}
      </h5>
      <p className="text-medium">{content}</p>
    </div>
  );
};

export default Content;
