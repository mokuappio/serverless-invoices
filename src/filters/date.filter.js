import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export function formatDate(val, toFormat = 'D MMM YYYY', fromFormat = 'YYYY-MM-DDTHH:mm:ssZ') {
  if (val) {
    return dayjs(String(val), fromFormat)
      .format(toFormat);
  }
}
