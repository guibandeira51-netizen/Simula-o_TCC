# Auditoria científica e de código — 8 de outubro de 2026

## Resultado e escopo

A revisão desta entrega partiu do projeto acadêmico já organizado em três componentes: bojo Hernquist, disco Miyamoto–Nagai e halo NFW. O código matemático desses termos está consistente com as equações declaradas. Foram corrigidos problemas nos diagnósticos, seleção do passo, interpretação de períodos e apresentação dos resultados. Massas, escalas, constantes, condições iniciais e aparência institucional foram preservadas.

Os resultados abaixo validam a implementação do modelo adotado. A concordância com uma velocidade circular local não estabelece que toda a curva de rotação ou a órbita solar real estejam ajustadas às observações. Esta revisão não recebeu o texto integral do TCC; a correspondência documental deve ser conferida com as equações e a tabela de parâmetros aqui explicitadas.

## Mapa da implementação

| Responsabilidade | Arquivo |
|---|---|
| Parâmetros dimensionais, unidades astronômicas e procedência | `src/data/parameters.ts` |
| Potenciais, acelerações por componente, frequências e velocidade circular | `src/physics/potentials.ts` |
| Conversões e cinemática cilíndrica | `src/physics/units.ts`, `kinematics.ts` |
| Presets e escolha do passo fixo | `src/physics/initialConditions.ts` |
| Leapfrog KDK e estado orbital | `src/physics/integrator.ts`, `Engine.ts` |
| Energia, Lz, monitor e alarmes | `src/physics/diagnostics.ts` |
| Comparação de potenciais e métricas da trajetória | `src/simulation/comparison.ts`, `trajectory.ts` |
| Curvas e contribuições dinâmicas | `src/physics/circularVelocity.ts` |
| Estado da página, seletores e atualização da telemetria | `src/main.ts` |
| Renderização, câmeras e partículas decorativas | `src/graphics/`, `entities/`, `visualization/`, `shaders/` |
| Gráficos, fontes e apresentação das legendas | `src/ui/ChartsManager.ts`, `UIManager.ts`, `chartPresentation.ts` |
| Observações existentes no gráfico | `src/data/observations.ts` |

As setas recebem `accelerationComponents`, a mesma função utilizada pelo integrador. Os braços e estrelas decorativas não participam da força. Não houve reorganização geral dos arquivos.

## Equações conferidas

Definições: \(R=\sqrt{x^2+y^2}\), \(r=\sqrt{R^2+z^2}\), \(s=\sqrt{z^2+b_d^2}\), \(B=a_d+s\), \(D=\sqrt{R^2+B^2}\). As equações abaixo usam potencial em \((\mathrm{km/s})^2\), posição em kpc e aceleração antes da conversão interna.

### Bojo Hernquist

\[
\Phi_b=-\frac{GM_b}{r+a_b},\qquad
M_b(<r)=M_b\frac{r^2}{(r+a_b)^2},\qquad
\boldsymbol a_b=-\frac{GM_b}{r(r+a_b)^2}(x,y,z).
\]

O código contém o fator \(1/r\), sinal negativo e normalização correta. No plano, \(v_b^2=GM_bR/(R+a_b)^2\). Referência: [Hernquist (1990), ApJ 356, 359, DOI 10.1086/168845](https://doi.org/10.1086/168845).

### Disco Miyamoto–Nagai

\[
\Phi_d=-\frac{GM_d}{D},\qquad
\boldsymbol a_d=-\frac{GM_d}{D^3}\left(x,y,\frac{Bz}{s}\right).
\]

O fator vertical \(B/s\) foi conferido por derivação e diferenças finitas. No plano, \(v_d^2=GM_dR^2/[R^2+(a_d+b_d)^2]^{3/2}\). Referência: [Miyamoto & Nagai (1975), PASJ 27, 533](https://articles.adsabs.harvard.edu/pdf/1975PASJ...27..533M).

### Halo NFW

\[
A=4\pi\rho_s r_s^3,\quad u=r/r_s,\quad
M_h(<r)=A[\ln(1+u)-u/(1+u)],
\]
\[
\Phi_h=-GA\frac{\ln(1+r/r_s)}r,\qquad
\boldsymbol a_h=-\frac{GM_h(<r)}{r^3}(x,y,z).
\]

O código usa `log1p` e uma série para evitar cancelamento em raios pequenos. \(A\) é massa de escala; não é massa total ou massa virial. O NFW não truncado tem massa divergente no infinito, mas \(\Phi(\infty)=0\), pois \(\ln r/r\to0\). Referência: [Navarro, Frenk & White (1997), ApJ 490, 493, DOI 10.1086/304888](https://doi.org/10.1086/304888).

### Somatórios, unidades e invariantes

\[
\Phi=\Phi_b+\Phi_d+\Phi_h,\qquad \Phi_{\rm bar}=\Phi_b+\Phi_d,
\qquad v_c^2=-R a_R\big|_{z=0}.
\]

As velocidades circulares das componentes somam em quadrados. \(f_h=v_h^2/v_c^2\), \(f_{\rm bar}=v_{\rm bar}^2/v_c^2\) e \(\mathcal D=v_c^2/v_{\rm bar}^2\). Se a contribuição bariônica é zero, a discrepância fica indefinida. A massa \(Rv_c^2/G\) é exibida somente como equivalente sob aproximação esférica.

Internamente, posição é kpc, tempo é Gyr e velocidade é kpc/Gyr. Com \(C=1{,}022712165045695\), \(v_{\rm int}=Cv_{\rm km/s}\), \(a_{\rm int}=C^2a\), e a curva utiliza \(v_c^2=-Ra_{R,\rm int}/C^2\). A energia específica é \(E=|v|^2/2+\Phi\), com velocidade em km/s; subtrair um potencial já negativo produziria erro. \(L_z=xv_y-yv_x=Rv_\phi\). Em campo achatado é \(L_z\), e não necessariamente \(|\boldsymbol L|\), que se conserva.

O KDK implementa meia atualização da velocidade, atualização da posição e outra meia atualização da velocidade usando a nova posição. É um leapfrog de segunda ordem com passo fixo; referência: [Springel (2005), §4.1, DOI 10.1111/j.1365-2966.2005.09655.x](https://doi.org/10.1111/j.1365-2966.2005.09655.x).

## Por que a velocidade circular fica constante

A opção agora se chama **Circular no potencial completo**. Ela define \(z_0=v_{R0}=v_{z0}=0\) e \(v_{\phi0}=v_c(R_0)\). Em uma órbita circular no potencial estacionário, o raio e o módulo da velocidade são constantes; a direção do vetor gira. Esse comportamento não indica travamento do valor.

No raio de 8,178 kpc:

| Preset | vR inicial (km/s) | vφ inicial (km/s) | vz inicial (km/s) | módulo inicial (km/s) |
|---|---:|---:|---:|---:|
| Solar aproximado | -11,10 | 241,724928 | 7,25 | 242,088234 |
| Circular no potencial completo | 0 | 229,484928 | 0 | 229,484928 |
| Perturbação radial de 1% | 2,294849 | 229,484928 | 0 | 229,496402 |

A seleção entre solar e circular reinicia imediatamente e muda o módulo em 12,603307 km/s. Alterar apenas o raio exige aplicar as condições pelo botão. A perturbação radial é perpendicular à velocidade tangencial; por isso muda a norma em segunda ordem: \(v/v_c=\sqrt{1+0{,}01^2}\), apenas aproximadamente 0,005%. A fração de 1% é um experimento controlado no regime de pequena perturbação, não uma medida observacional.

No teste circular de aproximadamente 1 Gyr, o módulo variou de 229,484589 a 229,484928 km/s, uma amplitude relativa de \(1{,}476\times10^{-6}\), devida ao truncamento. A interface arredonda a duas casas, mostrando 229,48 km/s. Após um quarto de volta, o vetor passou de aproximadamente (0; 229,485; 0) para (-229,485; 0,000186; 0) km/s. O período azimutal calculado é aproximadamente 218,94 Myr.

Desligar componentes conserva o estado inicial calculado no potencial completo para isolar a mudança de campo. Portanto essa mesma velocidade pode produzir uma órbita não circular no campo reduzido. Esse protocolo foi preservado e explicitado nos textos.

## Problemas encontrados e correções

| Problema anterior | Evidência / consequência | Correção e critério |
|---|---|---|
| Razões relativas mal condicionadas acionavam pausa | Perto de E₀=0, dividir por E₀ amplificava um erro absoluto pequeno | Pausa por \(\lvert\Delta E\rvert/\max(\lvert E_0\rvert,K_0)\) e \(\lvert\Delta L_z\rvert/\max(\lvert L_{z0}\rvert,r_0\lvert v_0\rvert)\). Razões antigas continuam informativas; referências próximas de zero são identificadas |
| Passo escolhido ignorava velocidade inicial no campo reduzido | Circular de referência com só bojo em R=50 kpc começava com hω≈0,0573, acima do limite 0,03 | Escolha comum inclui frequências Ω, κ, ν e a taxa local dos dois campos, inclusive \(\lvert v_0\rvert/r_0\). O passo não muda durante a execução |
| Oscilação numérica de circular ganhava período radial físico | Excursão radial de aproximadamente 0,000012 kpc era interpretada como apsides e oscilação física | Reconhecimento analítico da condição circular no campo ativo. Mantém Rmin/Rmax observados; apsides e período radial ficam nulos nesse caso. Não altera a órbita nem filtra perturbações |
| Períodos dependiam do instante do passo que detectava cruzamento | Quantização temporal e demora de duas revoluções para período azimutal | Interpolação dos instantes de vR=0 e das voltas azimutais. Primeiro período azimutal disponível após uma volta; aceita rotação retrógrada |
| Tooltip de rotação continuava aplicado em energia/erro | Valores podiam aparecer incorretamente em km/s | Unidades por quantidade: km/s, (km/s)², adimensional e kpc |
| Escolha da legenda se perdia nas atualizações | Novos datasets apagavam o estado de ocultação do Chart.js | Visibilidade persistida por identificador da série; seletores físicos continuam determinando componentes ativas |
| Setas apareciam em ambas as vistas | Layer aplicado somente ao pai ArrowHelper; filhos permaneciam na layer padrão | Layer aplicado aos filhos renderizáveis; teste das duas câmeras sem WebGL |
| Buffer duplicado de pontos em cada passo | Até 12000 pontos e deslocamento contínuo do array, sem consumidor | Recorder mantém métricas sem guardar os pontos redundantes. Amostras dos gráficos e exportação continuam preservadas |
| Documentação tinha velocidade antiga em R=5 kpc | Informava 234,46 km/s | Resultado correto: 231,393135 km/s; passo padrão 0,04629385 Myr |

Os critérios de escala e resolução são escolhas numéricas documentadas; não são novos parâmetros galácticos. A singularidade de uma razão com denominador próximo de zero é um problema de condicionamento, não evidência de energia não conservada. A ordem dois é verificada por refinamento do leapfrog, não inferida somente do nome do método.

## Parâmetros físicos preservados

Todos os valores dimensionais usados pelo modelo estão centralizados em `src/data/parameters.ts`. Não foram ajustados nesta revisão. O SHA-256 desse arquivo coincide com o backup anterior à auditoria: `0B2A1154D743B1B2513CE454EE8A5109A57A1F1F2D95217E2E864AECBD62E098`.

| Parâmetro | Valor | Unidade | Fonte e interpretação |
|---|---:|---|---|
| Massa do disco Md | 6,8×10¹⁰ | M☉ nominal | Gala MilkyWayPotential v1; parâmetro de modelo |
| Escala radial MN ad | 3 | kpc | Gala v1; não identificar automaticamente com escala fotométrica exponencial |
| Escala vertical MN bd | 0,28 | kpc | Gala v1; parâmetro do potencial |
| Massa do bojo Mb | 5×10⁹ | M☉ nominal | Gala v1 |
| Escala do bojo ab | 1 | kpc | Gala v1 |
| Massa de escala NFW A | 5,4×10¹¹ | M☉ nominal | Gala v1; A=4πρs rs³, não massa virial |
| Raio de escala NFW rs | 15,62 | kpc | Gala v1 |
| Distância solar R☉ | 8,178 | kpc | GRAVITY Collaboration (2019), DOI 10.1051/0004-6361/201935656 |
| Altura solar z☉ | 0,0208 | kpc | Bennett & Bovy (2019), DOI 10.1093/mnras/sty3238 |
| Movimento peculiar U☉ | 11,1 | km/s | Schönrich, Binney & Dehnen (2010); positivo para o centro |
| Movimento peculiar V☉ | 12,24 | km/s | Mesma fonte; em relação ao LSR, não velocidade galactocêntrica total |
| Movimento peculiar W☉ | 7,25 | km/s | Mesma fonte; vertical |
| GM☉ nominal | 1,3271244×10²⁰ | m³/s² | IAU Resolution B3 (2015) |
| Unidade astronômica | 149597870700 | m | Definição IAU; NASA/JPL |
| kpc | 1000(648000/π) AU | m | Definição angular do parsec |
| Gyr | 10⁹×365,25×86400 | s | Ano juliano e dia de 86400 segundos |
| G derivado | 4,300917270036278×10⁻⁶ | kpc (km/s)² / M☉ nominal | GM☉ nominal dividido pelo kpc e por 10⁶; não são duas constantes SI arredondadas independentes |
| C derivado | 1,022712165045695 | (kpc/Gyr)/(km/s) | Unidades anteriores |

Fontes dos sete parâmetros do potencial: [código oficial do Gala, configuração v1](https://gala.adrian.pw/en/stable/_modules/gala/potential/potential/builtin/special.html), [construção e limitações dos modelos Gala](https://gala.adrian.pw/en/stable/supporting/define-milky-way-model.html), [Price-Whelan (2017), DOI 10.21105/joss.00388](https://doi.org/10.21105/joss.00388). Esses números são uma parametrização histórica publicada, não sete medidas observacionais independentes. A seleção atual de três termos não reproduz integralmente o benchmark Gala v1 e não recebeu um novo ajuste.

Fontes solares e unidades: [GRAVITY (2019)](https://doi.org/10.1051/0004-6361/201935656), [Bennett & Bovy (2019)](https://doi.org/10.1093/mnras/sty3238), [Schönrich et al. (2010), DOI 10.1111/j.1365-2966.2010.16253.x](https://doi.org/10.1111/j.1365-2966.2010.16253.x), [IAU B3](https://arxiv.org/abs/1510.07674), [NASA/JPL](https://ssd.jpl.nasa.gov/astro_par.html). Há estimativas posteriores da distância solar, por exemplo GRAVITY (2021), 8,275 kpc, DOI [10.1051/0004-6361/202040208](https://doi.org/10.1051/0004-6361/202040208). A escolha de 2019 foi preservada por consistência com o modelo/TCC; não é apresentada como a estimativa mais recente.

Os limites 0,5–50 kpc são domínio operacional de validação e exibição, não limites físicos da Galáxia. Resolução 1024 amostras por período rápido, fatores de refinamento 2/4, fração de derivada 10⁻⁴, tolerâncias de energia 10⁻⁴ e Lz 10⁻⁸ e limite hω=0,03 são escolhas numéricas. As contagens das partículas, cores e comprimentos de setas são parâmetros visuais, sem contribuição gravitacional.

## Velocidades e literatura observacional

É necessário distinguir velocidade circular do potencial, velocidade azimutal solar e módulo total do traçador. O preset solar usa vφ=vc,modelo+V☉ e por isso é uma condição solar aproximada vinculada ao modelo, não uma determinação independente da velocidade solar.

| Estudo | Raio (kpc) | Quantidade publicada (km/s) | Modelo avaliado no mesmo raio (km/s) |
|---|---:|---:|---:|
| Eilers et al. (2019) | 8,122 | vc=229,0±0,2 formal | 229,586 |
| Reid et al. (2019) | 8,15 | Θ₀=236±7 | 229,535 |
| Ou et al. (2024), tabela 1 | 8,19 | vc=232,83 +0,56/−0,55 formal | 229,463 |

Eilers estima sistemáticos de aproximadamente 2–5%, além do erro formal. Reid ajusta distância, rotação e movimento solar conjuntamente e também obtém Θ₀+V☉=247±4 km/s. Portanto não há um único valor exato de velocidade circular aceito para todo método/referencial. O vφ inicial do projeto, 241,725 km/s, é inferior à estimativa central de 247 km/s; não se pode confundir isso com a comparação de vc. Referências: [Eilers et al. (2019), DOI 10.3847/1538-4357/aaf648](https://doi.org/10.3847/1538-4357/aaf648), [Reid et al. (2019), DOI 10.3847/1538-4357/ab4a11](https://doi.org/10.3847/1538-4357/ab4a11).

Para investigar também o formato da curva, foram transcritos sete raios reais da tabela 1 de Ou et al., sem interpolar observações. Os dados ficam no relatório de auditoria, separados do modelo e dos pontos preexistentes no gráfico da aplicação.

| R (kpc) | vc publicado (km/s) | erro +/− formal (km/s) | vc modelo (km/s) | diferença modelo − dado (km/s) |
|---|---:|---:|---:|---:|
| 8,19 | 232,83 | +0,56/−0,55 | 229,463 | -3,367 |
| 12,23 | 226,90 | +0,39/−0,41 | 222,426 | -4,474 |
| 16,24 | 218,30 | +2,17/−1,88 | 217,202 | -1,098 |
| 20,22 | 202,97 | +1,55/−2,25 | 213,234 | +10,264 |
| 23,40 | 192,49 | +4,25/−4,80 | 210,549 | +18,059 |
| 25,02 | 191,48 | +6,41/−9,61 | 209,286 | +17,806 |
| 27,31 | 172,98 | +15,82/−17,07 | 207,590 | +34,610 |

O modelo declina menos nas regiões externas desse conjunto. A diferença é aproximadamente 5,1% em 20,22 kpc e 9,3% em 25,02 kpc. Ou estima sistemáticos de 2–4% até cerca de 22 kpc, que podem superar 15% além desse raio. Essas incertezas não estão incluídas nas barras formais da tabela; não se calculou χ², número de sigmas ou um ajuste novo a partir delas. Fonte: [Ou et al. (2024), MNRAS 528, 693, DOI 10.1093/mnras/stae034](https://doi.org/10.1093/mnras/stae034), [tabela 1 e discussão dos autores](https://arxiv.org/html/2303.12838v2).

A interpretação defensável para a apresentação é: o projeto mostra quantitativamente a diferença entre este potencial bariônico e este potencial com halo, utilizando valores publicados e as mesmas condições iniciais. Ele não mede diretamente matéria escura nem realiza um ajuste observacional completo da Via Láctea.

## Resultados da comparação com e sem halo

No estado solar inicial, os dois cenários têm vR=−11,1, vφ=241,724928 e vz=7,25 km/s, com módulo 242,088234 km/s e Lz=1976,826458 kpc km/s. O vc do cenário completo é 229,484928 km/s; o vc bariônico é 175,157811 km/s. A velocidade inicial supera ambas; não foi forçada a uma circular.

Energia específica inicial: −125805,590049 (km/s)² no completo e −6230,549707 (km/s)² no bariônico. Com Φ(∞)=0, ambas são ligadas. Uma trajetória bariônica extensa não significa automaticamente escape ou falha numérica. A mesma energia cinética encontra potenciais diferentes.

Na integração de aproximadamente cinco Gyr do relatório padrão:

| Métrica | Completo | Bariônico |
|---|---:|---:|
| R mínimo medido (kpc) | 8,098715 | 8,159570 |
| R máximo medido (kpc) | 9,269075 | 42,840535 |
| excentricidade radial do intervalo | 0,067387 | 0,680018 |
| velocidade média amostrada (km/s) | 228,345229 | 92,590025 |
| período radial médio (Gyr) | 0,171265 | 1,388365 |
| período azimutal médio (Gyr) | 0,233677 | 1,406955 |

Esses extremos pertencem ao intervalo integrado, não a uma solução assintótica. O período azimutal da órbita não circular é médio entre voltas, não a expressão circular 2πR/vc. Em órbita não ligada, apoastro e períodos permanecem indefinidos.

Na posição solar, contribuição bariônica=58,2573% e halo=41,7427% em vc²; soma=100%. Discrepância \(\mathcal D=1{,}716522\). Essas são frações da contribuição dinâmica radial do modelo no plano, não frações de massa encerrada ou da massa total da Galáxia.

## Validação numérica da entrega

**45 testes passaram**, incluindo gradientes dos potenciais, todos os seletores, retirada isolada do halo, identidade dos estados iniciais, Kepler analítico, conservação, reversibilidade, contribuição quadrática, frações, períodos, preset circular, legendas, unidades e layers das setas.

Os resíduos do relatório padrão são 9,877×10⁻¹⁷ na soma das acelerações e 2,139×10⁻¹⁶ em vc²=−RaR/C². São diferenças de arredondamento. O teste adicional de seleção de passo cobre sete campos, oito raios e os dois cenários: 112 avaliações iniciais sem alerta, com máximo hω=0,006135923, abaixo de 0,03.

O relatório de auditoria fixa o mesmo tempo final de 5 Gyr, com N=61060, 2N e 4N. O primeiro passo é 0,081886669 Myr; difere minimamente do passo da aplicação, 0,081888000 Myr, para evitar comparar posições em tempos finais diferentes.

| Potencial | máx. abs(ΔE/E₀), N | máx. abs(ΔLz/Lz₀), N | diferença final h−h/2 (kpc) | h/2−h/4 (kpc) | razão |
|---|---:|---:|---:|---:|---:|
| Completo | 6,369×10⁻⁸ | 2,059×10⁻¹⁴ | 0,000522450 | 0,000130612 | 4,000004 |
| Bariônico | 1,979×10⁻⁶ | 2,496×10⁻¹⁴ | 0,000645596 | 0,000161400 | 3,999973 |

Erros de energia nos três passos: completo 6,369×10⁻⁸ → 1,592×10⁻⁸ → 3,980×10⁻⁹; bariônico 1,979×10⁻⁶ → 4,948×10⁻⁷ → 1,237×10⁻⁷. A conservação de Lz já está próxima do arredondamento, por isso não precisa melhorar monotonicamente ao reduzir h. Não houve alertas nesses seis experimentos.

O teste de energia quase nula integra 200 passos em R=12,22 e 12,221 kpc e na raiz derivada E₀=0. Antes, a razão relativa acionaria alarmes nos dois primeiros casos; agora o erro normalizado máximo é aproximadamente 1,638×10⁻⁷, sem pausa espúria. Um erro de velocidade de 5% injetado no teste continua sendo detectado. Esse 5% é uma perturbação de teste de falha, não parâmetro físico da aplicação.

O teste circular em oito raios por dez períodos encontra ΔR/R máximo entre aproximadamente 8,6×10⁻⁷ e 4,1×10⁻⁶. As perturbações reais continuam sendo integradas; o reconhecimento da circular serve exclusivamente para não atribuir significado físico ao seu truncamento.

## Reprodução, build e navegador

Em um ambiente Node 22 com instalação normal:

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm validate
pnpm validate:audit
pnpm build
```

Nesta máquina, TypeScript `tsc --noEmit` passou. Os testes e os dois geradores foram executados com transpilação TypeScript local e `node:test`, sem subprocessos. O método de verificação evita o subprocesso de esbuild que o sandbox bloqueia; não troca as equações dos testes.

O runtime local utilizado foi Node 24.19.0. `npm` não está no PATH desse ambiente. A tentativa pelo pnpm fornecido pela ferramenta também foi interrompida pela preparação automática de dependências compartilhadas: rede restrita e proteção da pasta node_modules vinculada a outra cópia local. Por isso os dois estágios do script de produção foram verificados diretamente, sem reinstalar ou remover dependências. O projeto não contém um script de lint; a verificação estática disponível é TypeScript.

**O build padrão de produção não foi confirmado:** o Vite/esbuild foi bloqueado neste ambiente por `spawn EPERM`. Uma compilação de verificação Vite/Rollup com transpilação TypeScript local foi executada, sem minificação, mantendo os arquivos de configuração de produção. Ela verifica resolução de módulos e empacotamento, mas não substitui a execução do build padrão na Vercel.

A inspeção visual de outubro foi interrompida porque a ferramenta não conseguiu determinar com segurança a URL da janela. Não se declara validação visual concluída desta versão. Os registros de setembro em INTERFACE.md são históricos. Os testes sem navegador verificam os callbacks reais do gerenciador de gráficos e as layers dos objetos Three.js, mas não verificam layout, GPU ou interação completa.

`vercel.json`, `vite.config.ts`, lockfiles e dependências permanecem compatíveis com a estrutura existente: `pnpm run build`, saída `dist`, Root Directory na pasta que contém `package.json`. Nenhum deployment novo foi publicado. O ZIP contém o código-fonte e os documentos, sem node_modules, Git ou um dist antigo.

## Arquivos modificados nesta auditoria

- `src/physics/diagnostics.ts`: taxa local reutilizável, condicionamento e alarmes robustos.
- `src/physics/initialConditions.ts`: escolha comum de passo e reconhecimento circular analítico.
- `src/simulation/trajectory.ts`: períodos interpolados, circular e primeira volta azimutal.
- `src/entities/VectorField.ts`: layers recursivas das setas.
- `src/main.ts`: integração das correções, rótulos e métricas sem buffer redundante.
- `src/ui/ChartsManager.ts`: tooltips e persistência da legenda, incluindo componentes fisicamente desligadas.
- `src/ui/chartPresentation.ts`: novo helper de apresentação, sem equações físicas.
- `index.html`: rótulo do preset circular.
- `tests/audit.test.ts`: onze testes de regressão adicionais.
- `tests/report.ts`: passo comum consistente com a aplicação e raio solar centralizado.
- `tests/auditReport.ts`: relatório reproduzível de cinco Gyr, presets, falhas e observações.
- `package.json`: script `validate:audit`, sem mudar dependências.
- `README.md`, `docs/MODELO-TCC.md`, `PARAMETROS.md`, `INTERFACE.md`: documentação corrigida.
- `docs/VALIDACAO.md`, `validation-results.json`: resultados regenerados. `rotation-curve.csv` também foi regenerado e permaneceu idêntico, pois o potencial e os parâmetros foram preservados.
- `docs/audit-results-2026-10-08.json`, `PENTE-FINO-2026-10-08.md`: evidências e este relatório.

## Limitações científicas que permanecem

Potencial estático e axisimétrico, sem força de barra ou espirais, auto-gravidade do traçador, gás ou evolução cosmológica. O intervalo de cinco Gyr é um teste do modelo estacionário, não uma previsão histórica da órbita solar nesse período. O domínio central cuspado excluído não deve ser extrapolado para r=0. A curva externa não reproduz todos os dados recentes. Precisão de integração, adequação observacional e hipótese física são avaliações distintas.

Para a apresentação, o título e as legendas devem continuar identificando a comparação de **potenciais com as mesmas condições iniciais**, a natureza aproximada do preset solar e o papel exclusivamente visual dos braços. As três componentes gravitacionais e seus valores foram preservados integralmente.
