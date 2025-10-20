import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type Body = {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json()
    const { nombre, email, asunto, mensaje } = body

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ ok: false, error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || user
    const to = process.env.CONTACT_EMAIL || user

    if (!host || !port || !user || !pass) {
      console.error('SMTP no configurado. Define SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS en .env')
      return NextResponse.json({ ok: false, error: 'SMTP no configurado' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: { user, pass }
    })

    const info = await transporter.sendMail({
      from: from || user,
      to: to,
      subject: `[Contacto web] ${asunto}`,
      text: `${mensaje}\n\nDe: ${nombre} <${email}>`,
      html: `<p>${mensaje.replace(/\n/g, '<br/>')}</p><hr/><p>De: ${nombre} &lt;${email}&gt;</p>`,
      replyTo: email
    })

    console.log('Email enviado:', info.messageId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error en API /api/contact:', err)
    return NextResponse.json({ ok: false, error: 'Error interno' }, { status: 500 })
  }
}
