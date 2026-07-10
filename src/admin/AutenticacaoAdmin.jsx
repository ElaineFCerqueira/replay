import { useState } from 'react'

const CHAVE_SESSAO = 'replay:admin-autenticado'

export function useAutenticacaoAdmin() {
  const [autenticado, setAutenticado] = useState(
    () => sessionStorage.getItem(CHAVE_SESSAO) === '1'
  )

  function tentarEntrar(senha) {
    const senhaCorreta = import.meta.env.VITE_ADMIN_PASSWORD
    if (!senhaCorreta) {
      return { ok: false, mensagem: 'VITE_ADMIN_PASSWORD não configurada no .env.local' }
    }
    if (senha === senhaCorreta) {
      sessionStorage.setItem(CHAVE_SESSAO, '1')
      setAutenticado(true)
      return { ok: true }
    }
    return { ok: false, mensagem: 'senha incorreta' }
  }

  function sair() {
    sessionStorage.removeItem(CHAVE_SESSAO)
    setAutenticado(false)
  }

  return { autenticado, tentarEntrar, sair }
}

export function TelaLogin({ onEntrar }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const resultado = onEntrar(senha)
    if (!resultado.ok) setErro(resultado.mensagem)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <p className="font-kalam font-bold text-lg text-ink mb-1">área administrativa</p>
        <p className="font-kalam text-sm text-slate-500 mb-4">digite a senha pra ver o painel</p>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          autoFocus
          className="w-full border-2 border-paper-line rounded-lg p-3 font-kalam text-sm focus:outline-none focus:ring-2 focus:ring-orkut-blue/40"
          placeholder="senha"
        />
        {erro && <p className="font-kalam text-xs text-rose-600 mt-2">{erro}</p>}
        <button
          type="submit"
          className="w-full font-kalam font-bold text-sm h-11 mt-3 rounded-full border-2 border-orkut-blue bg-orkut-blue text-paper"
        >
          entrar
        </button>
      </form>
    </div>
  )
}
