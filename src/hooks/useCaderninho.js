import { useEffect, useState, useCallback } from 'react'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db, garantirAuth } from '../firebase'
import { sortearLote, perguntasFixas, TAMANHO_LOTE } from '../data/perguntas'

const CHAVE_LOCAL = 'caderninho:id'

function gerarId() {
  return crypto.randomUUID().slice(0, 8)
}

function getOuCriarIdLocal() {
  let id = localStorage.getItem(CHAVE_LOCAL)
  if (!id) {
    id = gerarId()
    localStorage.setItem(CHAVE_LOCAL, id)
  }
  return id
}

// respostas: { [perguntaId]: { texto, tag, pergunta } }
export function useCaderninho() {
  const [caderninhoId, setCaderninhoId] = useState(null)
  const [respostas, setRespostas] = useState({})
  const [loteAtual, setLoteAtual] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function iniciar() {
      const id = getOuCriarIdLocal()
      setCaderninhoId(id)

      try {
        await garantirAuth()
        const ref = doc(db, 'caderninhos', id)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          const dados = snap.data()
          setRespostas(dados.respostas || {})
          if (dados.loteAtual?.length) {
            setLoteAtual(dados.loteAtual)
          } else {
            const novoLote = sortearLote(Object.keys(dados.respostas || {}))
            setLoteAtual(novoLote)
          }
        } else {
          const novoLote = [...perguntasFixas, ...sortearLote([])]
          setLoteAtual(novoLote)
          await setDoc(ref, {
            criadoEm: serverTimestamp(),
            respostas: {},
            loteAtual: novoLote,
          })
        }
      } catch (e) {
        // Sem Firebase configurado ainda: funciona só localmente nesta sessão
        console.warn('Firestore indisponível, operando localmente:', e.message)
        setLoteAtual([...perguntasFixas, ...sortearLote([])])
      } finally {
        setCarregando(false)
      }
    }
    iniciar()
  }, [])

  const salvarResposta = useCallback(async (pergunta, texto) => {
    setRespostas(prev => {
      const atualizado = {
        ...prev,
        [pergunta.id]: { texto, tag: pergunta.tag, pergunta: pergunta.texto },
      }
      if (caderninhoId) {
        const ref = doc(db, 'caderninhos', caderninhoId)
        setDoc(ref, { respostas: atualizado }, { merge: true }).catch(e =>
          console.warn('Não foi possível sincronizar:', e.message)
        )
      }
      return atualizado
    })
  }, [caderninhoId])

  const sortearMais = useCallback((tamanho = TAMANHO_LOTE) => {
    const idsRespondidas = Object.keys(respostas)
    const novoLote = sortearLote(idsRespondidas, tamanho)
    setLoteAtual(novoLote)
    if (caderninhoId) {
      const ref = doc(db, 'caderninhos', caderninhoId)
      setDoc(ref, { loteAtual: novoLote }, { merge: true }).catch(() => {})
    }
    return novoLote
  }, [respostas, caderninhoId])

  return {
    caderninhoId,
    respostas,
    loteAtual,
    carregando,
    salvarResposta,
    sortearMais,
  }
}
