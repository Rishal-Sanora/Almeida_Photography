function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/60
        backdrop-blur-lg
        border border-pink-200/50
        shadow-[0_4px_20px_rgba(236,72,153,0.05)]
        rounded-xl
        transition-all duration-300
        hover:border-pink-300
        hover:shadow-[0_8px_30px_rgba(236,72,153,0.15)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
export default GlassCard;