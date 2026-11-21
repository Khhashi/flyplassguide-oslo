/**
 * Designtokens for FlyGuide.
 * Brukes både av Tailwind (klassenavn) og direkte i kode der klasser ikke passer.
 * Hold dette som ren JavaScript slik at tailwind.config.js kan lese filen.
 */
const colors = {
  primary: {
    DEFAULT: '#4F46E5',
    pressed: '#4338CA',
    soft: '#EEF2FF',
  },
  ink: {
    DEFAULT: '#101828',
    muted: '#475467',
    subtle: '#667085',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    muted: '#F7F8FA',
  },
  border: {
    DEFAULT: '#D0D5DD',
    subtle: '#EAECF0',
  },
  warning: {
    DEFAULT: '#B54708',
    soft: '#FFFAEB',
  },
  danger: {
    DEFAULT: '#B42318',
    soft: '#FEF3F2',
  },
  success: {
    DEFAULT: '#067647',
    soft: '#ECFDF3',
  },
};

const radius = {
  card: '20px',
  control: '14px',
};

/** Minste høyde på knapper og felt, så de er lette å treffe for alle. */
const touchTarget = 56;

module.exports = { colors, radius, touchTarget };
