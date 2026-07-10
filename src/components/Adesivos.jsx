export function AdesivoEstrela({ className = '' }) {
  return (
    <div
      className={`absolute w-8 h-8 rounded-full bg-sticker-yellow border-2 border-sticker-yellow-border flex items-center justify-center -rotate-12 shadow-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-amber-700">
        <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7z" />
      </svg>
    </div>
  )
}

export function AdesivoCoracao({ className = '' }) {
  return (
    <div
      className={`absolute w-6 h-6 rounded-full bg-sticker-pink border-2 border-sticker-pink-border flex items-center justify-center rotate-12 shadow-sm ${className}`}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-rose-700">
        <path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2 5 5.5 5c2 0 3.3 1.1 4 2.3C10.2 6.1 11.5 5 13.5 5 17 5 18.5 8.4 17 11.7 15 16.4 12 21 12 21z" />
      </svg>
    </div>
  )
}

export function AdesivoBolinha({ className = '' }) {
  return (
    <div
      className={`absolute w-5 h-5 rounded-full bg-sticker-blue border-2 border-sticker-blue-border -rotate-6 shadow-sm ${className}`}
    />
  )
}

export function RabiscoCoracaoFlechado({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute w-8 h-8 opacity-55 ${className}`}>
      <path
        d="M20 30 C20 30 5 22 5 12 C5 6 10 3 15 6 C17 7.5 20 10 20 13 C20 10 23 7.5 25 6 C30 3 35 6 35 12 C35 22 20 30 20 30 Z"
        fill="none"
        stroke="#C9526E"
        strokeWidth="1.5"
      />
      <line x1="20" y1="30" x2="26" y2="38" stroke="#C9526E" strokeWidth="1.5" />
      <path d="M23 33 L29 30 L28 36 Z" fill="#C9526E" />
    </svg>
  )
}
