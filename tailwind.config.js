import { Config } from 'tailwindcss';

const config = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts}',
    './**/*.html'
  ],
  
  // Force include ALL utility classes that might be used
  safelist: [
    // Colors
    { pattern: /^text-/ },
    { pattern: /^bg-/ },
    { pattern: /^border-/ },
    { pattern: /^hover:text-/ },
    { pattern: /^hover:bg-/ },
    { pattern: /^hover:border-/ },
    
    // Layout
    { pattern: /^grid-/ },
    { pattern: /^flex-/ },
    { pattern: /^items-/ },
    { pattern: /^justify-/ },
    { pattern: /^gap-/ },
    { pattern: /^space-/ },
    { pattern: /^p-/ },
    { pattern: /^px-/ },
    { pattern: /^py-/ },
    { pattern: /^pt-/ },
    { pattern: /^pb-/ },
    { pattern: /^pl-/ },
    { pattern: /^pr-/ },
    { pattern: /^m-/ },
    { pattern: /^mx-/ },
    { pattern: /^my-/ },
    { pattern: /^mt-/ },
    { pattern: /^mb-/ },
    { pattern: /^ml-/ },
    { pattern: /^mr-/ },
    
    // Typography
    { pattern: /^text-/ },
    { pattern: /^font-/ },
    { pattern: /^leading-/ },
    
    // Sizing
    { pattern: /^w-/ },
    { pattern: /^h-/ },
    { pattern: /^min-w-/ },
    { pattern: /^min-h-/ },
    { pattern: /^max-w-/ },
    { pattern: /^max-h-/ },
    
    // Effects
    { pattern: /^shadow-/ },
    { pattern: /^blur-/ },
    { pattern: /^backdrop-/ },
    { pattern: /^opacity-/ },
    
    // Borders & Rounded
    { pattern: /^rounded-/ },
    { pattern: /^border-/ },
    { pattern: /^divide-/ },
    
    // Position
    { pattern: /^absolute/ },
    { pattern: /^relative/ },
    { pattern: /^fixed/ },
    { pattern: /^sticky/ },
    { pattern: /^top-/ },
    { pattern: /^bottom-/ },
    { pattern: /^left-/ },
    { pattern: /^right-/ },
    { pattern: /^inset-/ },
    { pattern: /^z-/ },
    
    // Transitions & Transforms
    { pattern: /^transition-/ },
    { pattern: /^duration-/ },
    { pattern: /^ease-/ },
    { pattern: /^animate-/ },
    { pattern: /^transform/ },
    { pattern: /^scale-/ },
    { pattern: /^rotate-/ },
    { pattern: /^translate-/ },
    
    // Interactive states
    { pattern: /^hover:/ },
    { pattern: /^focus:/ },
    { pattern: /^active:/ },
    { pattern: /^group-hover:/ },
    
    // Responsive patterns
    { pattern: /^sm:/ },
    { pattern: /^md:/ },
    { pattern: /^lg:/ },
    { pattern: /^xl:/ },
    
    // Overflow
    { pattern: /^overflow-/ },
    
    // Specifically critical classes from your HTML
    'text-emerald-100', 'text-emerald-200', 'text-emerald-300', 'text-emerald-400', 'text-emerald-500', 
    'text-emerald-600', 'text-fuchsia-500', 'bg-neutral-900', 'bg-neutral-900/80', 'bg-neutral-950',
    'bg-emerald-700', 'hover:bg-emerald-600', 'hover:bg-emerald-800', 'hover:text-emerald-600',
    'backdrop-blur-md', 'shadow-md', 'min-h-screen', 'container', 'mx-auto',
    'grid-cols-1', 'md:grid-cols-2', 'md:gap-x-24', 'md:gap-x-32', 'md:gap-y-8',
    'flex-col', 'justify-between', 'justify-center', 'items-center',
    'border-emerald-400', 'border-emerald-500', 'border-emerald-800/30',
    'rounded-md', 'rounded-2xl', 'rounded-3xl', 'rounded-full',
    'text-center', 'text-left', 'md:text-right',
    'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl',
    'font-bold', 'font-semibold', 'font-mono',
    'fixed', 'absolute', 'relative', 'inset-0',
    'max-w-sm', 'max-w-2xl', 'max-w-3xl',
    'overflow-hidden', 'resize-none',
    'z-0', 'z-10', 'z-50',
    'list-disc',
    'pt-16', 'pb-8', 'py-8', 'px-4', 'py-3', 'px-8', 'py-16',
    'space-x-12', 'space-y-4',
    'blur-sm', 'opacity-50',
    'animate-spin',
    'bg-red-900/50', 'border-red-700', 'text-red-200', 'text-white',
    'hidden', 'md:flex',
    'group-hover:translate-x-1'
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;