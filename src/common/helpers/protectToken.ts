import { symbolsTemplate } from './symbolsTemplate';

export function protectToken({ apiToken }) {
  const result = [];
  const splitedToken = apiToken.split('');
  splitedToken.forEach((num1) => {
    const num2 = symbolsTemplate.find((item) => item[num1]);
    result.push(num2[num1]);
  });

  return result.map((item) => item).join('');
}
