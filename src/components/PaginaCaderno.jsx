import { useState, useEffect } from 'react'
import { AdesivoEstrela, AdesivoCoracao, AdesivoBolinha, RabiscoCoracaoFlechado } from './Adesivos'

export function PaginaCaderno({ pergunta, indice, total, respostaSalva, onSalvar, onAnterior, onProxima }) {
  const [texto, setTexto] = useState(respostaSalva?.texto || '')

  useEffect(() => {
    setTexto(respostaSalva?.texto || '')
  }, [pergunta?.id])

  if (!pergunta) return null

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div
        className="relative rounded-tl rounded-tr-2xl rounded-br-xl rounded-bl px-6 py-6 pl-11"
        style={{
          background: '#FFFDF5',
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #C9DCEF 28px)',
          boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
        }}
      >
        {/* margem vermelha */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-margin-red" />

        {/* adesivos */}
        <AdesivoEstrela className="-top-3 -left-3" />
        <AdesivoCoracao className="-top-2 right-3" />
        <AdesivoBolinha className="-bottom-2 -right-2" />
        <RabiscoCoracaoFlechado className="top-2 right-10" />

        <p className="font-kalam font-bold text-xs tracking-wide text-slate-400 mb-1.5">
          pergunta {String(indice + 1).padStart(2, '0')}
        </p>

        <p className="font-kalam font-bold text-xl text-ink leading-snug mb-4">
          {pergunta.texto}
        </p>

        {pergunta.tag === 'fixa' ? (
          <input
            type="text"
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onBlur={() => onSalvar(pergunta, texto)}
            placeholder="escreva aqui..."
            className="w-full font-caveat font-bold text-xl text-orkut-blue-dark bg-transparent border border-paper-line rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orkut-blue/40"
          />
        ) : (
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onBlur={() => onSalvar(pergunta, texto)}
            placeholder="escreva sua resposta..."
            rows={4}
            className="w-full font-caveat font-bold text-xl text-orkut-blue-dark bg-transparent border border-paper-line rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-orkut-blue/40"
          />
        )}

        <div className="flex items-center justify-between mt-5 pt-3 border-t border-dashed border-paper-line">
          <span className="font-kalam text-xs text-slate-400">
            pág. {indice + 1}/{total}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`w-4 h-1 rounded-full ${i <= indice ? 'bg-sticker-pink-border' : 'bg-stone-200'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2.5 mt-5">
        <button
          onClick={onAnterior}
          disabled={indice === 0}
          className="font-kalam font-bold text-sm h-10 px-4 rounded-full border-2 border-paper-line bg-paper text-slate-500 disabled:opacity-40"
        >
          ← anterior
        </button>
        <button
          onClick={onProxima}
          className="font-kalam font-bold text-sm h-10 px-5 rounded-full border-2 border-orkut-blue bg-blue-50 text-orkut-blue-dark"
        >
          {indice === total - 1 ? 'última página →' : 'próxima →'}
        </button>
      </div>
    </div>
  )
}
