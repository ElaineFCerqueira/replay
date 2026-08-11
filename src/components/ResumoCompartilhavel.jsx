import { useState, useMemo, useRef } from 'react'
import { toJpeg } from 'html-to-image'
import { AdesivoEstrela } from './Adesivos'


const MAX_DESTAQUES = 4

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
              <p className="font-kalam font-bold text-sm text-slate-500 mb-1.5">{r.pergunta}</p>
              <p className="font-dancing font-bold text-2xl text-ink leading-snug">{r.texto}</p>
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onConfirmar(selecionadas)}
        disabled={selecionadas.length === 0}
        className="w-full font-kalam font-bold text-sm h-11 mt-5 rounded-full border-2 border-orkut-blue bg-orkut-blue text-paper disabled:opacity-40"
      >
        montar meu cartão →
      </button>
    </div>
  )
}

export function CartaoResumo({ respostas, idsDestaque }) {
  const destaques = idsDestaque.map(id => respostas[id]).filter(Boolean)
  const rotacoes = ['-rotate-6', 'rotate-4', 'rotate-2']
  const cartaoRef = useRef(null)
  const [gerando, setGerando] = useState(false)

  async function gerarImagem() {
    if (!cartaoRef.current) return null
    return toJpeg(cartaoRef.current, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#FFFDF5',
    })
  }

  async function baixarImagem() {
    setGerando(true)
    try {
      const dataUrl = await gerarImagem()
      if (!dataUrl) return
      const link = document.createElement('a')
      link.download = 'replay-meu-caderninho.jpg'
      link.href = dataUrl
      link.click()
    } catch (e) {
      alert('não foi possível gerar a imagem. tenta de novo em alguns segundos.')
    } finally {
      setGerando(false)
    }
  }

  async function compartilhar() {
    setGerando(true)
    try {
  const handleCompartilhar = async () => {
  const dataUrl = await toJpeg(cardRef.current, { quality: 0.95 });
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], "replay.jpg", { type: "image/jpeg" });

  const linkCaderno = `${window.location.origin}/${cadernoId}`; 
  // ajuste a rota conforme a estrutura das suas URLs (ex: /c/${id} ou /caderno/${id})

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: "Replay",
      text: `Respondi o meu Replay ✨ vem responder o seu:\n${linkCaderno}`,
    });
  } else {
    // fallback: navegadores sem suporte a share de arquivo (ex: desktop)
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "replay.jpg";
    link.click();
    navigator.clipboard?.writeText(linkCaderno);
    // opcional: mostrar toast "link copiado!"
  }
}; catch (e) {
      alert('não foi possível gerar a imagem. tenta de novo em alguns segundos.')
    } finally {
      setGerando(false)
    }
  }

  return (
    <div className="max-w-xs mx-auto py-6">
      <div
        ref={cartaoRef}
        className="relative w-full rounded-2xl p-6 pb-10 overflow-visible"
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
              style={{ width: '94%' }}
            >
              <p className="font-kalam font-bold text-xl text-orkut-blue-dark mb-3 leading-snug">{r.pergunta}</p>
              <p className="font-dancing font-bold text-4xl text-ink leading-snug">{r.texto}</p>
            </div>
          ))}
        </div>

        <AdesivoEstrela className="bottom-14 right-4 rotate-[-10deg]" />

        <p className="absolute bottom-2 left-0 right-0 text-center font-kalam text-[10px] text-ink/50">
          seusite.com
        </p>
      </div>

      <div className="flex gap-2.5 mt-5">
        <button
          onClick={baixarImagem}
          disabled={gerando}
          className="flex-1 font-kalam font-bold text-sm h-11 rounded-full border-2 border-paper-line bg-paper text-slate-500 disabled:opacity-50"
        >
          {gerando ? 'gerando...' : 'baixar imagem'}
        </button>
        <button
          onClick={compartilhar}
          disabled={gerando}
          className="flex-1 font-kalam font-bold text-sm h-11 rounded-full border-2 border-orkut-blue bg-orkut-blue text-paper disabled:opacity-50"
        >
          {gerando ? 'gerando...' : 'compartilhar'}
        </button>
      </div>
    </div>
  )
}
