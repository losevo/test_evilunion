'use client'
import { Raleway } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';
import { Container } from "@mui/material";
import Image from "next/image";
import clickIcon from '../../public/click.svg'

const raleway = Raleway({ subsets: ["latin"] });

const RootLayout = ({ children }) => {

  return (
    <html lang="ru">
      <body className={raleway.className}>
      <main className={styles.main}>
      <Container className={styles.mainContainer}>
        <Container fixed className={styles.title}>
          <Container className={styles.pokemonApi}>
            <p>ПОКЕМОНЫ API</p>
          </Container>
          <Container className={styles.clickPokemon}>
            <Image src={clickIcon} alt="Кликни" />
            <div>
              <p>Нажмите на нужного покемона</p>
            </div>
          </Container>
        </Container>
          {children}
      </Container>
    </main>
        </body>
    </html>
  );
}

export default RootLayout;
