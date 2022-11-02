---
title: Introducción a los NFTs
author: CuriosityFlow
index: 2
language: es
---

<script>
  import { PopularNFTs, Diagram, TokenTypes } from "$components/guide-diagrams/index"
</script>

# Introducción a los Tokens No Fungibles (NFTs en inglés)

## ¿Qué es un NFT?

Los tokens, o fichas de caracteres, no fungibles (abreviado como "NFTs" en inglés) son activos digitales que representan objetos del mundo físico y real como música, arte y artículos de un video juego.

En la actualidad, verás que la mayoría de NFTs toma la forma de arte digital y coleccionables de diversos tipos (ejemplo: [NBA TopShot](https://nbatopshot.com/) y [Crypto Kitties](https://www.cryptokitties.co/)). Sin embargo, hay un error común de que todo arte digital son NFTs. Esto es falso. En términos generales, los NFTs son únicos, no pueden ser duplicados y están almacenados en algo llamado el Blockchain, el cual es una red de almacenamiento grande, públicamente accesible y controlada por código llamado contratos inteligentes. Lógicamente, estas características nos permiten que los NFTs sean usados para diversos ámbitos, como:

- **Arte** ([Versus Art](https://www.versus.auction/))
- **Coleccionables** ([NBA TopShot](https://nbatopshot.com/) y [Crypto Kitties](https://www.cryptokitties.co/)))
- **Música** ([Royal](https://royal.io/))
- **Activos de videojuegos** ([Axie Infinity](https://axieinfinity.com/))
- **Boletos de Prueba de Asistencia y Eventos** ([FLOAT](https://floats.city))

<Diagram name="Ejemplo de NFTs populares" number="1.1">
  <PopularNFTs
    flowText="NFTs almacenados en Flow Blockchain"
    ethereumText="NFTs almacenados en Ethereum Blockchain"
  />
</Diagram>

**(1b) Fungible vs. No Fungible**

Para entender mejor el atributo de "originalidad" de un NFT, debemos aprender lo que los Tokens Fungibles son. Los Tokens Fungibles son activos que pueden ser reemplazados por otros del mismo tipo. Por ejemplo, si yo te pidiera que me dieras un billete de $1 a cambio de uno de mis billetes de $1, a ti no te importaría ya que ambos son exactamente lo mismo. Comúnmente, los Tokens Fungibles toman la forma de criptomoneda, una moneda digital que vive en el Blockchain (ej: [ETH](https://www.coindesk.com/price/ethereum/) y [FLOW](https://coinmarketcap.com/currencies/flow/)).

<Diagram name="Diferencias entre tokens fungibles y no-fungibles" number="1.2">
  <TokenTypes
    fungibleDescription="Se pueden cambiar igual por igual. Tienen el mismo valor."
    nonFungibleDescription="No se pueden cambiar igual por igual. Tienen un valor único."
    money="Dinero"
    gold="Oro"
    car="Auto"
    artwork="Obra de Arte"
  />
</Diagram>

## Ejemplo

` `Cuando vas a visitar la Mona Lisa en París, ¿te has preguntado por qué esta pintura es tan especial? Es porque fue pintada por el mismo Leonardo Da Vinci. Si intentaras duplicar la Mona Lisa y venderla, se vendería a un precio _mucho menor_ que la obra original. Ésta tiene historia y fue pintada por Leonardo Da Vinci, mientras que el duplicado no tiene ninguno de estos atributos. Es por esto que el arte o coleccionables digitales son "No Fungibles"; el valor de las "mismas" piezas de arte varía significativamente porque son intrínsecamente distintas (ej: provienen de diferentes artistas, su historia es diferente y única).
