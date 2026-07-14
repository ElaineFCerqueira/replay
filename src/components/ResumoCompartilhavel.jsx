import { useState, useMemo } from 'react'
import { AdesivoEstrela } from './Adesivos'

const MAX_DESTAQUES = 5

export function SeletorDestaques({ respostas, onConfirmar }) {
  const lista = useMemo(
    () => Object.entries(respostas).filter(([, r]) => r.texto?.trim()),
    [respostas]
  )
  const [selecionadas, setSelecionadas] = useState(() => lista.slice(0, MAX_DESTAQUES).map(([id]) => id))

  function alternar(id) {
    setSelecionadas(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX_DESTAQUES) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <p className="font-kalam font-bold text-lg text-ink mb-1">escolha até {MAX_DESTAQUES} respostas</p>
      <p className="font-kalam text-sm text-slate-500 mb-4">elas vão aparecer em destaque no seu resumo pra compartilhar</p>

      <div className="space-y-2.5">
        {lista.map(([id, r]) => {
          const marcado = selecionadas.includes(id)
          return (
            <button
              key={id}
              onClick={() => alternar(id)}
              className={`w-full text-left rounded-xl border-2 p-3 transition-colors ${
                marcado ? 'border-orkut-blue bg-blue-50' : 'border-paper-line bg-paper'
              }`}
            >
              <p className="font-kalam text-xs text-slate-400 mb-1">{r.pergunta}</p>
              <p className="font-caveat font-bold text-lg text-orkut-blue-dark">{r.texto}</p>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onConfirmar(selecionadas)}
        disabled={selecionadas.length === 0}
        className="w-full font-kalam font-bold text-sm h-11 mt-5 rounded-full border-2 border-orkut-blue bg-orkut-blue text-paper disabled:opacity-40"
      >
        montar meu cartão
      </button>
    </div>
  )
}

export function CartaoResumo({ respostas, idsDestaque }) {
  const destaques = idsDestaque.map(id => respostas[id]).filter(Boolean)
  const rotacoes = ['-rotate-6', 'rotate-4', 'rotate-2']

  async function compartilhar() {
    const texto = destaques.map(r => `${r.pergunta}\n${r.texto}`).join('\n\n')
    const conteudo = `meu Replay · geração 99/00\n\n${texto}\n\n${window.location.origin}`

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Replay', text: conteudo })
      } catch (e) {
        // pessoa cancelou o compartilhamento, sem problema
      }
    } else {
      try {
        await navigator.clipboard.writeText(conteudo)
        alert('copiado! cola onde quiser compartilhar.')
      } catch (e) {
        alert('não foi possível copiar automaticamente.')
      }
    }
  }

  return (
    <div className="max-w-xs mx-auto py-6">
      <div
        className="relative w-full aspect-[3/5] rounded-2xl p-5 overflow-visible"
        style={{ background: 'linear-gradient(160deg, #F6C9DC 0%, #C9E4F5 55%, #FDE9A8 100%)' }}
      >
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 -rotate-3 w-16 h-5 bg-white/55 border border-white/80" />

        <p className="font-caveat font-bold text-3xl text-orkut-blue-dark text-center mt-1.5">
          Replay
        </p>
        <p className="font-kalam text-xs text-ink/70 text-center mb-4">meu caderninho · geração 99/00</p>

        <div className="flex flex-col gap-4 items-center">
          {destaques.map((r, i) => (
            <div
              key={i}
              className={`bg-paper p-2.5 pb-5 rounded-sm shadow-md ${rotacoes[i % rotacoes.length]}`}
              style={{ width: '82%' }}
            >
              <p className="font-kalam font-bold text-[10px] text-slate-400 mb-1">{r.pergunta}</p>
              <p className="font-caveat font-bold text-base text-ink leading-tight">{r.texto}</p>
            </div>
          ))}
        </div>

        <AdesivoEstrela className="bottom-14 right-4 rotate-[-10deg]" />

        <p className="absolute bottom-2 left-0 right-0 text-center font-kalam text-[10px] text-ink/50">
          seusite.com
        </p>
      </div>

      <button
        onClick={compartilhar}
        className="w-full font-kalam font-bold text-sm h-11 mt-5 rounded-full border-2 border-orkut-blue bg-orkut-blue text-paper"
      >
        compartilhar
      </button>
    </div>
  )
}