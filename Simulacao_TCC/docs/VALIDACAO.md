# Validação numérica reproduzível

Execute `pnpm test` e `pnpm validate`. Este relatório é gerado por `tests/report.ts`; resultados detalhados em validation-results.json e curvas em rotation-curve.csv. Não são observações do céu.

## Órbitas circulares — dez períodos por raio

| R (kpc) | vc (km/s) | Período (Myr) | h (Myr) | máximo ΔR/R | máximo erro E | máximo erro Lz |
|---|---|---|---|---|---|---|
| 0.5 | 95.196 | 32.268 | 0.01717 | 1.966e-6 | 2.042e-13 | 1.970e-14 |
| 1 | 130.423 | 47.105 | 0.01949 | 1.134e-6 | 1.406e-13 | 2.789e-14 |
| 2 | 183.063 | 67.121 | 0.02378 | 8.580e-7 | 1.730e-13 | 2.282e-14 |
| 5 | 231.393 | 132.754 | 0.04629 | 1.140e-6 | 4.802e-13 | 2.024e-14 |
| 8.178 | 229.485 | 218.937 | 0.08189 | 1.476e-6 | 8.342e-13 | 9.935e-15 |
| 15 | 218.650 | 421.472 | 0.18272 | 2.025e-6 | 1.792e-12 | 2.094e-14 |
| 30 | 205.701 | 896.008 | 0.47282 | 3.053e-6 | 4.923e-12 | 1.076e-14 |
| 50 | 193.657 | 1586.223 | 0.94976 | 4.111e-6 | 1.007e-11 | 6.951e-15 |

O passo fixo resolve o menor período linear (azimutal, radial ou vertical) em 1024 amostras. O seletor permite 2048 e 4096 sem mudar o campo. O domínio 0,5–50 kpc é uma escolha operacional de validação, não o tamanho físico ou truncamento do halo.

## Traçador solar — cinco Gyr

| Halo | máximo erro E | máximo erro Lz | R mínimo/máximo (kpc) | máximo |z| (kpc) |
|---|---|---|---|---|
| Sim | 6.369e-8 | 4.376e-14 | 8.099 / 9.269 | 0.1116 |
| Não | 4.208e-7 | 1.608e-14 | 8.160 / 42.841 | 0.3726 |

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
| 8.122 | 229 | 229.586 | 0.586 |
| 8.15 | 236 | 229.535 | -6.465 |

Fontes: [Eilers et al. (2019)](https://arxiv.org/abs/1810.09466), com erros estatísticos e sistemáticos distintos, e [Reid et al. (2019)](https://arxiv.org/abs/1910.03357). Os raios e métodos diferem. Não se calcula χ² a partir de erros estatísticos isolados nem se afirma um novo ajuste da Via Láctea.

## Detecção automática

A cada passo: estado finito, domínio operacional, erro normalizado de energia (limite 10⁻⁴), momento angular (10⁻⁸) e hω local (0,03). Máximos históricos são retidos. ω local inclui cruzamento radial, aceleração e curvatura vertical. O programa pausa se qualquer cenário exceder o limite. Esses limites são tolerâncias de engenharia; não valores astronômicos. A detecção não prova ausência de erro de fase, caos ou adequação observacional.

## Limitações

Potencial fixo, sem barra gravitacional, braços gravitacionais, gás, auto-gravidade do traçador, relaxação ou crescimento cosmológico. Dez períodos não provam estabilidade por tempo infinito. A distribuição decorativa não é catálogo, modelo fotométrico ou solução da equação de Boltzmann. A procedência dos parâmetros é histórica; a seleção de três componentes não é o ajuste integral Gala v1; precisão numérica não implica que seja o melhor modelo atual da Galáxia.
