# Auditoria da implementação original

Base: commit `56f368f1ed36c67df23c16441501c87476c2c4ab`. Todos os arquivos originais foram lidos antes das alterações. Os 12 arquivos em `src/` correspondem à cópia de Downloads, desconsideradas quebras de linha. Na cópia de Downloads faltava o nível `src/` esperado pelo HTML; no GitHub a estrutura estava correta.

## Escopo físico e equações

O programa original integra uma partícula de teste em campo analítico externo, estacionário e axisimétrico. Não calcula interações entre estrelas: a afirmação “N-corpos” é incorreta. A aceleração é independente da massa da partícula; as energias exibidas são específicas, em (km/s)². Braços e poeira já eram decorativos; isso será mantido e identificado explicitamente. Não é uma simulação de formação/evolução autogravitante de uma galáxia.

Definições: R²=x²+y², r²=R²+z², B=a_d+sqrt(z²+b_d²), D=sqrt(R²+B²), u=r/r_s, A=4πρ_s r_s³. Potenciais têm zero no infinito.

| Componente | Formulação teórica | Implementação original e conclusão |
|---|---|---|
| Hernquist | Φ_b=−GM_b/(r+a_b); **a**_b=−GM_b **r**/[r(r+a_b)²] | `potBulge` e `accBulge` corretos para r>0. A direção do gradiente no ponto central de uma cúspide não existe; retornar zero em uma bolinha EPS não é uma solução física. |
| Miyamoto–Nagai | Φ_d=−GM_d/D; a_x=−GM_d x/D³; a_y=−GM_d y/D³; a_z=−GM_d Bz/[sqrt(z²+b_d²)D³] | `potDisk` e `accDisk` corretos; b_d>0 torna a componente suave. |
| NFW | ρ=ρ_s/[u(1+u)²]; M(<r)=A[ln(1+u)−u/(1+u)]; Φ_h=−GA ln(1+u)/r; **a**_h=−GM(<r)**r**/r³ | Expressões corretas em domínio regular, mas avaliação direta perde precisão para u pequeno e o potencial dá 0/0 em r=0. A massa total diverge logaritmicamente, embora Φ→0; não chamar A de massa virial ou massa total. |
| Curva circular | v_c²(R)=R ∂Φ(R,0)/∂R=−R a_R(R,0) | `vBulge`, `vDisk`, `vHalo` e soma quadrática corretos no plano. Fora dele v_c(R,0) não garante órbita circular 3D. |
| Epiciclos | κ²=R dΩ²/dR+4Ω²=2[v_c²/R²+(v_c/R)dv_c/dR] | Fórmula de `kappa` correta, mas diferenças finitas sem convergência e clamp em zero escondem κ²<0. Não transforma `e_target` em excentricidade orbital exata. |
| Integração | v_(n+1/2)=v_n+(h/2)a(q_n); q_(n+1)=q_n+h v_(n+1/2); v_(n+1)=v_(n+1/2)+(h/2)a(q_(n+1)) | `step` é leapfrog KDK/velocity Verlet de segunda ordem, apropriado com h fixo e campo estacionário. Não há motivo para trocá-lo por Euler. |

Fontes das equações: [Hernquist (1990)](https://articles.adsabs.harvard.edu/pdf/1990ApJ...356..359H), [Miyamoto & Nagai (1975)](https://articles.adsabs.harvard.edu/pdf/1975PASJ...27..533M), [Navarro, Frenk & White (1997)](https://arxiv.org/abs/astro-ph/9611107). Para integração e conservação: [Springel (2005), §4.1](https://wwwmpa.mpa-garching.mpg.de/gadget/gadget2-paper.pdf).

## Problemas encontrados e correções aplicadas

1. **Cancelamento e origem NFW.** O código usa `log(1+u)-u/(1+u)` diretamente e divide o potencial por r. Usar `log1p`, expansão f(u)=u²/2−2u³/3+3u⁴/4−… quando u é pequeno, e limite Φ(0)=−GA/r_s. Não inserir softening sem modelo; rejeitar avaliação da força cuspada no centro e interromper trajetórias fora do domínio operacional validado. Sustentação: expansão das equações NFW acima.
2. **Parâmetros sem procedência.** G=4.30091e−6 é aproximadamente consistente com unidades astronômicas; C=1.022712165… converte km/s para kpc/Gyr e C² converte (km/s)²/kpc para kpc/Gyr² corretamente. Não há erro de fator 1000 nessas conversões. Mas rs=16, ρs=0.01430 M☉/pc³, Σ0=500 M☉/pc², Rd=3, ad=3, bd=0.25, Mb=10¹⁰ e ab=0.7 não têm referências. Não é possível provar que formam um ajuste observacional coerente. Centralizar e substituir por uma parametrização publicada e identificada, com unidades derivadas de definições documentadas.
3. **Disco exponencial confundido com MN.** Md=2πΣ0 Rd²≈2.8274×10¹⁰ M☉ integra um disco exponencial; não prova que um potencial MN com ad=Rd reproduza essa densidade. A massa MN pode assumir esse valor, mas Σ0 e Rd deixam de ser seus parâmetros físicos. Usar massa e escalas diretamente do modelo MN adotado. Sustentação: Φ_d e equação de Poisson, Miyamoto & Nagai.
4. **Condições iniciais arbitrárias.** r0=8.2 kpc, z0=0.02 kpc e vz=7 km/s parecem solares mas não são atribuídos. vx=e_target κR com e_target=0.05 é uma perturbação epicíclica aproximada; não uma órbita elíptica exata nem uma medição solar. Substituir por presets distintos: circular planar; circular com perturbação radial explicitamente experimental; traçador com posição e movimento peculiar solares observacionais. Aplicar v_R=−U no eixo x positivo para fora do centro, v_φ=v_c+V e v_z=W. Fontes em PARAMETROS.md.
5. **Reset força componentes habilitadas temporariamente.** Isso pode ser útil para comparação com estado inicial idêntico, mas é ambíguo ao usuário que pede uma órbita circular no potencial selecionado. O novo reset calcula o estado no cenário principal selecionado e o copia para o cenário sem halo, identificando o protocolo.
6. **h=0.001 Gyr sem validação.** Um Myr pode ser adequado em alguns raios e inadequado em outros, especialmente verticalmente ou no pericentro. Escolher h a partir das frequências orbital, radial e vertical, fixá-lo durante cada execução e testar convergência com h/2 e h/4. O número de amostras por período é tolerância numérica, não observação astronômica. Monitorar resolução local durante a órbita.
7. **Tempo depende dos FPS.** `delta` é ignorado pela física; cada quadro executa `simSpeed` passos. Separar acumulador de tempo da renderização, limitar trabalho por quadro sem ampliar h e informar atraso. Aba oculta pausa o relógio de apresentação.
8. **Comparação dessincronizada e mudança de Hamiltoniano.** O segundo cenário só avança quando visível. Os toggles alteram o potencial no meio da trajetória sem marcar trabalho externo nem nova referência de energia. Manter os dois relógios sincronizados; alterações de componentes reiniciam um experimento identificado. “Sem halo = instável” não é conclusão válida: potenciais bariônicos também admitem órbitas estáveis.
9. **Ausência de invariantes.** O gráfico mostra apenas K e Φ. Adicionar E=K+Φ, Lz=x vy−y vx e erros normalizados, máximos históricos e estado de resolução. Apenas Lz é conservado com disco axisimétrico; o vetor L completo é conservado em potencial esférico. Momento linear da partícula não é conservado em campo externo. Não atribuir precessão ou oscilação vertical ao erro sem comparar invariantes e convergência.
10. **Aparência e afirmações enganosas.** θ=θ0+0.5r é espiral arquimediana, embora chamada logarítmica; usar θ=θ0+cot(p)ln(R/Rref). R uniforme ou potência de U não amostra disco exponencial (p(R)∝R exp(−R/Rd)); amostrar Gamma(k=2). `r=U³` com z independente não é bojo Hernquist. Novas populações visuais terão amostragem identificada e não alimentarão o campo físico. A poeira antiga é sobreposição alpha, não transporte radiativo; iluminação pontual não afeta shaders sem cálculo de luz. “60 FPS”, “WEBGL2 COMPUTE” e “HDR científico” não são medições e serão removidos.
11. **Problemas gráficos e de interface.** Dois controles de câmera recebem os mesmos eventos; ambas as partículas aparecem nas duas vistas; comparação perde pós-processamento; cor de `OrbitTrail` é ignorada; a cauda desloca e recolore buffers grandes a cada amostra. Corrigir camadas, alvos de interação separados, estilo consistente, buffers circulares e cor. Reduzir partículas mantendo estrutura, limitar pixel ratio e dar suporte a telas pequenas.
12. **Arquitetura e validação ausentes.** Constantes residem no motor; física depende implicitamente da UI; não há testes nem lockfile; `vite build` não verifica TypeScript. Separar módulos, adicionar checagem de tipos e testes físicos reproduzíveis, preservar Vite e saída estática para Vercel.

## Arquitetura de destino

- `src/data`: definições de unidades, fontes, parâmetros e restrições observacionais.
- `src/physics`: potenciais puros, estados iniciais, integrador e diagnóstico; nenhuma importação de Three.js/DOM.
- `src/simulation`: relógio de apresentação e coordenação de experimentos.
- `src/visualization`: escolhas decorativas e distribuição procedural determinística.
- `src/entities`, `src/shaders`, `src/graphics`: buffers, materiais e câmeras.
- `src/ui`: controles, gráficos, telemetria e exportação.
- `tests`, `docs`: comparações analíticas, convergência e documentação científica.

O diagnóstico não estabelece antecipadamente os resultados dos testes. Evidências numéricas e limitações da versão corrigida são registradas separadamente em VALIDACAO.md.
