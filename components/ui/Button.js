export default function Button({children,variant='primary',className='',...props}){
  const base='px-5 py-2 rounded-xl font-semibold transition min-h-[44px]';
  const styles={primary:'bg-cyan-500 text-black hover:bg-cyan-400',ghost:'bg-white/10 hover:bg-white/20',outline:'border border-white/20 hover:bg-white/10'};
  return <button className={`${base} ${styles[variant]||styles.primary} ${className}`} {...props}>{children}</button>;
}