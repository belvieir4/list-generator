import { Input } from 'components/Input';
import { InputNumber } from 'components/InputNumber';
import { InputColor } from 'components/InputColor';
import { RadioGroup } from 'components/RadioGroup';
import { InputFile } from 'components/InputFile';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';

export type FormValues = {
  name: string;
  itemsByRow: string;
  color: string;
  listType: string;
  textColor: string;
  images: File[];
};

function App() {
  const { t } = useTranslation();
  const form = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: '',
      color: '#000000',
      itemsByRow: '1',
      images: [],
      listType: 'image-only',
      textColor: 'white',
    },
    shouldFocusError: false,
  });

  return (
    <div className="m-6 flex-1 rounded-2xl bg-white p-6 lg:p-8">
      <h1 className="text-center text-3xl font-bold lg:text-5xl">
        {t('Gerador de Listas')}
      </h1>
      <FormProvider {...form}>
        <div className="mt-8 grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-4">
            <Input
              name="name"
              label="Nome da lista"
              placeholder="Ex: Minha Lista"
            />
            <InputNumber
              label="Quantos itens por linha? (max. 6)"
              min="1"
              max="6"
              name="itemsByRow"
            />
            <InputColor label="Cor do fundo" name="color" />
          </div>
          <div className="flex flex-col gap-4">
            <RadioGroup
              label="Tipo de Lista"
              name="listType"
              radios={[
                { label: 'Apenas imagem', value: 'image-only' },
                { label: 'Imagem e titulo', value: 'image-title' },
              ]}
            />
            <RadioGroup
              label="Cor do texto"
              name="textColor"
              radios={[
                { label: 'Branco', value: 'white' },
                { label: 'Preto', value: 'black' },
              ]}
            />
            <InputFile
              label="Imagem dos Itens (jpg, png)"
              buttonText="Escolher imagens"
              multiple
              accept="image/png,image/jpg"
              name="images"
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}

export default App;
