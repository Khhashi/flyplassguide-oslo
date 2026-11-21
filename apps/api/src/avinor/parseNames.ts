import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: false,
});

/**
 * Leser Avinors navnelister, f.eks. <airlineName code="DY" name="Norwegian"/> eller
 * <airportName code="TRD" name="Trondheim"/>, til et oppslag fra kode til navn.
 */
export function parseNames(
  xml: string,
  element: 'airlineName' | 'airportName',
): Map<string, string> {
  const doc = parser.parse(xml) as Record<string, Record<string, unknown> | undefined>;
  const root = doc[`${element}s`]?.[element];
  const entries = (Array.isArray(root) ? root : root ? [root] : []) as {
    code?: string;
    name?: string;
  }[];
  return new Map(entries.flatMap((e) => (e.code && e.name ? [[e.code, e.name] as const] : [])));
}
