import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type LangButtonProps = {
  children: string;
  lang: 'pt-BR' | 'en';
};

export const LangButton = ({ children, lang }: LangButtonProps) => {
  const { i18n } = useTranslation();
  return (
    <button
      className={classNames('px-2 py-1 text-blue-800', {
        'rounded bg-blue-100 font-bold': i18n.language === lang,
      })}
      onClick={() => i18n.changeLanguage(lang)}
    >
      {children}
    </button>
  );
};
