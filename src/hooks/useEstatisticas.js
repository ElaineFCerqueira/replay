import { useEffect, useState, useCallback } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, garantirAuth } from '../firebase'
import { perguntas as bancoDePerguntas } from '../data/perguntas'

const mapaPerguntas = Object.fromEntries(bancoDePerguntas.map(p => [p.id, p.texto]))

export function useEstatisticas() {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [stats, setStats] = useState(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      await garantirAuth()
      const snap = await getDocs(collection(db, 'caderninhos'))

      let totalCaderninhos = 0
      let totalRespostas = 0
      let totalCaracteres = 0
      const criadosPorDia = {}
      const respostasPorPergunta = {}
      const distribuicaoDeRespostas = {} // quantos caderninhos têm N respostas

      snap.forEach(doc => {
        totalCaderninhos += 1
        const dados = doc.data()
        const respostas = dados.respostas || {}
        const qtdRespostas = Object.keys(respostas).length

        distribuicaoDeRespostas[qtdRespostas] = (distribuicaoDeRespostas[qtdRespostas] || 0) + 1

        if (dados.criadoEm?.toDate) {
          const dia = dados.criadoEm.toDate().toISOString().slice(0, 10)
          criadosPorDia[dia] = (criadosPorDia[dia] || 0) + 1
        }

        Object.entries(respostas).forEach(([perguntaId, r]) => {
          totalRespostas += 1
          totalCaracteres += (r.texto || '').length
          respostasPorPergunta[perguntaId] = (respostasPorPergunta[perguntaId] || 0) + 1
        })
      })

      const rankingPerguntas = Object.entries(respostasPorPergunta)
        .map(([id, contagem]) => ({ id, texto: mapaPerguntas[id] || id, contagem }))
        .sort((a, b) => b.contagem - a.contagem)

      setStats({
        totalCaderninhos,
        totalRespostas,
        mediaRespostasPorCaderninho: totalCaderninhos ? (totalRespostas / totalCaderninhos).toFixed(1) : 0,
        mediaCaracteresPorResposta: totalRespostas ? Math.round(totalCaracteres / totalRespostas) : 0,
        criadosPorDia,
        rankingPerguntas,
        distribuicaoDeRespostas,
      })
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  return { stats, carregando, erro, recarregar: carregar }
}
