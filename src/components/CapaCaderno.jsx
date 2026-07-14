import { AdesivoEstrela, AdesivoCoracao, AdesivoBolinha, RabiscoCoracaoFlechado } from './Adesivos'

const ANEIS = Array.from({ length: 15 })

export function CapaCaderno({ onAbrir }) {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div
        className="relative rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl min-h-[500px] flex flex-col justify-center py-10 px-6 pl-14 shadow-lg overflow-visible"
        style={{ background: '#FFFDF5' }}
      >
        {/* fundo pontilhado */}
        <svg className="absolute inset-0 w-full h-full rounded-tl rounded-tr-2xl rounded-br-2xl rounded-bl" preserveAspectRatio="none">
          <defs>
            <pattern id="pontos-capa" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="11" cy="11" r="1.3" fill="#C9DCEF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pontos-capa)" />
        </svg>

        {/* espiral */}
        <div className="absolute -left-2 top-3 bottom-3 w-7 flex flex-col justify-between z-10">
          {ANEIS.map((_, i) => (
            <div
              key={i}
              className="w-7 h-3.5 border-r-0 rounded-l-full"
              style={{ borderColor: '#185FA5', borderWidth: '3px', borderStyle: 'solid', borderRightWidth: 0 }}
            />
          ))}
        </div>
        <div className="absolute left-2 top-2 bottom-2 w-1.5 bg-gradient-to-r from-black/5 to-transparent z-[5]" />

        {/* adesivos */}
        <AdesivoEstrela className="-top-3 right-7 z-20" />
        <AdesivoCoracao className="bottom-10 right-4 z-20" />
        <AdesivoBolinha className="top-20 right-11 z-20" />
        <RabiscoCoracaoFlechado className="bottom-16 left-14 z-20" />

        {/* conteúdo */}
        <div className="relative z-20">
          <p className="font-caveat font-bold text-5xl text-orkut-blue-dark text-center leading-none mb-1">
            Replay
          </p>
          <p className="font-kalam text-xs text-slate-400 text-center uppercase tracking-widest mb-8">
            geração 99/00
          </p>

          <p className="font-kalam font-bold text-xl text-ink leading-relaxed text-center mb-5">
            lembra de mim? ... voltei... sem glitter, sem cheiro de borracha perfumada, só pra saber como você anda.
          </p>

          <p className="font-caveat font-bold text-lg text-orkut-blue-dark leading-snug text-center mb-7">
            pode escrever à vontade — o que fica aqui, fica só entre a gente.
          </p>

          <div className="flex justify-center">
            <button
              onClick={onAbrir}
              className="font-kalam font-bold text-sm h-11 px-6 rounded-full border-none bg-orkut-blue text-paper"
            >
              abrir o caderninho →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}