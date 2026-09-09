import { useState } from 'react';
import { Switch } from './Switch';

export function SessionSwitch({ disabled = false }: { disabled?: boolean }) {
  const [checked, setChecked] = useState(false);
  const [calls, setCalls] = useState(0);
  return (
    <main>
      <button>Antes</button>
      <Switch label="Notificaciones" checked={checked} disabled={disabled}
        onCheckedChange={(next) => { setCalls((n) => n + 1); setChecked(next); }} />
      <button>Después</button>
      <output data-testid="calls">{calls}</output>
    </main>
  );
}
