import { useAutenticacaoAdmin, TelaLogin } from './AutenticacaoAdmin'
import { useEstatisticas } from '../hooks/useEstatisticas'
import { BarraHorizontal, GraficoLinhaDoTempo, CartaoMetrica } from './GraficosSimples'

export default function PainelAdmin() {
  const { autenticado, tentarEntrar, sair } = useAutenticacaoAdmin()

  if (!autenticado) {
    return <TelaLogin onEntrar={tentarEntrar} />
  }

  return <Dashboard onSair={sair} />
}

function Dashboard({ onSair }) {
  const { stats, carregando, erro, recarregar } = useEstatisticas()

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <p className="font-kalam font-bold text-lg text-ink">painel · Replay</p>
            <p className="font-kalam text-xs text-slate-400">visão geral dos acessos e respostas</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={recarregar}
              className="font-kalam text-xs h-9 px-3 rounded-full border-2 border-paper-line bg-paper text-slate-500"
            >
              atualizar
            </button>
            <button
              onClick={onSair}
              className="font-kalam text-xs h-9 px-3 rounded-full border-2 border-paper-line bg-paper text-slate-500"
            >
              sair
            </button>
          </div>
        </header>

        {carregando && <p className="font-kalam text-slate-400">carregando dados...</p>}

        {erro && (
          <p className="font-kalam text-sm text-rose-600">
            erro ao carregar: {erro}. confira se o Firebase está configurado e as regras do Firestore
            permitem leitura autenticada da coleção "caderninhos".
          </p>
        )}

        {stats && !carregando && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <CartaoMetrica titulo="caderninhos criados" valor={stats.totalCaderninhos} />
              <CartaoMetrica titulo="respostas no total" valor={stats.totalRespostas} />
              <CartaoMetrica titulo="média resp./caderninho" valor={stats.mediaRespostasPorCaderninho} />
              <CartaoMetrica titulo="média caracteres/resposta" valor={stats.mediaCaracteresPorResposta} />
            </div>

            <section className="rounded-xl border-2 border-paper-line bg-paper p-4">
              <p className="font-kalam font-bold text-sm text-ink mb-3">caderninhos criados por dia</p>
              <GraficoLinhaDoTempo dados={stats.criadosPorDia} />
            </section>

            <section className="rounded-xl border-2 border-paper-line bg-paper p-4">
              <p className="font-kalam font-bold text-sm text-ink mb-3">perguntas mais respondidas</p>
              {stats.rankingPerguntas.slice(0, 10).map(p => (
                <BarraHorizontal
                  key={p.id}
                  label={p.texto}
                  valor={p.contagem}
                  maximo={stats.rankingPerguntas[0]?.contagem || 1}
                />
              ))}
              {stats.rankingPerguntas.length === 0 && (
                <p className="font-kalam text-sm text-slate-400">ainda sem respostas registradas</p>
              )}
            </section>

            <section className="rounded-xl border-2 border-paper-line bg-paper p-4">
              <p className="font-kalam font-bold text-sm text-ink mb-3">quantas perguntas as pessoas respondem</p>
              {Object.entries(stats.distribuicaoDeRespostas)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([qtd, contagem]) => (
                  <BarraHorizontal
                    key={qtd}
                    label={`${qtd} respostas`}
                    valor={contagem}
                    maximo={Math.max(...Object.values(stats.distribuicaoDeRespostas))}
                    sufixo=" caderninhos"
                  />
                ))}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
