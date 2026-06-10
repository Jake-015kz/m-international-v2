interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CTAButton({ children, onClick }: CTAButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-black text-white rounded-full font-medium text-base hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
    >
      {children}
    </button>
  );
}
