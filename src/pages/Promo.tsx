import { useState, useEffect } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SAMPLE_DRAFT = `Three years of late nights debugging code and the quiet satisfaction of watching a program finally run — that experience shaped my understanding of computer science as both an art and a discipline. At MIT, I want to take that understanding further, surrounded by researchers defining what computing will look like in the next decade.

My undergraduate work at the University of Lisbon gave me a strong foundation in algorithms and systems programming. An independent project — an open-source library now used by over two thousand developers — taught me what it means to build software others depend on. Reading issue reports, refactoring under real constraints, coordinating contributors across five time zones: these experiences changed how I think about engineering entirely.

What draws me to MIT specifically is the intersection of systems research and applied machine learning. Work on adaptive runtime optimization published last year directly addresses a bottleneck I encountered while scaling my own project. I want to contribute to that research, and I have the technical background to do so from day one.

I am not applying because I want a credential. I am applying because this is the place where the problem I care most about — making distributed systems reliable and transparent — is being worked on with the greatest rigor.`;

const TIMELINE = {
  NAME_START:     400,
  NAME_END:       1900,
  FIELD_START:    2300,
  FIELD_END:      3900,
  UNIV_START:     4200,
  UNIV_END:       4600,
  BG_START:       5000,
  BG_END:         6100,
  ACH_START:      6400,
  ACH_END:        7400,
  MOT_START:      7700,
  MOT_END:        8700,
  BUTTON_GLOW:    9000,
  CLICK_START:    9300,
  CLICK_END:      9600,
  LOADING_START:  9600,
  CROSSFADE:     12200,
  DRAFT_TEXT:    12700,
  DRAFT_END:     28800,
  TOTAL:         30000,
} as const;

function typeText(tick: number, start: number, end: number, text: string): string {
  if (tick < start) return '';
  if (tick >= end) return text;
  return text.slice(0, Math.round(((tick - start) / (end - start)) * text.length));
}

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

export default function Promo() {
  const [tick, setTick] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setTick(prev => (prev + 50 >= TIMELINE.TOTAL ? 0 : prev + 50));
    }, 50);
    return () => clearInterval(id);
  }, []);

  const typedName  = typeText(tick, TIMELINE.NAME_START,  TIMELINE.NAME_END,  'Maria Gonzalez');
  const typedField = typeText(tick, TIMELINE.FIELD_START, TIMELINE.FIELD_END, 'Computer Science');
  const typedUniv  = typeText(tick, TIMELINE.UNIV_START,  TIMELINE.UNIV_END,  'MIT');
  const typedBg    = typeText(tick, TIMELINE.BG_START,    TIMELINE.BG_END,    'Final-year CS student, University of Lisbon.');
  const typedAch   = typeText(tick, TIMELINE.ACH_START,   TIMELINE.ACH_END,   'Built an open-source library, 2,000+ active users.');
  const typedMot   = typeText(tick, TIMELINE.MOT_START,   TIMELINE.MOT_END,   'To advance distributed systems research.');

  const activeField =
    tick >= TIMELINE.NAME_START  && tick < TIMELINE.NAME_END  ? 'name'        :
    tick >= TIMELINE.FIELD_START && tick < TIMELINE.FIELD_END ? 'field'       :
    tick >= TIMELINE.UNIV_START  && tick < TIMELINE.UNIV_END  ? 'university'  :
    tick >= TIMELINE.BG_START    && tick < TIMELINE.BG_END    ? 'background'  :
    tick >= TIMELINE.ACH_START   && tick < TIMELINE.ACH_END   ? 'achievement' :
    tick >= TIMELINE.MOT_START   && tick < TIMELINE.MOT_END   ? 'motivation'  :
    null;

  const formValid    = tick >= TIMELINE.MOT_END;
  const buttonGlow   = tick >= TIMELINE.BUTTON_GLOW && tick < TIMELINE.LOADING_START;
  const isClicking   = tick >= TIMELINE.CLICK_START && tick < TIMELINE.CLICK_END;
  const isLoading    = tick >= TIMELINE.LOADING_START && tick < TIMELINE.CROSSFADE;

  const formOpacity  = clamp01(1 - (tick - TIMELINE.CROSSFADE) / 400);
  const draftOpacity = clamp01((tick - TIMELINE.CROSSFADE) / 400);

  const draftProgress  = tick >= TIMELINE.DRAFT_TEXT
    ? clamp01((tick - TIMELINE.DRAFT_TEXT) / (TIMELINE.DRAFT_END - TIMELINE.DRAFT_TEXT))
    : 0;
  const visibleDraft   = SAMPLE_DRAFT.slice(0, Math.round(draftProgress * SAMPLE_DRAFT.length));
  const cursorOn       = Math.floor(tick / 530) % 2 === 0;
  const showDraftLayer = tick >= TIMELINE.CROSSFADE;

  function fieldCls(name: string) {
    return [
      'w-full rounded-md border px-3 py-2 text-sm text-foreground transition-all duration-150',
      activeField === name
        ? 'border-primary bg-card ring-1 ring-primary/40'
        : 'border-border bg-card',
    ].join(' ');
  }

  function Cursor({ name }: { name: string }) {
    if (activeField !== name || !cursorOn) return null;
    return (
      <span
        className="inline-block w-px bg-primary ml-px"
        style={{ height: '1em', verticalAlign: 'text-bottom' }}
      />
    );
  }

  function FieldText({ name, typed, placeholder }: { name: string; typed: string; placeholder: string }) {
    return typed
      ? <>{typed}<Cursor name={name} /></>
      : <span className="text-muted-foreground">{placeholder}</span>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <button
        onClick={() => navigate('/')}
        className="fixed top-5 left-5 z-50 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back
      </button>

      {/* ── FORM PHASE ── */}
      <div
        className="absolute inset-0 overflow-auto"
        style={{ opacity: formOpacity, pointerEvents: showDraftLayer ? 'none' : 'auto' }}
      >
        <div className="mx-auto max-w-xl px-5 py-14">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold tracking-tight">DraftMe</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Tell us about yourself, pick your document type, and get a full draft in seconds.
            </p>
          </div>

          <div className="space-y-4">

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Your name</label>
              <div className={fieldCls('name')}>
                <FieldText name="name" typed={typedName} placeholder="e.g. Maria Gonzalez" />
              </div>
            </div>

            {/* Document type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Document type</label>
              <div className={`w-full rounded-md border border-border bg-card px-3 py-2 text-sm ${
                tick >= TIMELINE.FIELD_START ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                Personal Statement
              </div>
            </div>

            {/* Field of study */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Field of study</label>
              <div className={fieldCls('field')}>
                <FieldText name="field" typed={typedField} placeholder="e.g. Medicine, Computer Science" />
              </div>
            </div>

            {/* University */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">University or institution</label>
              <div className={fieldCls('university')}>
                <FieldText name="university" typed={typedUniv} placeholder="e.g. Harvard, MIT, UWC" />
              </div>
            </div>

            {/* Background */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Your background in 2–3 sentences</label>
              <div className={`${fieldCls('background')} min-h-[56px]`}>
                <FieldText name="background" typed={typedBg} placeholder="e.g. I'm a final-year student in…" />
              </div>
            </div>

            {/* Achievement */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Biggest achievement</label>
              <div className={`${fieldCls('achievement')} min-h-[56px]`}>
                <FieldText name="achievement" typed={typedAch} placeholder="e.g. Led a team that…" />
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Why this opportunity?</label>
              <div className={`${fieldCls('motivation')} min-h-[56px]`}>
                <FieldText name="motivation" typed={typedMot} placeholder="e.g. To access research facilities…" />
              </div>
            </div>

            {/* Generate button */}
            <button
              className={[
                'w-full rounded-md py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200',
                isClicking   ? 'bg-primary scale-[0.97] opacity-80' :
                buttonGlow   ? 'bg-primary shadow-lg shadow-primary/30' :
                formValid    ? 'bg-primary' :
                               'bg-primary opacity-40 cursor-not-allowed',
              ].join(' ')}
            >
              {isLoading
                ? <span className="animate-pulse-gentle">Generating your draft…</span>
                : 'Generate draft'
              }
            </button>

          </div>
        </div>
      </div>

      {/* ── DRAFT PHASE ── */}
      <div
        className="absolute inset-0 overflow-auto"
        style={{ opacity: draftOpacity, pointerEvents: showDraftLayer ? 'auto' : 'none' }}
      >
        <div className="mx-auto max-w-xl px-5 py-14">

          <div className="flex items-center gap-2 mb-8">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">DraftMe</h1>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Personal Statement
              </p>
              <p className="text-[11px] text-muted-foreground">Maria Gonzalez · MIT</p>
            </div>

            <div className="h-px bg-border my-4" />

            <div className="font-serif-output text-foreground leading-relaxed text-[15px] whitespace-pre-wrap">
              {visibleDraft}
              {draftProgress < 1 && cursorOn && (
                <span
                  className="inline-block w-px bg-foreground/60 ml-px"
                  style={{ height: '1.1em', verticalAlign: 'text-bottom' }}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
