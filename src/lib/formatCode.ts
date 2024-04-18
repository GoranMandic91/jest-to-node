import prettier from 'prettier';

export const formatCode = (code: string): Promise<string> => {
  return prettier.format(code, {
    parser: 'typescript',
  });
};
