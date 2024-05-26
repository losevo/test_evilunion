'use client'
import { Raleway } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';
import { Container } from "@mui/material";
import Image from "next/image";
import clickIcon from '../../public/click.svg'
import { Suspense } from "react";

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="ru">
      <body className={raleway.className}>
      <main className={styles.main}>
      <Container>
        <Container fixed className={styles.title}>
          <div className={styles.pokemonApi}>
            <p>ПОКЕМОНЫ API</p>
          </div>
          <div className={styles.clickPokemon}>
            <Image src={clickIcon} alt="Кликни" />
            <div>
              <p>Нажмите на нужного покемона</p>
            </div>
          </div>
        </Container>
          {children}
      </Container>
    </main>
        </body>
    </html>
  );
}
