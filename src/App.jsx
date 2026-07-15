import { useState, useEffect } from 'react'
import { useCaderninho } from './hooks/useCaderninho'
import { CapaCaderno } from './components/CapaCaderno'
import { PaginaCaderno } from './components/PaginaCaderno'
import { SeletorDestaques, CartaoResumo } from './components/ResumoCompartilhavel'

// Telas: 'capa' -> 'respondendo' -> 'selecionando' -> 'resumo'
export default function App() {
  const { respostas, loteAtual, carregando, salvarResposta, iniciarNovoCaderninho } = useCaderninho()
  const [tela, setTela] = useState('capa')
  const [indice, setIndice] = useState(0)
  const [idsDestaque, setIdsDestaque] = useState([])
  const mensagensCarregando = [
    'abrindo o caderninho...',
    'sacudindo a poeira das páginas...',
    'procurando uma caneta que funcione...',
  ]
  const [mensagemAtual, setMensagemAtual] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMensagemAtual(i => (i + 1) % mensagensCarregando.length)
    }, 1500)
    return () => clearInterval(intervalo)
  }, [])



  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-kalam text-slate-400">{mensagensCarregando[mensagemAtual]}</p>
      </div>
    )
  }

  const perguntaAtual = loteAtual[indice]
  const chegouAoFim = indice === loteAtual.length - 1

  function proxima() {
    if (chegouAoFim) {
      setTela('selecionando')
    } else {
      setIndice(i => i + 1)
    }
  }

  function anterior() {
    setIndice(i => Math.max(0, i - 1))
  }

  function irParaResumo(selecionadas) {
    setIdsDestaque(selecionadas)
    setTela('resumo')
  }

  return (
    <div className="min-h-screen py-8">
      {tela !== 'capa' && (
        <>
          <header className="max-w-md mx-auto px-4 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-orkut-blue flex items-center justify-center">
                <span className="font-kalam text-paper text-sm">c</span>
              </div>
              <span className="font-kalam font-bold text-sm text-orkut-blue-dark">Replay</span>
            </div>
          </header>
          <button
            onClick={() => setTela('capa')}
            aria-label="fechar"
            className="fixed top-4 right-4 w-9 h-9 rounded-full bg-paper border-2 border-paper-line flex items-center justify-center text-slate-500 font-kalam font-bold z-50"
          >
            ×
          </button>
        </>
      )}

      {tela === 'capa' && (
        <CapaCaderno onAbrir={() => setTela('respondendo')} />
      )}

      {tela === 'respondendo' && perguntaAtual && (
        <PaginaCaderno
          pergunta={perguntaAtual}
          indice={indice}
          total={loteAtual.length}
          respostaSalva={respostas[perguntaAtual.id]}
          onSalvar={salvarResposta}
          onAnterior={anterior}
          onProxima={proxima}
        />
      )}

      {tela === 'selecionando' && (
        <SeletorDestaques respostas={respostas} onConfirmar={irParaResumo} />
      )}

      {tela === 'resumo' && (
        <div className="flex flex-col items-center">
          <CartaoResumo respostas={respostas} idsDestaque={idsDestaque} />
          <div className="flex gap-2.5 mt-2">
            <button
              onClick={() => setTela('respondendo')}
              className="font-kalam font-bold text-sm h-10 px-4 rounded-full border-2 border-paper-line bg-paper text-slate-500"
            >
              ver respostas
            </button>
            <button
              onClick={iniciarNovoCaderninho}
              className="font-kalam font-bold text-sm h-10 px-4 rounded-full border-2 border-orkut-blue bg-blue-50 text-orkut-blue-dark"
            >
              começar um novo caderninho
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
