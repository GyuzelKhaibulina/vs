
import { Inter } from 'next/font/google'
import './globals.css';
import Providers from './providers';
import { AuthContexProvider } from '@/context';
import "@uploadthing/react/styles.css";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'рецепты приготовления вкусных блюд с пошаговыми фото кухня кулинария еда cooking recipes dish',
  description: 'приготовить блюдо пошаговый рецепт приготовления готовить вкусную еду кухни мира кулинарная книга готовка легких блюд cooking recipes kitchen preparing simple complex dishes', 
  keywords: 'рецепт, приготовить блюдо, пошаговый рецепт приготовления, готовить вкусную еду, кухни мира, кулинарная книга, готовка блюд, recipes, cooking recipes, kitchen preparing, dishes, cook, eating', 
  robots: 'noindex'
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <AuthContexProvider>
                {children}
            </AuthContexProvider>
        </Providers>
      </body>
    </html>
  )
}
