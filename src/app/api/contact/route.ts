// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const ContactSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(1, 'Sujet requis'),
  message: z.string().min(1, 'Message requis'),
  hp: z.string().optional(),
});

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL ||
  `no-reply@${process.env.NEXT_PUBLIC_HOSTNAME || 'example.com'}`;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error('[contact-route] RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }
    if (!CONTACT_TO) {
      console.error('[contact-route] CONTACT_TO_EMAIL not configured');
      return NextResponse.json(
        { error: 'Recipient not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const data = ContactSchema.parse(body);

    // Honeypot anti-spam : si rempli, on bloque (retour 200 pour ne pas informer le bot)
    if (data.hp && data.hp.trim().length > 0) {
      console.warn('[contact-route] Honeypot triggered — dropping message');
      return NextResponse.json({ ok: true });
    }

    // Construire le contenu html
    const html = `
      <p><strong>Nom :</strong> ${escapeHtml(data.name)}<br/>
      <strong>Email :</strong> ${escapeHtml(data.email)}</p>
      <hr/>
      <div>${nl2br(escapeHtml(data.message))}</div>
    `;

    // Envoi via Resend
    let sendResult: unknown = null;
    try {
      // cast minimal pour satisfaire l'API sans utiliser any partout
      // le SDK Resend gère l'objet, on ne manipule pas son type ici
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sendResult = await (resend!.emails as any).send({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        subject: `[Portfolio] ${data.subject}`,
        html,
        headers: {
          'Reply-To': data.email,
        },
      });
    } catch (sendErr: unknown) {
      console.error('[contact-route] Resend.send failed:', sendErr);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 502 }
      );
    }

    // Tout OK — retourner un identifiant si disponible
    return NextResponse.json({ ok: true, result: sendResult || null });
  } catch (err: unknown) {
    console.error('[contact-route] Handler error:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: err.issues },
        { status: 400 }
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* Helpers */
function escapeHtml(str: string) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function nl2br(str: string) {
  return str.replace(/\n/g, '<br/>');
}
