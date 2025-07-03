import { Metadata } from 'next'
import { personalData } from '@/config/personalData'

export const metadata: Metadata = {
  title: `Proyectos - ${personalData.name}`,
  description: 'Explora mis proyectos de desarrollo web y aplicaciones',
}

export default function ProyectosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
