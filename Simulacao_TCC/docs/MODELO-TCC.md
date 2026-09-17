# Modelo de três componentes do TCC

## Escopo e equações

O modelo contém exclusivamente bojo Hernquist, disco Miyamoto–Nagai e halo NFW. Os parâmetros destes três termos foram preservados; não houve redistribuição de massa nem novo ajuste observacional. A procedência dos valores é Gala v1, mas o modelo selecionado não é o ajuste integral daquele benchmark.

- Φ_bojo = −G M_b/(r+a_b).
- Φ_disco = −G M_d/√[R²+(a_d+√(z²+b_d²))²].
- Φ_halo = −G A ln(1+r/r_s)/r, com limite central −G A/r_s.
- Φ_completo = Φ_bojo + Φ_disco + Φ_halo; Φ_bariônico = Φ_bojo + Φ_disco.
- a = −∇Φ; o fator C² converte (km/s)²/kpc para kpc/Gyr² apenas na saída da aceleração.
- vc² = −R a_R/C² no plano z=0. Contribuições somam em vc².
- E = |v|²/2 + Φ, Lz = x vy − y vx = R vφ, com velocidades em km/s.

O sinal de Φ já é negativo: subtrair Φ no cálculo de energia seria incorreto. Usamos Φ(∞)=0 e classificação energética E₀<0 ligada, E₀≥0 não ligada. Referência: [Bovy, Dynamics and Astrophysics of Galaxies, escape velocity](https://galaxiesbook.org/chapters/I-02.-Elements-of-Classical-Mechanics_2-Escape-velocity.html). As fontes dos potenciais e todos os valores permanecem em PARAMETROS.md e src/data/parameters.ts.

## Protocolo experimental

O preset é calculado uma única vez no potencial completo de referência e copiado para os dois integradores, inclusive após mudar os seletores de campo. As coordenadas e velocidades iniciais coincidem exatamente; somente a seleção do halo difere entre os cenários. Desligar o halo principal torna os dois campos idênticos. Desligar bojo ou disco aplica a mesma seleção aos dois campos; os rótulos deixam de chamar essa seleção de potencial completo.

A fórmula solar original foi preservada: q₀=(R☉,0,z☉), v₀=C(−U☉,vc,completo+V☉,W☉). A velocidade circular é recalculada a partir do modelo atual; não existe velocidade ajustada para produzir uma órbita desejada. A opção circular é circular no potencial completo de referência, não necessariamente nos campos reduzidos.

## Resultados calculados — preset solar, cinco Gyr

| Grandeza | Potencial completo | Potencial bariônico |
|---|---:|---:|
| R₀ (kpc) | 8.178 | 8.178 |
| z₀ (kpc) | 0.0208 | 0.0208 |
| vR₀ (km/s) | -11.100 | -11.100 |
| vφ₀ (km/s) | 241.725 | 241.725 |
| vz₀ (km/s) | 7.250 | 7.250 |
| |v₀| (km/s) | 242.088234 | 242.088234 |
| vc(R₀,z=0) (km/s) | 229.484928 | 175.157811 |
| E₀ ((km/s)²) | -125805.590049 | -6230.549707 |
| Lz₀ (kpc km/s) | 1976.826458 | 1976.826458 |
| Classificação | Órbita ligada | Órbita ligada |
| R mínimo medido (kpc) | 8.098715 | 8.159570 |
| R máximo medido (kpc) | 9.269075 | 42.840535 |
| máx. |ΔE/E₀| | 6.368826e-8 | 1.979262e-6 |
| máx. |ΔLz/Lz₀| | 4.382245e-14 | 1.610274e-14 |

O módulo inicial excede vc,completo em 5.492%, e vc,bariônico em 38.211%. Não se força igualdade ou circularidade no preset solar. Exceder a velocidade circular não implica escapar: E₀ bariônica permanece negativa.

R mínimo/máximo são extremos do intervalo integrado. Periastro e apoastro de R exigem inversão de vR e são estimativas discretas; antes disso ficam nulos. Para E₀≥0 o apoastro e períodos orbitais ficam nulos. O diagnóstico se refere ao raio cilíndrico R, não à distância esférica r. A excentricidade radial exibida é a estimativa do intervalo integrado, não um elemento kepleriano ajustado.

## Validação

- 34 testes passaram, incluindo gradientes 3D de cada termo, oito combinações de seletores, identidade dos estados iniciais, retirada isolada do halo, conservação em cinco Gyr, órbitas circulares em oito raios por dez períodos, Kepler analítico e convergência.
- Resíduo relativo máximo da soma das acelerações: 9.876506e-17.
- Resíduo relativo máximo de vc² = −R aR: 2.138695e-16.
- Razão de convergência de segunda ordem: 4.000073 (esperado ≈4).
- A tolerância da soma vetorial usa oito epsilons de máquina relativos à escala, para acomodar a ordem da soma em ponto flutuante; não é tolerância física.
- TypeScript sem erros. Testes executados com node:test e transpilação TypeScript local, pois o subprocesso esbuild não é permitido neste ambiente.
- Build padrão Vite: bloqueado pelo ambiente com spawn EPERM. Compilação alternativa Vite/Rollup sem minificação passou e serviu à verificação no navegador. Configuração de produção mantida; deploy Vercel não realizado. Não há script de lint no projeto.
- Interface: três seletores, cada um verificado no navegador; desligar halo produziu fração 0% e separação 0 entre as integrações. Sem erros de console na verificação.

Os erros relativos assinados e seus máximos são separados dos erros normalizados por escala robusta que já existiam. Ambos acionam a pausa nas tolerâncias definidas. Se E₀ ou Lz₀ for zero, a razão correspondente é nula no JSON e descrita como indefinida na interface; o diagnóstico por escala continua disponível.

## Arquivos desta revisão

- src/data/parameters.ts: registro físico limitado aos três termos e identificação correta do modelo.
- src/physics/potentials.ts, circularVelocity.ts: potencial, aceleração, tipos e rotação com três termos.
- src/physics/diagnostics.ts: razões relativas assinadas, máximos e detecção.
- src/simulation/comparison.ts: criação dos dois cenários, classificação e diagnóstico inicial compartilhados.
- src/simulation/trajectory.ts: extremos observados separados de apsides detectadas; tratamento de trajetória não ligada.
- src/main.ts: seletores, integração comparativa, diagnósticos, rótulos, vetores e exportação JSON v2.
- src/entities/VectorField.ts: vetores das três componentes.
- src/ui/ChartsManager.ts, UIManager.ts: curvas, legendas e tabela de fontes.
- index.html, src/style.css: controles e apresentação dos diagnósticos de cada cenário.
- tests/physics.test.ts, tests/report.ts: testes e resultados reproduzíveis.
- README.md, docs/PARAMETROS.md, AUDITORIA.md, INTERFACE.md, REVISAO-INTERFACE-ACADEMICA.md: documentação consistente com o modelo atual.
- docs/VALIDACAO.md, validation-results.json, rotation-curve.csv: regenerados; docs/MODELO-TCC.md: este relatório.

O dist antigo não integra a entrega. Código-fonte e fontes permanecem no mesmo projeto; node_modules não é distribuído. A identidade visual acadêmica foi preservada.
