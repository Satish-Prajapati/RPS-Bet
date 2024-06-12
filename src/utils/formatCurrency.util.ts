import { getLocale } from '@/utils/getLocal.util';

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat(getLocale()).format(value);
}
