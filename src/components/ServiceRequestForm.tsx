'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { business, telHref } from '@/lib/contact';
import { submitNetlifyForm } from '@/lib/netlifyForms';

export type RequestType = 'servis' | 'pneuservis' | 'proverka' | 'jine';

const typeLabels: Record<RequestType, string> = {
  servis: 'Servis nebo oprava',
  pneuservis: 'Pneuservis',
  proverka: 'Prověření auta před koupí',
  jine: 'Něco jiného',
};

const initialState = {
  name: '',
  phone: '',
  email: '',
  car: '',
  plate: '',
  listing: '',
  location: '',
  package: '',
  preferredDate: '',
  message: '',
};

/**
 * Objednávkový formulář „objednavka“ (Netlify Forms). Pole jsou deklarovaná
 * v public/__forms.html – při přidání pole ho přidejte i tam.
 * Antispam: honeypot `company` + minimální doba vyplňování 3 s.
 * Fotky formulář záměrně nebere – na ty je WhatsApp (viz text pod formulářem).
 */
export default function ServiceRequestForm({ defaultType = 'servis' }: { defaultType?: RequestType }) {
  const router = useRouter();
  const uid = useId();
  const [type, setType] = useState<RequestType>(defaultType);
  const [formData, setFormData] = useState(initialState);
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const renderedAt = useRef<number | null>(null);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  const isInspection = type === 'proverka';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (renderedAt.current === null || Date.now() - renderedAt.current < 3000) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitNetlifyForm('objednavka', {
        type: typeLabels[type],
        ...formData,
        // Pole, která se k typu nehodí, neposíláme – notifikace je pak přehlednější.
        ...(isInspection ? { plate: '' } : { listing: '', location: '', package: '' }),
        consent: consent ? 'ano' : 'ne',
        company: honeypot,
        subject: `${typeLabels[type]} – ${formData.name}${formData.car ? `, ${formData.car}` : ''}`,
      });
      router.push('/dekujeme');
    } catch {
      setSubmitError('Objednávka se neodeslala. Zkuste to prosím znovu, nebo mi rovnou zavolejte.');
      setIsSubmitting(false);
    }
  };

  const id = (name: string) => `${uid}-${name}`;
  const inputCls =
    'w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-slate/60 transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-amber/40';
  const labelCls = 'mb-1.5 block text-sm font-semibold text-ink';
  const hintCls = 'mt-1 text-xs text-slate';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on" noValidate={false}>
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={id('company')}>Firma</label>
        <input
          id={id('company')}
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className={labelCls}>S čím přijedete? *</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(typeLabels) as RequestType[]).map((value) => (
            <label
              key={value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-3 text-center text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-amber/50 ${
                type === value ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white text-ink hover:border-ink/40'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={value}
                checked={type === value}
                onChange={() => setType(value)}
                className="sr-only"
              />
              {typeLabels[value]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={id('name')}>
            Jméno *
          </label>
          <input id={id('name')} name="name" type="text" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor={id('phone')}>
            Telefon *
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="[0-9+\s\-]*"
            value={formData.phone}
            onChange={handleChange}
            className={inputCls}
          />
          <p className={hintCls}>Ozvu se a potvrdím termín.</p>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor={id('email')}>
          E-mail
        </label>
        <input id={id('email')} name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className={inputCls} />
        <p className={hintCls}>Nepovinné. {isInspection ? 'Pošlu na něj i report z prověrky.' : ''}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={id('car')}>
            Auto *
          </label>
          <input
            id={id('car')}
            name="car"
            type="text"
            required
            placeholder="např. Škoda Octavia 2.0 TDI, 2016"
            value={formData.car}
            onChange={handleChange}
            className={inputCls}
          />
        </div>
        {isInspection ? (
          <div>
            <label className={labelCls} htmlFor={id('package')}>
              Kde prověrka proběhne
            </label>
            <select id={id('package')} name="package" value={formData.package} onChange={handleChange} className={inputCls}>
              <option value="">Nevím, poraďte</option>
              <option value="výjezd k prodejci">Přijeďte za autem k prodejci</option>
              <option value="v dílně na zvedáku">Přivezeme auto do dílny</option>
            </select>
          </div>
        ) : (
          <div>
            <label className={labelCls} htmlFor={id('plate')}>
              SPZ
            </label>
            <input id={id('plate')} name="plate" type="text" autoComplete="off" value={formData.plate} onChange={handleChange} className={inputCls} />
            <p className={hintCls}>Nepovinné – pomůže mi dohledat správné díly.</p>
          </div>
        )}
      </div>

      {isInspection && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor={id('listing')}>
              Odkaz na inzerát
            </label>
            <input
              id={id('listing')}
              name="listing"
              type="url"
              placeholder="https://www.sauto.cz/…"
              value={formData.listing}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor={id('location')}>
              Kde auto stojí
            </label>
            <input
              id={id('location')}
              name="location"
              type="text"
              placeholder="město nebo adresa prodejce"
              value={formData.location}
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </div>
      )}

      <div>
        <label className={labelCls} htmlFor={id('preferredDate')}>
          Kdy by se vám hodilo
        </label>
        <input
          id={id('preferredDate')}
          name="preferredDate"
          type="text"
          placeholder="např. příští týden dopoledne"
          value={formData.preferredDate}
          onChange={handleChange}
          className={inputCls}
        />
      </div>

      <div>
        <label className={labelCls} htmlFor={id('message')}>
          {isInspection ? 'Na co se mám zaměřit' : 'Co se s autem děje'}
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`${inputCls} resize-y`}
          placeholder={
            isInspection
              ? 'Co vám prodejce tvrdí, čeho se bojíte…'
              : 'Kdy se to děje, jaké zvuky, svítí kontrolka…'
          }
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink/30 accent-ink"
        />
        <span>
          Souhlasím se zpracováním osobních údajů pro vyřízení objednávky podle{' '}
          <Link href="/ochrana-osobnich-udaju" className="font-semibold text-ink underline underline-offset-2">
            zásad ochrany osobních údajů
          </Link>
          . *
        </span>
      </label>

      {submitError && (
        <p role="alert" className="rounded-lg border border-bad/30 bg-bad-soft px-4 py-3 text-sm font-semibold text-bad">
          {submitError}{' '}
          <a href={telHref(business.phone)} className="underline">
            {business.phone}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-amber px-6 py-4 text-base font-bold text-ink transition-colors hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Odesílám…' : isInspection ? 'Objednat prověrku' : 'Odeslat objednávku'}
      </button>
    </form>
  );
}
