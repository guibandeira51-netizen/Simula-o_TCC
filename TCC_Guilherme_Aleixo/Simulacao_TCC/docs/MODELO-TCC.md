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

Na referência completa, o preset circular tem |v₀|=229,484928 km/s no raio solar; o preset solar tem |v₀|=242,088234 km/s. Em uma órbita circular, o módulo da velocidade permanece constante e sua direção gira. Desligar componentes preserva v₀ para isolar a mudança de campo; por isso pode produzir uma órbita não circular no potencial reduzido.

`chooseComparisonStep` escolhe um único passo para os dois cenários a partir das frequências azimutal, radial e vertical e da taxa local calculada com a velocidade inicial efetivamente utilizada. Essa taxa inclui |v₀|/r₀, aceleração e curvatura vertical de cada campo. A resolução selecionada reduz o passo, que permanece fixo durante toda a execução.

## Resultados calculados — preset solar, cinco Gyr

| Grandeza | Potencial completo | Potencial bariônico |
|---|---:|---:|
| R₀ (kpc) | 8.178 | 8.178 |
| z₀ (kpc) | 0.0208 | 0.0208 |
| vR₀ (km/s) | -11.100 | -11.100 |
| vφ₀ (km/s) | 241.725 | 241.725 |
| vz₀ (km/s) | 7.250 | 7.250 |
| \|v₀\| (km/s) | 242.088234 | 242.088234 |
| vc(R₀,z=0) (km/s) | 229.484928 | 175.157811 |
| E₀ ((km/s)²) | -125805.590049 | -6230.549707 |
| Lz₀ (kpc km/s) | 1976.826458 | 1976.826458 |
| Classificação | Órbita ligada | Órbita ligada |
| R mínimo medido (kpc) | 8.098715 | 8.159570 |
| R máximo medido (kpc) | 9.269075 | 42.840535 |
| máx. \|ΔE/E₀\| | 6.368826e-8 | 1.979262e-6 |
| máx. \|ΔLz/Lz₀\| | 4.382245e-14 | 1.610274e-14 |

O módulo inicial excede vc,completo em 5.492%, e vc,bariônico em 38.211%. Não se força igualdade ou circularidade no preset solar. Exceder a velocidade circular não implica escapar: E₀ bariônica permanece negativa.

R mínimo/máximo são extremos do intervalo integrado. Periastro e apoastro de R exigem inversão de vR e são estimativas discretas; antes disso ficam nulos. Os tempos das inversões são interpolados entre os passos adjacentes, assim como os tempos de revolução azimutal. Para E₀≥0 o apoastro e períodos orbitais ficam nulos. O diagnóstico se refere ao raio cilíndrico R, não à distância esférica r. A excentricidade radial exibida é a estimativa do intervalo integrado, não um elemento kepleriano ajustado.

Quando o estado inicial satisfaz analiticamente z=vR=vz=0 e |vφ|=vc do campo efetivamente integrado, o registro identifica uma circular planar e não atribui um período radial físico às pequenas oscilações de truncamento. R mínimo/máximo continuam registrados e o período azimutal permanece mensurável. Essa identificação compara a condição inicial com a equação circular, dentro do erro de arredondamento; não aplica um corte de amplitude a trajetórias perturbadas.

## Validação

- 45 testes passaram na revisão de 08/10/2026, incluindo gradientes 3D de cada termo, oito combinações de seletores, identidade dos estados iniciais, retirada isolada do halo, conservação em cinco Gyr, órbitas circulares em oito raios por dez períodos, Kepler analítico e convergência. As regressões adicionais cobrem troca de preset, passo comum em campos reduzidos, energia inicial próxima de zero, circular analítica, períodos interpolados e retenção da seleção de curvas.
- Resíduo relativo máximo da soma das acelerações: 9.876506e-17.
- Resíduo relativo máximo de vc² = −R aR: 2.138695e-16.
- Razão de convergência de segunda ordem: 4.000073 (esperado ≈4).
- A tolerância da soma vetorial usa oito epsilons de máquina relativos à escala, para acomodar a ordem da soma em ponto flutuante; não é tolerância física.
- Os registros anteriores documentam TypeScript sem erros, testes com node:test e transpilação TypeScript local e bloqueio do build padrão por spawn EPERM, além de uma compilação alternativa Vite/Rollup. A validação de produção da revisão de 08/10/2026 é descrita separadamente em PENTE-FINO-2026-10-08.md.
- A verificação de interface de setembro é histórica: três seletores foram exercitados, e desligar o halo produziu fração 0% e separação 0 entre as integrações. A inspeção no navegador da revisão de 08/10/2026 foi interrompida sem confirmação da versão carregada; não constitui validação visual concluída do código atual. Ver INTERFACE.md.

Os erros relativos assinados ΔE/E₀ e ΔLz/Lz₀ e seus máximos permanecem informativos. A pausa por conservação usa somente |ΔE|/max(|E₀|,K₀) e |ΔLz|/max(|Lz₀|,r₀|v₀|), com as tolerâncias numéricas definidas. Estado não finito, saída do domínio operacional ou hω excessivo também acionam a pausa. As razões relativas não controlam o alerta, pois ficam mal condicionadas perto de referências nulas. O diagnóstico informa o condicionamento quando |E₀|≤tolerância_E×escala_E ou |Lz₀|≤tolerância_Lz×escala_Lz. Se a referência for exatamente zero, a razão correspondente é nula no JSON e descrita como indefinida na interface; o diagnóstico por escala continua disponível.

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
