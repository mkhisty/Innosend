'use client'

import styles from '@/css/page.module.css'
import NavBar from '../components/NavBar'
import HeroSvg from "../../public/hero.svg"
import Image from 'next/image'
import { Text } from '@mantine/core'
import ColorSchemeContext from './ColorSchemeContext'
import { useContext } from 'react'
import ColorToggle from '@/components/ColorToggle'
import Background from '@/components/Background'

export default function Home() {
  const colorSchemeContext = useContext(ColorSchemeContext)
  const dark = colorSchemeContext.colorScheme === 'dark';

  return (
    <main>
      <NavBar />
      <div className={styles.herodiv}>
        <div className={styles.textdiv}>
            <h1 style={{ color: dark ? 'white' : 'black' }}>Nurturing</h1>
            <Text
              fw={900}
              variant='gradient'
              gradient={{ from: '#3275e3', to: '#26e7e3', deg: -90 }}
              className={styles.gradienttext}
            >
              Innocence
            </Text>
        </div>
        <Image 
          priority
          src={HeroSvg}
          width={530}
          height="auto"
          className={styles.herosvg}
        />
        <div className={styles.textdiv}>
            <h1 style={{ color: dark ? 'white' : 'black' }}>Empowering</h1>
            <Text
              fw={900}
              variant='gradient'
              gradient={{ from: '#3275e3', to: '#26e7e3', deg: -90 }}
              className={styles.gradienttext}
            >
              Conversations
            </Text>
        </div>
      </div>
      <Background />
      <ColorToggle/>
    </main>
  )
}