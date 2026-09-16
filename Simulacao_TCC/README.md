# Órbita — laboratório de dinâmica galáctica

Aplicação TypeScript + Three.js + Chart.js + Vite, com saída estática compatível com Vercel. Integra um traçador em potencial galáctico fixo e compara o mesmo estado inicial com um cenário sem halo de matéria escura. Não é N-corpos nem reconstrução autogravitante da Via Láctea.

## Executar

Use Node.js 22. O `pnpm-lock.yaml` fixa a resolução das dependências; a Vercel escolhe automaticamente uma versão compatível do pnpm a partir desse lockfile.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm validate
pnpm build
pnpm dev
```

`pnpm build` exige TypeScript sem erros antes do Vite. `pnpm validate` regenera os resultados quantitativos. `pnpm preview` serve o build em localhost. O lockfile fixa as dependências; `pnpm-workspace.yaml` autoriza apenas a preparação de esbuild necessária ao Vite e tsx.

## Documentação científica

- [Auditoria do código original](docs/AUDITORIA.md): comparação das equações, problemas e formulações corretas.
- [Parâmetros, unidades e fontes](docs/PARAMETROS.md): todas as entradas físicas, escolhas numéricas e parâmetros gráficos.
- [Validação quantitativa](docs/VALIDACAO.md): conservação, estabilidade circular, convergência e comparação com o original.
- [Resultados completos em JSON](docs/validation-results.json) e [curva de rotação em CSV](docs/rotation-curve.csv).
- [Verificações da interface](docs/INTERFACE.md).

## Uso

Selecione traçador solar, circular ou circular com perturbação radial de 1%. Presets experimentais permitem alterar R entre 0,5 e 50 kpc. Alterar componentes, resolução temporal ou condições iniciais reinicia os dois cenários; a comparação sempre recebe o mesmo estado inicial do cenário principal. O passo permanece fixo durante a execução e é independente de FPS.

Os diagnósticos pausam a execução ao exceder tolerâncias ou domínio operacional. Use resolução fina e reinicie quando o problema for resolução; sair do domínio é diferente de instabilidade numérica. A ausência de alerta não garante precisão infinita de fase nem validade observacional do modelo.

Arraste para orbitar, role para zoom, use botão direito para deslocar. Há vistas global, superior, perfil e acompanhamento do traçador. A comparação usa controles independentes em cada metade. “Painéis” recolhe a UI; no celular alterna controles, telemetria e imagem livre. A legenda e “Modelo & fontes” explicam componentes e limitações.

“Exportar experimento” salva JSON com modelo, unidades, fontes, estado inicial/final, diagnósticos e até 12000 amostras recentes. As velocidades do estado bruto são kpc/Gyr; as velocidades das amostras são km/s. Essa diferença consta no arquivo. Nenhum dado é enviado a um servidor.

## Organização

`data/` → parâmetros com procedência, unidades astronômicas, fontes e observações. `physics/` → potenciais, acelerações por componente, conversões de unidade, velocidade circular, condições iniciais, leapfrog e invariantes, sem dependências gráficas. `simulation/` → relógio de apresentação e métricas de trajetória/comparação. `visualization/` → escolhas decorativas. `entities/`, `graphics/`, `shaders/` → GPU/câmeras e vetores didáticos. `ui/` → gráficos, evidência dinâmica, telemetria e exportação. `tests/fixtures/legacy.ts` é somente arquivo histórico para auditoria, nunca importado pela aplicação.

## Deploy e recuperação

O projeto continua na raiz do repositório, entrada `index.html`, código em `src/`, saída em `dist/`. `vercel.json` declara Vite, `pnpm run build` e `dist`; não requer backend, variáveis de ambiente ou API paga. Configure Node 22 no projeto Vercel caso esteja fixado em versão incompatível com pnpm. A configuração real do painel Vercel ainda deve ser conferida durante a publicação.

Para este erro específico, o `vercel.json` fixa `pnpm install --frozen-lockfile --prod=false` e `pnpm run build`. Se o painel do projeto tiver os campos Override ativados, use exatamente esses dois comandos, ou desative os overrides para que o arquivo seja respeitado. O Root Directory deve ser a raiz que contém `package.json`, `pnpm-lock.yaml`, `vercel.json` e `index.html`. Não use `vite build` como comando manual: ele ignora o script de build e falha quando o install foi feito sem `devDependencies`.

Antes de promover à produção: instalar pelo lockfile, executar testes e build e verificar uma Preview Deployment. A revisão foi preparada em `revision/fisica-visual`; a produção não é alterada pela simples execução local. Para rollback de publicação use o deployment anterior da Vercel ou reverta o commit da revisão pelo Git. A base auditada é `56f368f1ed36c67df23c16441501c87476c2c4ab`.

## Limites de interpretação

Gala MilkyWayPotential v1 é referência histórica explícita, não o melhor ajuste contemporâneo. Modelo estático e axisimétrico: sem barra/espirais gravitacionais, gás, colisões, auto-gravidade ou cosmologia. Visuais não são catálogo de estrelas nem transporte radiativo. Resultados numéricos precisos validam a implementação desse modelo, não provam que ele descreve todos os aspectos da Galáxia real.
