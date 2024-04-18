import prettier from 'prettier';

export const formatCode = async (code: string): Promise<string> => {
    return prettier.format(code, {
        ...(await prettier.resolveConfig(process.cwd())),
        parser: 'typescript'
    });
};
