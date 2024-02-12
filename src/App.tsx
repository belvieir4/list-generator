import { Input } from 'components/Input';
import { InputNumber } from 'components/InputNumber';
import { InputColor } from 'components/InputColor';
import { RadioGroup } from 'components/RadioGroup';
import { InputFile } from 'components/InputFile';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { LangButton } from 'components/LangButton';
import PreviewInput from 'components/PreviewInput';
import { toJpeg } from 'html-to-image';
import download from 'downloadjs';

export type FormValues = {
  name: string;
  itemsByRow: number;
  color: string;
  listType: string;
  textColor: string;
  images: File[];
};

function App() {
  const { t } = useTranslation();
  const [base64List, setBase64List] = useState<(string | ArrayBuffer | null)[]>(
    [],
  );
  const wishlistEl = useRef<HTMLDivElement>(null);
  const form = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: '',
      color: '#000000',
      itemsByRow: 6,
      images: [],
      listType: 'image-only',
      textColor: 'white',
    },
    shouldFocusError: false,
    resolver: zodResolver(
      zod.object({
        name: zod.string().trim().min(1, t('Campo obrigatório')),
        itemsByRow: zod
          .number({ required_error: 'Campo obrigatório' })
          .min(1, 'Não pode ser menor do que 1')
          .max(6, 'Não pode ser maior do que 6'),
      }),
    ),
  });

  const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const values = form.watch();

  useEffect(() => {
    form.trigger();
  }, []);

  useEffect(() => {
    const getImagesBase64 = async () => {
      if (values.images && values.images.length > 0) {
        const files = await Promise.all(
          Array.from(values.images).map((file) => {
            return getBase64(file);
          }),
        );
        setBase64List(files);
      }
    };

    getImagesBase64();
  }, [values.images]);

  const isNotValid = !form.formState.isValid || values.images?.length === 0;

  return (
    <>
      <div className="flex flex-1 flex-col rounded-2xl bg-white p-6 lg:p-8">
        <div className="mb-4 flex flex-row justify-end gap-1 lg:mb-2">
          <LangButton lang="pt-BR">PT</LangButton>
          <LangButton lang="en">EN</LangButton>
        </div>
        <p className="text-center text-3xl font-bold lg:text-5xl">👽</p>
        <h1 className="mt-2 text-center text-3xl font-bold lg:mt-6 lg:text-5xl">
          {t('Listin - o gerador de listas em imagem')}
        </h1>
        <p className="mt-2 text-center text-lg">
          {t(
            'Configure sua lista, adicione seus itens e baixe a imagem gerada pra compartilhar onde quiser.',
          )}
        </p>
        <div className="mb-4 mt-6 self-center rounded border border-yellow-500 bg-yellow-100 px-4 py-3 lg:mb-6">
          <p className="text-center text-sm">
            <strong>{t('Importante')}</strong>
            {': '}
            {t(
              'esse site tem uma experiência melhor quando aberto em um computador (desktop ou notebook.)',
            )}
          </p>
        </div>

        <FormProvider {...form}>
          <div className="mb-10 mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="flex flex-col gap-6">
              <Input
                name="name"
                label={t('Nome da lista')}
                placeholder={t('Minha lista')}
                required
              />
              <InputNumber
                label={t('Quantos itens por linha? (max. 6)')}
                min="1"
                max="6"
                name="itemsByRow"
                required
              />
              <InputColor label={t('Cor do fundo')} name="color" />
            </div>
            <div className="flex flex-col gap-6">
              <RadioGroup
                label={t('Tipo de lista')}
                name="listType"
                radios={[
                  { label: t('Apenas imagem'), value: 'image-only' },
                  { label: t('Imagem e título'), value: 'image-title' },
                ]}
              />
              <RadioGroup
                label={t('Cor do texto')}
                name="textColor"
                radios={[
                  { label: t('Branco'), value: 'white' },
                  { label: t('Preto'), value: 'black' },
                ]}
              />
              <InputFile
                label={t('Imagens dos itens (jpg, jpeg, png)')}
                required
                buttonText={t('Escolher imagens')}
                multiple
                accept="image/png,image/jpeg"
                name="images"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6">
              <h2 className="text-center text-2xl font-bold lg:text-3xl">
                {t('Prévia da lista')}
              </h2>
              <p className="mt-2 text-center">
                {isNotValid
                  ? t(
                      'Por favor, preencha todos os campos obrigatórios (*) para gerar a prévia.',
                    )
                  : values.listType === 'image-title'
                    ? t('Clique no nome do item para editar')
                    : ''}
              </p>
            </div>
            {!isNotValid && (
              <>
                <div
                  className="flex flex-col px-4 py-8 shadow-lg"
                  style={{ backgroundColor: values.color }}
                  ref={wishlistEl}
                >
                  <h2
                    className={classNames(
                      'mb-8 self-center text-4xl font-bold',
                      {
                        'text-white': values.textColor === 'white',
                        'text-black': values.textColor === 'black',
                      },
                    )}
                  >
                    {values.name}
                  </h2>
                  <div
                    className="grid gap-x-4 gap-y-8"
                    style={{
                      gridTemplateColumns: `repeat(${values.itemsByRow}, minmax(0, 240px))`,
                      gridTemplateRows: `repeat(${Math.ceil(base64List.length / values.itemsByRow!)}, ${values.listType === 'image-title' ? 'auto' : 'auto'})`,
                    }}
                  >
                    {base64List.map((image, index) => (
                      <div className="flex flex-col gap-4" key={index}>
                        <img
                          className="h-44 w-full object-contain"
                          src={image as string}
                        />
                        {values.listType === 'image-title' && (
                          <PreviewInput index={index} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex w-full flex-col gap-3 md:w-96">
                  <button
                    className="flex flex-col items-center rounded-lg bg-blue-800 px-8 py-4 text-lg text-white transition duration-300 ease-in-out hover:bg-blue-950"
                    onClick={async () => {
                      if (wishlistEl.current) {
                        const dataUrl = await toJpeg(wishlistEl.current);
                        download(dataUrl, `${values.name}.jpg`);
                      }
                    }}
                  >
                    {t('Baixar imagem')}
                  </button>
                  <button
                    className="flex flex-col items-center rounded-lg border border-blue-600 bg-blue-100 px-8 py-3 text-lg text-blue-900 transition duration-300 ease-in-out hover:bg-blue-300"
                    onClick={() => form.reset()}
                  >
                    {t('Reiniciar lista')}
                  </button>
                </div>
              </>
            )}
          </div>
        </FormProvider>
      </div>
      <footer className="mt-4">
        <p className="text-center text-sm text-white">
          {t('Projeto por')}{' '}
          <a
            href="https://www.linkedin.com/in/isabelcvieira/"
            target="_blank"
            className=" text-blue-100 underline underline-offset-2 hover:text-blue-500"
          >
            Isabel Vieira
          </a>{' '}
          - 2024
        </p>
      </footer>
    </>
  );
}

export default App;
