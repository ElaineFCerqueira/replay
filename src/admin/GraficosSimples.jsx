export function BarraHorizontal({ label, valor, maximo, sufixo = '' }) {
  const pct = maximo > 0 ? Math.max(4, Math.round((valor / maximo) * 100)) : 0
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1">
        <span className="font-kalam text-xs text-slate-600 truncate pr-2">{label}</span>
        <span className="font-kalam text-xs text-slate-400 shrink-0">{valor}{sufixo}</span>
      </div>
      <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-orkut-blue transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function GraficoLinhaDoTempo({ dados }) {
  const dias = Object.keys(dados).sort()
  const maximo = Math.max(1, ...Object.values(dados))

  if (dias.length === 0) {
    return <p className="font-kalam text-sm text-slate-400">ainda sem dados de criação por dia</p>
  }

  return (
    <div className="flex items-end gap-1 h-28">
      {dias.map(dia => {
        const valor = dados[dia]
        const alturaPct = Math.max(6, Math.round((valor / maximo) * 100))
        return (
          <div key={dia} className="flex-1 flex flex-col items-center justify-end gap-1" title={`${dia}: ${valor}`}>
            <div
              className="w-full rounded-t-sm bg-sticker-blue-border"
              style={{ height: `${alturaPct}%` }}
            />
            <span className="font-kalam text-[9px] text-slate-400 rotate-0">{dia.slice(5)}</span>
          </div>
        )
      })}
    </div>
  )
}

export function CartaoMetrica({ titulo, valor }) {
  return (
    <div className="rounded-xl border-2 border-paper-line bg-paper p-4">
      <p className="font-kalam text-xs text-slate-400 mb-1">{titulo}</p>
      <p className="font-caveat font-bold text-3xl text-orkut-blue-dark">{valor}</p>
    </div>
  )
}
