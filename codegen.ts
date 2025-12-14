import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://moku-dev.chickenkiller.com/graphql',
  documents: 'src/**/!(*.generated).graphql',
  generates: {
    'src/types.generated.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-apollo-angular'],
    },
  },
};
export default config;
