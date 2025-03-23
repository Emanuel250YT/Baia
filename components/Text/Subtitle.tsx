interface SubtitleProps {
  content: string;
}

export default function Subtitle({ content }: SubtitleProps) {
  return (
    <h2 className="w-[90%] mx-auto text-lg font-bold text-center text-brand-purple">
      {content}
    </h2>
  );
}
