# Validação numérica reproduzível

Execute `pnpm test` e `pnpm validate`. Este relatório é gerado por `tests/report.ts`; resultados detalhados em validation-results.json e curvas em rotation-curve.csv. Não são observações do céu.

## Órbitas circulares — dez períodos por raio

| R (kpc) | vc (km/s) | Período (Myr) | h (Myr) | máximo ΔR/R | máximo erro E | máximo erro Lz |
|---|---|---|---|---|---|---|
| 0.5 | 142.760 | 21.517 | 0.01467 | 4.689e-6 | 1.743e-12 | 1.792e-14 |
| 1 | 153.082 | 40.133 | 0.01886 | 1.763e-6 | 3.829e-13 | 1.281e-14 |
| 2 | 192.210 | 63.926 | 0.02362 | 9.914e-7 | 2.380e-13 | 1.420e-14 |
| 5 | 234.464 | 131.015 | 0.04622 | 1.183e-6 | 5.145e-13 | 1.125e-14 |
| 8.178 | 231.403 | 217.122 | 0.08179 | 1.508e-6 | 8.759e-13 | 1.646e-14 |
| 15 | 219.758 | 419.347 | 0.18254 | 2.050e-6 | 1.836e-12 | 8.277e-15 |
| 30 | 206.293 | 893.435 | 0.47242 | 3.073e-6 | 4.990e-12 | 2.454e-14 |
| 50 | 194.035 | 1583.130 | 0.94907 | 4.127e-6 | 1.017e-11 | 9.562e-15 |

O passo fixo resolve o menor período linear (azimutal, radial ou vertical) em 1024 amostras. O seletor permite 2048 e 4096 sem mudar o campo. O domínio 0,5–50 kpc é uma escolha operacional de validação, não o tamanho físico ou truncamento do halo.

## Traçador solar — cinco Gyr

| Halo | máximo erro E | máximo erro Lz | R mínimo/máximo (kpc) | máximo |z| (kpc) |
|---|---|---|---|---|
| Sim | 6.525e-8 | 1.322e-14 | 8.099 / 9.268 | 0.1115 |
| Não | 4.289e-7 | 2.666e-14 | 8.160 / 40.709 | 0.3594 |

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

## Limitações

Potencial fixo, sem barra gravitacional, braços gravitacionais, gás, auto-gravidade do traçador, relaxação ou crescimento cosmológico. Dez períodos não provam estabilidade por tempo infinito. A distribuição decorativa não é catálogo, modelo fotométrico ou solução da equação de Boltzmann. O modelo Gala v1 é histórico; precisão numérica não implica que seja o melhor modelo atual da Galáxia.
