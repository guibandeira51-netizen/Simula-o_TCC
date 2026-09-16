# Validação numérica reproduzível

Execute `pnpm test` e `pnpm validate`. Este relatório é gerado por `tests/report.ts`; resultados detalhados em validation-results.json e curvas em rotation-curve.csv. Não são observações do céu.

Na execução local equivalente (TypeScript compilado para CommonJS, porque o
ambiente de desenvolvimento bloqueia o processo auxiliar do esbuild), a suíte
passou em **30/30 testes**. A soma das acelerações e as identidades da curva de
rotação foram verificadas com tolerância absoluta de 10⁻¹² nas unidades internas;
as integrações circulares mantiveram erro relativo máximo de energia entre
1,0×10⁻¹¹ e 1,0×10⁻¹² nos raios testados e erro relativo de Lz da ordem de
10⁻¹⁴. Os valores completos e reproduzíveis ficam no JSON gerado.

## Órbitas circulares — dez períodos por raio

| R (kpc) | vc (km/s) | Período (Myr) | h (Myr) | máximo ΔR/R | máximo erro E | máximo erro Lz |
|---|---|---|---|---|---|---|
| 0.5 | 142.760 | 21.517 | 0.01467 | 4.689e-6 | 1.743e-12 | 1.035e-14 |
| 1 | 153.082 | 40.133 | 0.01886 | 1.763e-6 | 3.841e-13 | 1.300e-14 |
| 2 | 192.210 | 63.926 | 0.02362 | 9.914e-7 | 2.389e-13 | 1.006e-14 |
| 5 | 234.464 | 131.015 | 0.04622 | 1.183e-6 | 5.150e-13 | 9.504e-15 |
| 8.178 | 231.403 | 217.122 | 0.08179 | 1.508e-6 | 8.757e-13 | 2.223e-14 |
| 15 | 219.758 | 419.347 | 0.18254 | 2.050e-6 | 1.837e-12 | 7.587e-15 |
| 30 | 206.293 | 893.435 | 0.47242 | 3.073e-6 | 4.994e-12 | 9.699e-15 |
| 50 | 194.035 | 1583.130 | 0.94907 | 4.127e-6 | 1.016e-11 | 9.937e-15 |

O passo fixo resolve o menor período linear (azimutal, radial ou vertical) em 1024 amostras. O seletor permite 2048 e 4096 sem mudar o campo. O domínio 0,5–50 kpc é uma escolha operacional de validação, não o tamanho físico ou truncamento do halo.

## Traçador solar — cinco Gyr

| Halo | máximo erro E | máximo erro Lz | R mínimo/máximo (kpc) | máximo |z| (kpc) |
|---|---|---|---|---|
| Sim | 6.525e-8 | 2.814e-14 | 8.099 / 9.268 | 0.1115 |
| Não | 4.289e-7 | 2.735e-14 | 8.160 / 40.709 | 0.3594 |

O cenário sem halo recebe exatamente o estado inicial do cenário completo. A órbita não circular resultante não deve ser chamada automaticamente de instável. E e Lz são conservados em cada potencial separadamente; a energia inicial não precisa coincidir entre cenários.

## Convergência

Em 0,2 Gyr, usando 500, 1000 e 2000 passos, a razão ||q_h−q_h/2|| / ||q_h/2−q_h/4|| foi **4.00007**, compatível com ordem dois (razão esperada 4). Conservação de energia sozinha não controla erro de fase. A suíte também compara a trajetória elíptica de Kepler com a solução da equação de Kepler, reversibilidade, período epicíclico, gradientes 3D e o vetor de momento angular em campo esférico.

## Código original — medição sem correções

A fixture é cópia arquivada da implementação original, usada somente em testes. Os estados e modelos originais diferem dos novos; esta tabela não isola a influência exclusiva de h.

| Halo | h (Myr) | máximo erro E em 5 Gyr | máximo erro Lz |
|---|---|---|---|
| Sim | 1 | 2.899e-6 | 8.026e-15 |
| Não | 1 | 2.106e-4 | 4.510e-14 |

A existência de pequenas oscilações de energia no original não implica divergência. O diagnóstico identifica ausência de garantias/testes e deficiências de implementação, sem afirmar que todas as órbitas antigas explodem.

## Comparação observacional — não é teste de integração

| R (kpc) | observado (km/s) | modelo (km/s) | diferença (km/s) |
|---|---|---|---|
| 8.122 | 229 | 231.516 | 2.516 |
| 8.15 | 236 | 231.460 | -4.540 |

Fontes: [Eilers et al. (2019)](https://arxiv.org/abs/1810.09466), com erros estatísticos e sistemáticos distintos, e [Reid et al. (2019)](https://arxiv.org/abs/1910.03357). Os raios e métodos diferem. Não se calcula χ² a partir de erros estatísticos isolados nem se afirma um novo ajuste da Via Láctea.

## Detecção automática

A cada passo: estado finito, domínio operacional, erro normalizado de energia (limite 10⁻⁴), momento angular (10⁻⁸) e hω local (0,03). Máximos históricos são retidos. ω local inclui cruzamento radial, aceleração e curvatura vertical. O programa pausa se qualquer cenário exceder o limite. Esses limites são tolerâncias de engenharia; não valores astronômicos. A detecção não prova ausência de erro de fase, caos ou adequação observacional.

## Evidência dinâmica da matéria escura

Na aba **Matéria escura**, a curva é recalculada a partir do mesmo campo que o
integrador usa. Para cada raio, as componentes são obtidas de
`v_c²(R) = −R a_R(R,0)` e combinadas como
`v_bar² = v_disco² + v_bojo² + v_núcleo²` e
`v_total² = v_bar² + v_halo²`. O painel exibe as seis curvas, um marcador no
raio atual, pontos observacionais independentes e tooltips com a fonte.

Também são mostradas a discrepância dinâmica `D(R)=v_total²/v_bar²`, as frações
`f_halo=v_halo²/v_total²` e `f_bar=v_bar²/v_total²`, e a massa dinâmica
equivalente `Rv_c²/G` **sob aproximação esférica**. Esta massa não é apresentada
como massa real encerrada, pois o disco Miyamoto–Nagai é achatado.

O botão de comparação mantém o mesmo estado inicial e integra, em paralelo, o
campo completo e o campo com o halo desligado. O gravador mede Rmin, Rmax,
pericentro, apocentro, excentricidade radial, velocidades médias, períodos
radial e azimutal, avanço de fase e `Δr(t)=|r_halo-r_sem-halo|`. A separação é
desenhada em um gráfico separado; nenhuma estrela decorativa participa desses
cálculos.

Os testes automatizados verificam explicitamente a soma vetorial das
acelerações, `v_c² = −R a_R`, soma quadrática das contribuições, fechamento das
frações e massa dinâmica equivalente. Assim, desligar o halo no controle altera
simultaneamente a força, a curva e os diagnósticos derivados.

## Limitações

Potencial fixo, sem barra gravitacional, braços gravitacionais, gás, auto-gravidade do traçador, relaxação ou crescimento cosmológico. Dez períodos não provam estabilidade por tempo infinito. A distribuição decorativa não é catálogo, modelo fotométrico ou solução da equação de Boltzmann. O modelo Gala v1 é histórico; precisão numérica não implica que seja o melhor modelo atual da Galáxia.
O painel também calcula a diferença de avanço azimutal entre os cenários
(`Δφ_halo − Δφ_sem-halo`), além de exibir cada avanço separadamente.
