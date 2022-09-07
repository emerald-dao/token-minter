---
title: Crear NFTs
author: CuriosityFlow
index: 3
language: es
---

# ¿De qué está hecho un NFT?

Para crear un NFT, debemos tener los siguientes componentes:

- **Contratos Inteligentes:** La aplicación que contiene las reglas para realizar transacciones en el Blockchain.
- **Metadatos:** Una lista de atributos generalmente en el formato de pares 'clave/valor'. Esto provee la originalidad del NFT.
- **Almacenamiento de Activos:** Almacenamiento "fuera de cadena" (o fuera del Blockchain) que guarda archivos como imágenes (.png, etc.) o video (.mp4, etc.) de un NFT.

Antes de profundizar, veamos el diagrama que provee una vista aérea de los componentes que forman un NFT:

Diagrama 2.1 El proceso de principio a fin para desplegar un NFT

## Contatos Inteligentes

Los contratos inteligentes son programas o códigos que actúan como "reglamentos" en el Blockchain. Ellos gobiernan lo que los usuarios, que interactúan con éstos, pueden y no pueden hacer. En el contexto de los NFTs, los contratos inteligentes definen cómo los NFTs son creados, cómo los NFTs mantienen un rastreo de su propia información, lo que puedes hacer con ellos y cómo las personas los pueden almacenar (entre tantas opciones más). Estos contratos nos permiten crear colecciones NFT y "mintear" (crear) nuestros NFTs.

La parte genial es que tenemos acceso completo y público al historial de cualquier NFT en cualquier momento, debido a que los contratos inteligentes viven en el Blockchain. ¿Quieres saber quienes mintearon originalmente un NFT? ¿O quienes hicieron transacciones con éste? ¿O por cuánto se vendió? Lo único que debes hacer es revisar su historial de Blockchain.

En [el Blockchain de Flow](http://onflow.org), los contratos inteligentes están escritos en un lenguaje de programación computacional llamado Cadence, que es muy distinto al idioma de Solidity que se usa para contratos inteligentes en [el Blockchain de Ethereum](https://ethereum.org/en/). En la Sección 3, veremos las ventajas y desventajas de este idioma en contraste con otros como Solidity.

Diagrama 2.2 Un ejemplo de un contrato inteligente escrito en Cadence

## Los metadatos

Los metadatos es un término usado para describir los detalles del NFT o cualquier activo. ¿Cómo se ve, por ejemplo, la diferencia entre un Primate Aburrido (Bored Ape) y un CryptoPunk? ¿Qué atributos/características se asocian con él? ¿Cuál es su número serial? En el contexto de los NFTs, los metadatos representan lo que un NFT en realidad es. Tiene muchos campos como su nombre, número serial y descripción que personalizan el NFT y lo hacen único. El único campo que  todos los NFTs tienen en común es un "Id", el cual representa una identidad única para cada NFT. Si dos NFTs en algún momento tienen el mismo Id, se vuelven fungibles. Aquí tenemos una lista de atributos comunes:

- Id - un Id único del NFT (es diferente para cada NFT, o se vuelve fungible)
- Nombre - Nombre del NFT
- Descripción - una descripción escrita del NFT
- Rareza - una medida que determina qué tan raro, o único, es un NFT entre NFTs similares en todo el Blockchain y dentro de su misma colección
- Serial - representa el número serial del NFT relativo a otros en la misma colección (ej: #3 de 40)
- Colección - la colección NFT a la que pertenece, creada por el autor, la autora o artista original
- Tipo - si representa un activo dentro de un videojuego, puede ser usado para ayudar a los jugadores, volviendo más divertido y significativo jugar a videojuegos Blockchain
- Regalías - cada vez que un NFT es comprado y vendido, X cantidad de esa venta se destina a la persona que está almacenada en este campo

...pero existen una infinidad más de campos que pueden describir a un NFT. Es la decisión del creador(a) del NFT por completo describir cuales metadatos su NFT tiene. De igual manera, es la decisión del desarrollador del contrato inteligente almacenar o referirse a estos metadatos adecuadamente dentro del mismo NFT.  Sin embargo, el problema es el costo elevado de almacenar datos en el Blockchain. Así que debemos ser cuidadosos de almacenar únicamente información pequeña en el Blockchain y almacenar información más pesada en otras partes...

## Almacenamiento de Activos

Pedazos de información pequeños de metadatos como el nombre y la descripción (las cuales son solo texto) son económicos de almacenar dentro del mismo NFT. No obstante, información como imágenes y videos se vuelven rápidamente más costosos de almacenar en el Blockchain. Para manejar esto, usamos servicios como [IPFS](https://ipfs.io/), la cual es una red de almacenaje descentralizada. Podemos subir nuestras imágenes al IPFS, lo que nos regresará un "CID" o "hash" (una serie de números y letras arbitrarias, _ej: 89d89wy8989dwq89d9qwydqw89_) que hacen referencia a estos datos. Luego, podemos almacenar este CID en el NFT que se encuentra en el Blockchain, volviéndolo súper barato mientras que accedemos datos más costosos usando el CID cuando queramos.

<Diagram name="Flujo de datos hacia/desde IPFS" number="2.4">
  <IpfsFlow/>
</Diagram>
