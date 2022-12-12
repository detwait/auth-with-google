import * as fs from 'fs';
import * as path from 'path';
import { generateApi, GenerateApiOutput } from 'swagger-typescript-api';
import { ClassDeclaration, EnumDeclaration, Project, SourceFile } from 'ts-morph';

interface AppGeneratorConfig {
  input: string;
  folderName: string;
  fileName: string;
  appName: string;
}

const tsConfigFilePath: string = path.join(__dirname, '../../tsconfig.json');

const project: Project = new Project({
  tsConfigFilePath,
});

const files: SourceFile[] = project.getDirectory('src').getSourceFiles('**/{*.entity.ts,*.input.ts,*.dto.ts,*enum.ts}');

const indexFile: SourceFile = project.createSourceFile('tools/swagger-gen/templates/default/data-contracts.eta', '', { overwrite: true });

for (const file of files) {
  const relativeImportPath: string = path
    .relative(`${process.cwd()}/test/shared/api/`, file.getFilePath())
    .split(path.sep)
    .join('/')
    .replace(/\.ts$/, '');

  file.getClasses().map((cls: ClassDeclaration) =>
    indexFile.addImportDeclaration({
      namedImports: [cls.getName()],
      moduleSpecifier: relativeImportPath,
    }),
  );
  file.getEnums().map((enm: EnumDeclaration) =>
    indexFile.addImportDeclaration({
      namedImports: [enm.getName()],
      moduleSpecifier: relativeImportPath,
    }),
  );
}

indexFile.saveSync();

const servers: AppGeneratorConfig[] = [
  {
    input: path.join(__dirname, `../../swagger/user.json`),
    folderName: 'generated-apps',
    fileName: 'generated-user-app.ts',
    appName: 'GeneratedUserApp',
  },
];

for (const { input, folderName, fileName, appName } of servers) {
  const folderPath: string = path.join(__dirname, `../../test/shared/${folderName}`);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  if (fs.existsSync(path.join(folderPath, fileName))) {
    fs.unlink(path.join(folderPath, fileName), (err: NodeJS.ErrnoException) => {
      if (err) throw err;
    });
  }

  generateApi({
    input,
    generateRouteTypes: false,
    generateClient: true,
    generateResponses: true,
    extractRequestParams: false,
    singleHttpClient: true,
    modular: false,
    enumNamesAsValues: true,
    templates: path.join(__dirname, './templates/default'),
  }).then(({ files }: GenerateApiOutput) => {
    for (const { content } of files) {
      fs.writeFileSync(path.join(__dirname, `../../test/shared/${folderName}/${fileName}`), content.replace('GeneratedTestApi', appName));
    }
  });
}
