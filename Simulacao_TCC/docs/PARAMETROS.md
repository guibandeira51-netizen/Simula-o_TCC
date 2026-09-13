# Parâmetros, unidades e justificativas

## Convenções

Sistema galactocêntrico cartesiano destro: x inicial aponta do centro para o traçador; y aponta na direção da rotação escolhida; z aponta para o polo norte do modelo. R=sqrt(x²+y²), r=sqrt(R²+z²). Assim U solar positivo para o centro corresponde a v_x=−U no estado inicial. A origem azimutal φ=0 é uma escolha de coordenadas, não uma medição.

Estado integrado: posição em kpc, velocidade em kpc/Gyr, tempo em Gyr. Interface: km/s; potenciais e energias específicas em (km/s)²; Lz específico em kpc km/s; acelerações exibidas em (km/s)²/kpc. As conversões ficam em `src/physics/units.ts`; o integrador não recebe fatores gráficos. Uma unidade gráfica de posição equivale a um kpc, mas tamanho, brilho e halo luminoso dos marcadores são exagerados. As estrelas decorativas não têm massa na integração.

## Constantes e conversões

| Nome | Valor/definição | Origem |
|---|---|---|
| Unidade astronômica | 149 597 870 700 m | IAU 2012 B2; NASA/JPL |
| Parsec | (648000/π) au | Definição astronômica convencional, IAU 2015 B2 |
| kpc | 1000 pc | Prefixo SI |
| Ano juliano | 365,25 × 86400 s | NASA/JPL |
| Gyr | 10⁹ anos julianos | Prefixo SI |
| GM solar nominal | 1,3271244 × 10²⁰ m³/s² | IAU 2015 B3 |
| G por unidade solar nominal | 4,300917270036278 × 10⁻⁶ kpc (km/s)²/M☉ | Derivado de GM nominal e kpc |
| C: km/s → kpc/Gyr | 1,022712165045695 | Derivado das unidades acima |
| Aceleração | a_interna = C² a_astronômica | (km/s)²/kpc → kpc/Gyr² |

Referências: [NASA/JPL](https://ssd.jpl.nasa.gov/astro_par.html), [resoluções IAU](https://www.iau.org/Iau/Iau/Publications/List-of-Resolutions.aspx), [IAU B3, Prša et al.](https://arxiv.org/abs/1510.07674). O fator 648000 converte radianos para segundos de arco. Para gravitação em massas solares é conveniente usar GM nominal diretamente, evitando multiplicar valores arredondados independentes de G e massa solar. Em SI, a estimativa de G é 6,67430×10⁻¹¹ m³ kg⁻¹ s⁻²; isso não transforma uma massa nominal em medição exata da massa física solar. [NIST](https://www.nist.gov/how-do-you-measure-it/how-do-you-measure-strength-gravity).

## Modelo galáctico escolhido

Adota-se **Gala MilkyWayPotential v1**, um benchmark histórico reproduzível que preserva as famílias de potenciais do projeto e possui ajuste e código públicos. Não misturamos massas de ajustes incompatíveis. A versão v2 é mais recente e usa um disco exponencial aproximado por três potenciais MN; não basta trocar sua massa no disco simples. A escolha v1 prioriza rastreabilidade e comparação das equações existentes, e deve ser identificada em uma apresentação acadêmica como simplificação, não melhor ajuste atual. [Definição dos modelos](https://gala.adrian.pw/en/stable/supporting/define-milky-way-model.html).

| Componente | Símbolo | Valor | Unidade |
|---|---|---|---|
| Disco MN | M_d | 6,8×10¹⁰ | M☉ |
| Disco MN | a_d | 3,0 | kpc |
| Disco MN | b_d | 0,28 | kpc |
| Bojo Hernquist | M_b | 5×10⁹ | M☉ |
| Bojo Hernquist | a_b | 1,0 | kpc |
| Núcleo estelar Hernquist | M_n | 1,71×10⁹ | M☉ |
| Núcleo estelar Hernquist | a_n | 0,07 | kpc |
| Halo NFW | A=4πρ_s r_s³ | 5,4×10¹¹ | M☉ |
| Halo NFW | r_s | 15,62 | kpc |

Todos os valores da tabela vêm da [implementação oficial Gala v1](https://gala.adrian.pw/en/stable/_modules/gala/potential/potential/builtin/special.html), cuja construção também remete a [Bovy (2015)](https://arxiv.org/abs/1412.3451). Não se atribuem incertezas individuais inexistentes na tabela de parâmetros. O núcleo é uma distribuição estelar estendida, não um buraco negro pontual. Ele foi mantido porque é um componente separado do benchmark Gala v1, mas isso não autoriza identificá-lo diretamente com o núcleo estelar nuclear observado: [Schödel et al. (2014)](https://arxiv.org/abs/1403.6657) medem aproximadamente 2,5×10⁷ M☉ e raio de meia luz 4,2 pc para o MWNSC, enquanto o termo do ajuste tem A=1,71×10⁹ M☉ e escala 70 pc. A interpretação conservadora é que o termo compacto do potencial agrega massa estelar interna não resolvida pelo benchmark; não há dupla contagem no código, porque cada termo entra uma única vez, mas os termos não devem ser apresentados como um censo observacional literal. A densidade NFW é derivada: ρ_s=A/(4πr_s³), mostrada na interface. A não é M200 nem massa total. Sem truncamento, M(<r) diverge logaritmicamente em r→∞; Φ tende a zero e pode definir energia de escape no potencial idealizado. Não extrapolar a representação física do halo ao infinito.

A escala a_d do potencial MN não é automaticamente uma escala exponencial de densidade. b_d também é parâmetro do potencial, não uma afirmação de que toda a população observada tem exatamente essa altura exponencial.

## Estado inicial solar

| Parâmetro | Valor adotado | Incerteza publicada e fonte |
|---|---|---|
| R☉ | 8,178 kpc | ±0,013 estatística ±0,022 sistemática; GRAVITY 2019 |
| z☉ | 0,0208 kpc | ±0,0003 kpc; Bennett & Bovy 2019 |
| U☉ | 11,1 km/s | +0,69/−0,75 estatística; sistemática ~1 km/s |
| V☉ | 12,24 km/s | ±0,47 estatística; sistemática ~2 km/s |
| W☉ | 7,25 km/s | +0,37/−0,36 estatística; sistemática ~0,5 km/s |

Fontes: [GRAVITY (2019)](https://arxiv.org/abs/1904.05721), [Bennett & Bovy (2019)](https://arxiv.org/abs/1809.03507), [Schönrich, Binney & Dehnen (2010)](https://academic.oup.com/mnras/article/403/4/1829/1054839).

São valores de referência identificados, não uma compilação dos resultados mais recentes em todas as categorias. Reid (2019) encontra R☉=8,15±0,15 kpc por masers; adotamos a distância geométrica GRAVITY com incerteza menor, compatível com esse resultado. O movimento peculiar V difere de estimativas antigas de ~5 km/s porque a correção de deriva assimétrica sofre efeitos de metalicidade, discutidos por Schönrich et al. Não se somam essas estimativas: escolhe-se o conjunto U,V,W de um mesmo estudo.

q₀=(R☉,0,z☉); v₀=C(−U☉,v_c(R☉)+V☉,W☉). O v_c vem da força do modelo, **não** de uma constante arbitrária fixada para tornar a órbita circular. Isso é um traçador com cinemática solar aproximada; diferenças entre o campo adotado e a Galáxia real impedem chamar a trajetória de reconstrução da história solar. Não propagamos as incertezas como ensemble Monte Carlo nesta versão.

O preset circular usa z=v_R=v_z=0 e v_φ=v_c(R) no campo selecionado. O preset perturbado usa v_R=0,01v_c: amplitude experimental pequena para testar a aproximação linear epicíclica; não é observação nem excentricidade alvo. Os zeros são condições matemáticas do experimento e da simetria. O raio editado pelo usuário é um parâmetro experimental explicitamente escolhido em kpc, não uma distância atribuída a uma estrela observada. Em potenciais estendidos, órbitas não circulares geralmente precessam; não se promete elipse kepleriana fechada.

## Restrições observacionais para comparação

- Eilers (2019): v_c=229,0±0,2 km/s no raio de referência 8,122 kpc; o ±0,2 é formal/estatístico e os sistemáticos são aproximadamente 2–5%. O modelo resulta em 231,516 km/s nesse raio.
- Reid (2019): R☉=8,15±0,15 kpc e v_c=236±7 km/s, ajustados a cinemática de masers. O modelo resulta em 231,460 km/s nesse raio.

Fontes: [Eilers et al.](https://arxiv.org/abs/1810.09466), [Reid et al.](https://arxiv.org/abs/1910.03357). Traçadores, pressupostos e raios diferem; não tratar pontos como medições independentes de um mesmo parâmetro sem covariâncias. Os dois pontos da UI são restrições resumidas; não inventamos amostras da curva observacional. A curva desenhada é calculada do potencial. O benchmark Kepler concentra a massa bariônica selecionada no centro: v_K=sqrt(GM_bar/R). Sua divergência no centro é esperada e ele só é boa aproximação de uma distribuição finita em raios grandes; “sem halo” preserva um disco estendido.

## Escolhas numéricas e de apresentação

1024 passos por menor período linear (opções 2048, 4096), diferencial relativo 10⁻⁴ para curvatura, transição da série NFW u=10⁻³, tolerâncias E=10⁻⁴ e Lz=10⁻⁸ e hω=0,03 são **critérios numéricos**, sustentados pelos testes de convergência e invariantes. Não são constantes universais. Na transição NFW a série vai até u⁸; o erro relativo de truncamento é O(u⁷). O domínio validado é 0,5–50 kpc, com folga relativa 10⁻⁴ para não pausar uma órbita exatamente na borda por oscilações numéricas muito menores que a escala. A representação real dentro de ~5 kpc requer cuidado por causa da barra, que não é modelada.

A cada execução h permanece fixo. A velocidade na tela (0,02–0,20 Gyr por segundo), o limite de trabalho por quadro, a frequência de gráficos e a amostragem da cauda controlam apresentação, não as equações de movimento. Em sobrecarga a dívida temporal é retida e sinalizada, sem aumentar h; aba oculta suspende apresentação e não recupera o intervalo de suspensão. A integração é em double; apenas as coordenadas copiadas para a GPU são Float32.

## Parâmetros exclusivamente visuais

`src/visualization/config.ts` contém contagens, seed, frações de populações, espessuras gráficas, escalas, dispersões e brilho. As posições visuais não são sorteadas de uma função de distribuição de equilíbrio. O disco amostra p(R)∝R exp(−R/Rd) por R=−Rd ln(U₁U₂); os braços usam espirais logarítmicas com dispersão variável e aglomerados; o bojo usa a CDF radial de Hernquist truncada com achatamento gráfico. Cores separam qualitativamente populações, sem calibragem fotométrica. Quatro braços e pitch de 18° são escolhas de ilustração inspiradas na morfologia discutida por [Reid et al. (2019)](https://arxiv.org/abs/1910.03357), **não** um ajuste dos braços observados, que têm pitches e segmentos distintos.

O halo luminoso decorativo representa estrelas difusas, não matéria escura. Poeira é uma aproximação por transparência; não resolve transporte radiativo. Núcleo, estrelas e traçador não têm tamanhos ou luminosidades físicos. A imagem é estática enquanto o traçador evolui num potencial fixo; não animamos braços com uma velocidade de padrão inventada. Desativar ou reduzir a qualidade gráfica não muda nenhum estado físico.
